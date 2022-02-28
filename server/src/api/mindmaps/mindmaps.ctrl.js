import { Mindmap } from '../../model';
import { Node, Tree } from '../../model/Mindmap';
import { validateRequest } from '../../utils';

/* ------------------------------- 마인드맵 목록 조회 ------------------------------- */
// GET /api/mindmaps
export const listMindmap = async (ctx) => {
  // TODO 필터링
  // TODO 페이지네이션
  const { user } = ctx.state;

  try {
    // mind map 컬렉션에서 list 받아오기
    const mindmaps = await Mindmap.find({ publisher: user._id })
      .sort({ _id: -1 })
      .populate([
        { path: 'publisher', select: '_id username email' },
        { path: 'body' },
      ]);

    // mindmap list를 응답
    ctx.body = mindmaps;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------------- 마인드맵 작성 -------------------------------- */
// POST /api/mindmaps
export const writeMindmap = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('write_mindmap', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // request body에서 title 참조
  const { title } = ctx.request.body;

  // mindmap document 생성
  const mindmap = new Mindmap({
    title,
    publisher: ctx.state.user,
  });

  try {
    // mindmap document 저장
    await mindmap.save();
    // mindmap instance 응답
    ctx.body = mindmap;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------- 개별 마인드맵 조회 (= 전체 노드 조회) ------------------------ */
// GET /api/mindmaps/:mindmapId
export const readMindmap = async (ctx) => {
  const { mindmap } = ctx.state;

  const populatedMindmap = await mindmap.populate({
    path: 'body',
    populate: [
      { path: 'node', select: 'name _id' },
      { path: 'parent', select: 'name _id' },
    ],
  });

  ctx.body = populatedMindmap;
};

/* --------------------------- 개별 마인드맵 수정 (타이틀 수정) -------------------------- */
// PATCH /api/mindmaps/:mindmapId
export const udpateMindmap = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('update_mindmap', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // 파라미터에서 id 추출
  const { mindmapId } = ctx.params;

  // 현재 request body 데이터 (수정된 내용) 복사
  const nextData = { ...ctx.request.body };

  try {
    // params에서 추출한 id로 mindmap을 찾고, 수정된 데이터를 넣는다.
    const mindmap = await Mindmap.findByIdAndUpdate(mindmapId, nextData, {
      new: true, // 업데이트된 데이터를 반환
    }).exec();

    // id로 mindmap을 찾을 수 없으면 not found
    if (!mindmap) {
      ctx.status = 404;
      return;
    }

    // 수정된 데이터를 응답
    ctx.body = mindmap;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- 개별 마인드맵 삭제 ------------------------------- */
// DELETE /api/mindmaps/:mindmapId
export const removeMindmap = async (ctx) => {
  // params에서 id를 받아온다.
  const { mindmapId } = ctx.params;

  try {
    // params에서 받아온 mindmapId와 일치하는 mindmap을 삭제
    await Mindmap.findByIdAndRemove(mindmapId).exec();
    // No Content
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* -------------------------------- 개별 노드 작성 -------------------------------- */
// POST /api/mindmaps/:mindmapId
export const writeNode = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('write_node', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // params에서 mindmapId 참조
  const { mindmapId } = ctx.params;

  // request body에서 데이터 추출
  const { name, parentId } = ctx.request.body;

  // node 인스턴스 생성
  const node = new Node({ name, mindmapId });

  // 부모 노드 id로 parent node 찾기
  const parentNode = await Node.findParentNodeById(parentId);

  // node 인스턴스를 바탕으로 tree 인스턴스 생성
  const tree = new Tree({
    node,
    parent: parentId,
  });

  try {
    // node와 tree documents 데이터 베이스에 저장
    await node.save();
    await tree.save();

    // mindmap id로 mindmap 정보 불러오기
    const mindmap = await Mindmap.findById(mindmapId);
    // mindmap 객체 복사 후 tree 데이터 추가
    const nextMindmap = { body: [...mindmap.body, tree] };

    // 생성된 tree 데이터를 넣기 위해 mindmap 수정하기
    const updatedMindmap = await Mindmap.findByIdAndUpdate(
      mindmapId,
      nextMindmap,
      { new: true },
    ).exec();

    // id 값으로 mindmap 데이터를 찾을 수 없으면 Not Found
    if (!updatedMindmap) {
      ctx.status = 404;
      ctx.body = 'mindmap의 id가 잘못되었습니다.';
      return;
    }

    // update된 mindmap을 데이터베이스에 저장
    await updatedMindmap.save();

    // node 데이터를 응답
    ctx.body = { node, tree };
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* -------------------------------- 개별 노드 조회 -------------------------------- */
// GET /api/mindmaps/:mindmapId/:nodeId
export const readNode = async (ctx) => {
  const node = ctx.state.node;
  try {
    // post, todos 정보 가져오기
    const populatedNode = await node.findPostAndTodosByNode();

    //  post, todos가 채워진 node 객체 응답
    ctx.body = populatedNode;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* -------------------------------- 개별 노드 수정 -------------------------------- */
// PATCH /api/mindmaps/:mindmapId/:nodeId
export const updateNode = async (ctx) => {
  // reqeust body 스키마 검증
  const { error } = validateRequest('update_node', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // params에서 nodeId 참조
  const { nodeId } = ctx.params;

  try {
    // params에서 추출한 id로 node를 찾고, 수정된 데이터를 업데이트한다.
    const node = await Node.findByIdAndUpdate(
      nodeId,
      { ...ctx.request.body },
      { new: true }, // 업데이트된 데이터를 반환
    ).exec();

    // id로 node를 찾을 수 없으면 not found
    if (!node) {
      ctx.status = 404;
      ctx.body = `존재하지 않는 node입니다.`;
      return;
    }

    // 수정된 데이터를 응답
    ctx.body = node;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* -------------------------------- 개별 노드 삭제 -------------------------------- */
// DELETE /api/mindmaps/:mindmapId/:nodeId
export const removeNode = async (ctx) => {
  const { mindmapId, nodeId } = ctx.params;
  try {
    const mindmap = await Mindmap.findById(mindmapId);

    const filteredBody = mindmap.body.filter(
      (tree) => tree.node.toString() !== nodeId,
    );

    await Mindmap.findByIdAndUpdate(
      mindmapId,
      { body: filteredBody },
      { new: true },
    ).exec();

    // params에서 받아온 nodeId와 일치하는 node 삭제
    await Node.findByIdAndRemove(ctx.params.nodeId).exec();

    // No Content
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
