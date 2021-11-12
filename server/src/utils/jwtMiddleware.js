import jwt from 'jsonwebtoken';
import User from '../model/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    ctx.state.user = {
      _id: decoded._id,
      username: user.username,
      email: user.email,
    };

    /* 토큰 재발급 --------------------------------- */
    const now = Math.floor(Date.now() / 1000);
    // 토큰의 유효 기간이 3.5일 미만일 경우 재발급
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      user.setTokenAndCookies(ctx);
    }

    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
