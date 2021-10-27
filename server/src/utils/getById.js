import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/* ------------------------------- id로 post 찾기 ------------------------------ */
const getById =
  (model, ...idName) =>
  async (ctx, next) => {
    // params에서 id 참조
    const id = idName ? ctx.params[idName] : ctx.params.id;

    // params에서 받아온 id가 유효하는지 검사하고, 존재하지 않으면 에러
    if (!ObjectId.isValid(id)) {
      ctx.status = 400;
      return;
    }

    try {
      // id로 instance 찾기
      const instance = await model.findById(id);
      // instance가 존재하지 않으면 Not Found
      if (!instance) {
        ctx.status = 404;
        return;
      }
      // 현재 컨텍스트에 instance 넣기
      ctx.state[`${model.modelName.toLowerCase()}`] = instance;

      // 다음 미들웨어 실행
      return next();
    } catch (e) {
      ctx.throw(500, e);
    }
  };

export default getById;
