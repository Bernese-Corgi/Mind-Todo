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

    /* ---------------------------------------------------------- 
    // ANCHOR 추후 model을 rest parameter로 받아올 경우 아래 코드 사용
    try {
      const matchModels = models.map((model) => {
        // 일치하는 key 찾기
        const matchKey = Object.keys(ctx.params).find((key) =>
        key.includes(model.modelName.toLowerCase()),
        );
        return { key: matchKey, id: ctx.params[matchKey], model };
      });
      
      matchModels.map(async (matchModel) => {
        const { key, id, model } = matchModel;
        
        if (!ObjectId.isValid(id)) {
          ctx.status = 400;
          ctx.body = `url의 /:${key} params의 값이 ObjectId 형식에 맞지 않습니다.`;
          return;
        }
        
        const instance = await model.findById(id);
        
        if (!instance) {
          ctx.status = 404;
          ctx.body = '존재하지 않는 도큐먼트입니다.';
        }
        
        // FIXME state가 초기화되는 문제 발생
        // ctx.state[`${model.modelName.toLowerCase()}`] = instance;
        
        return { key, id, model, instance };
      });
      
      return next();
    } catch (e) {
      ctx.throw(500, e);
    }
    ---------------------------------------------------------- */
  };

export default getById;
