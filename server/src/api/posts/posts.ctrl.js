import { Post } from '../../model';
import { postValidation } from '../../utils/validation';

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
  const validatedData = postValidation(ctx.request.body);

  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (validatedData.error) {
    ctx.status = 400;
    ctx.body = validatedData.error;
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
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------- read specific post --------------------------- */
// GET api/posts/:id
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

export const update = async (ctx) => {
  //
};

export const remove = async (ctx) => {
  //
};
