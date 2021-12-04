/* ------------------------------- 로그인 상태를 검사 ------------------------------- */
export const checkLoggedIn = async (ctx, next) => {
  // 로그인 상태가 아니면 unathorized 에러
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

/* ------------------------------ 직접 작성한 것인지 검사 ----------------------------- */
export const checkOwn = (model) => (ctx, next) => {
  // 현재 ctx 상태에서 user 정보 참조
  const { user } = ctx.state;

  const instance = ctx.state[`${model.modelName.toLowerCase()}`];

  // 사용자가 작성한 포스트가 아니면 Forbidden
  if (instance.publisher.toString() !== user._id) {
    ctx.status = 403;
    return;
  }

  return next();
};
