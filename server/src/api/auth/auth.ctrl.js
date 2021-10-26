import { User } from '../../model';
import { validateRequest } from '../../utils';

/* ---------------------------------- 회원가입 ---------------------------------- */
// sign up, POST /api/signup
export const signup = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('signup', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  const { username, email, password } = ctx.request.body;

  try {
    // 데이터베이스에 이미 존재하는 user의 에러 처리
    const existsUser = {
      username: await User.findByUsername(username),
      email: await User.findByEmail(email),
    };
    // 존재하는 username이라면 conflict 에러 발생
    if (existsUser.username) {
      ctx.status = 409;
      return;
    }
    // 존재하는 email이라면 conflict 에러 발생
    if (existsUser.email) {
      ctx.status = 409;
      return;
    }

    // 새로운 user document 생성
    const user = new User({ username, email });
    // hash the password
    await user.setPassword(password);
    // user 도큐먼트를 데이터베이스에 저장
    await user.save();

    // 해시된 비밀번호 필드를 응답 객체에서 제거
    const serializedUser = user.serialize();

    // 토큰 발행 및 쿠키에 담기
    user.setTokenAndCookies(ctx);

    ctx.body = serializedUser;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ----------------------------------- 로그인 ---------------------------------- */
// sign in, POST /api/signin
export const signin = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('signin', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    /* 유효한 계정인지 검사 ------------------------------ */
    // username으로 계정 검색 및 해당 계정 데이터 반환
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.statue = 401;
      return;
    }

    /* 비밀번호 검사 -------------------------------- */
    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    // hashed password 필드를 삭제하고 응답
    ctx.body = user.serialize();

    // 토큰 발행 및 쿠키에 담기
    user.setTokenAndCookies(ctx);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------------- 로그인 확인 --------------------------------- */
// check, GET /api/check
// 현재 로그인 중인지 확인
export const check = async (ctx) => {
  const { user } = ctx.state;

  // user가 없으면 인증 실패 상태 코드 설정
  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};

/* ---------------------------------- 로그아웃 ---------------------------------- */
// sign out, POST /api/signout
export const signout = async (ctx) => {
  // 쿠키 삭제
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
