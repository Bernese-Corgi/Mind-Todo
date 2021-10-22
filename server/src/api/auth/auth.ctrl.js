import User from '../../model/user';

/* -------------------------------- Auth api -------------------------------- */
// sign up, POST /api/signup
export const signup = async (ctx) => {
  const { request } = ctx;

  const { username, email, password } = request.body;

  try {
    /* 데이터베이스에 이미 존재하는 user의 에러 처리 ---------------------- */
    const existsUser = {
      username: await User.findByUsername(username),
      email: await User.findByEmail(email),
    };

    if (existsUser.username) {
      ctx.status = 409;
      ctx.message = '이미 존재하는 username입니다.';
      return;
    }

    if (existsUser.email) {
      ctx.status = 409;
      ctx.message = '이미 존재하는 이메일입니다.';
      return;
    }

    // 새로운 user document 생성
    const user = new User({ username, email });
    // hash the password
    await user.setPassword(password);
    // user 도큐먼트를 데이터베이스에
    await user.save();

    // 해시된 비밀번호 필드를 응답 객체에서 제거
    const data = user.serialize();

    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};
