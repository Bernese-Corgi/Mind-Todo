import { Mindmap } from '../../model';
import { validateRequest } from '../../utils';

/* ------------------------------- 마인드맵 목록 조회 ------------------------------- */
// GET /api/mindmaps
export const listMindmap = async (ctx) => {
  // TODO 필터링
  // TODO 페이지네이션
  try {
    // mind map 컬렉션에서 list 받아오기
    const mindmaps = await Mindmap.find().sort({ _id: -1 });

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
    publisherId: ctx.state.user,
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
  ctx.body = ctx.state.mindmap;
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
  const { id } = ctx.params;

  // 현재 request body 데이터 (수정된 내용) 복사
  const nextData = { ...ctx.request.body };

  try {
    // params에서 추출한 id로 mindmap을 찾고, 수정된 데이터를 넣는다.
    const mindmap = await Mindmap.findByIdAndUpdate(id, nextData, {
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
  //
};

/* -------------------------------- 개별 노드 작성 -------------------------------- */
// POST /api/mindmaps/:mindmapId
export const writeNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 조회 -------------------------------- */
// GET /api/mindmaps/:mindmapId/:nodeId
export const readNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 수정 -------------------------------- */
// PATCH /api/mindmaps/:mindmapId/:nodeId
export const updateNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 삭제 -------------------------------- */
// DELETE /api/mindmaps/:mindmapId/:nodeId
export const removeNode = async (ctx) => {
  //
};
