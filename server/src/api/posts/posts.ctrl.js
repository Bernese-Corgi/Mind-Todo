import { Post } from '../../model';
import { Node } from '../../model/Mindmap';
import { validateRequest } from '../../utils';

/* -------------------------------- list post ------------------------------- */
// GET /api/post
export const list = async (ctx) => {
  // TODO 쿼리 파라미터로 포스트 필터링
  // TODO 페이지네이션
  try {
    // post 컬렉션에서 post list 받아오기
    const posts = await Post.find().sort({ _id: -1 });
    // posts를 응답
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- write post ------------------------------- */
// POST /api/posts
export const write = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('write_post', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // request body에서 데이터 추출
  const { title, body, tags } = ctx.request.body;

  // post 인스턴스 생성
  const post = new Post({
    title,
    body,
    tags,
    publisherId: ctx.state.user,
    nodeId: ctx.params.nodeId,
  });

  // node 도큐먼트에 post 정보 넣기
  const updatedNode = await Node.updateNodeChild(ctx.params.nodeId, post);

  // id 값으로 node 데이터를 찾을 수 없으면 Not Found
  if (!updatedNode) {
    ctx.status = 404;
    ctx.body = 'node를 찾을 수 없습니다.';
    return;
  }

  try {
    // post document 저장
    await post.save();
    await updatedNode.save();
    // post 응답
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------- read specific post --------------------------- */
// GET /api/posts/:id
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/* -------------------------- update specific post -------------------------- */
// PATCH /api/posts/:id
export const update = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('update_post', ctx.request.body);
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
    // params에서 추출한 id로 post를 찾고, 수정된 데이터를 넣는다.
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 업데이트된 데이터를 반환
    }).exec();

    // id로 포스트를 찾을 수 없으면 not found
    if (!post) {
      ctx.status = 404;
      return;
    }
    // 수정된 데이터를 응답
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- remove post ------------------------------ */
// DELETE /api/posts/:id
export const remove = async (ctx) => {
  // params에서 id를 받아온다.
  const { id } = ctx.params;
  try {
    // params에서 받아온 id와 일치하는 post를 삭제
    await Post.findByIdAndRemove(id).exec();
    // No Content
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
