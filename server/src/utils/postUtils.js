import mongoose from 'mongoose';
import { Post } from '../model';

const { ObjectId } = mongoose.Types;

/* ------------------------------- 로그인 상태를 검사 ------------------------------- */
export const checkLoggedIn = async (ctx, next) => {
  // 로그인 상태가 아니면 unathorized 에러
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

/* ------------------------------- id로 post 찾기 ------------------------------ */
export const getPostById = async (ctx, next) => {
  // params에서 id 참조
  const { id } = ctx.params;

  // params에서 받아온 id가 유효하는지 검사하고, 존재하지 않으면 에러
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    // id로 포스트 찾기
    const post = await Post.findById(id);
    // 포스트가 존재하지 않으면 Not Found
    if (!post) {
      ctx.status = 404;
      return;
    }
    // 현재 컨텍스트에 post 넣기
    ctx.state.post = post;

    // 다음 미들웨어 실행
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ----------------------------- 로그인 중인 사용자인지 확인 ---------------------------- */
export const checkOwnPost = (ctx, next) => {
  // 현재 ctx 상태에서 user, post 정보 참조
  const { user, post } = ctx.state;

  // 사용자가 작성한 포스트가 아니면 Forbidden
  if (post.publisherId.toString() !== user._id) {
    ctx.status = 403;
    return;
  }

  return next();
};
