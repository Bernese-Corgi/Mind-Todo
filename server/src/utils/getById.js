import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/* ------------------------------- id로 정보 찾기 ------------------------------ */
/**
 * 인수로 전달받는 model의 이름을 통해 _id값을 참조하고, _id 값을 통해 해당하는 도큐먼트를 찾는다.
 * params 이름의 기본값은 /:id이고, 모델 이름을 참조해서 지정하는 경우 /:모델이름소문자Id 로 작성한다 (예: 모델이름 - Mindmap, params이름 - /:mindmapId)
 * @param {*} model 찾을 정보에 해당하는 model을 전달받는다.
 * @returns 별도의 반환값 없이 다음 미들웨어를 실행한다.
 */
const getById = (model) => async (ctx, next) => {
  const lowerModelName = model.modelName.toLowerCase();
  // 모델 이름을 통해 params의 key를 찾는다.
  const matchKey = Object.keys(ctx.params).find((key) =>
    key.includes(model.modelName.toLowerCase()),
  );

  // matchKey로 찾은 키를 가지고 id 값을 참조한다.
  const id = matchKey ? ctx.params[matchKey] : ctx.params.id;

  // params에서 받아온 id가 유효하는지 검사하고, 존재하지 않으면 에러
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    ctx.body = `url의 params의 값이 ObjectId 형식에 맞지 않습니다.`;
    return;
  }

  try {
    // id로 instance 찾기
    const instance = await model.findById(id);
    // instance가 존재하지 않으면 Not Found
    if (!instance) {
      ctx.status = 404;
      ctx.body = `존재하지 않는 ${lowerModelName}입니다`;
      return;
    }
    // 현재 컨텍스트에 instance 넣기
    ctx.state[`${lowerModelName}`] = instance;

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
        ctx.state[`${model.modelName.toLowerCase()}`] = instance;

        return { key, id, model, instance };
      });

      return next();
    } catch (e) {
      ctx.throw(500, e);
    }
    ---------------------------------------------------------- */
};

export default getById;
