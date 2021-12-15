import Joi from 'joi';

/* ---------------------------- validation schema --------------------------- */
// TODO message 스키마 마저 채우기
const validationSchema = {
  // 회원가입 검증 스키마
  signup: {
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.min': '"username"은 {#limit}자 이상이어야 합니다.',
      'strin.max': '"username"은 {#limit}자 이하여야 합니다.',
      'any.required': '"username"은 필수 항목입니다.',
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: Joi.ref('password'),
  },
  // 로그인 검증 스키마
  signin: {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  },
  // post 작성 검증 스키마
  write_post: {
    title: Joi.string().max(30).required().messages({
      'string.empty': '제목은 필수 항목입니다.',
      'string.max': '제목은 30자 이내로 입력해주세요.',
    }),
    body: Joi.string().required().messages({
      'string.empty': '내용은 필수 항목입니다.',
    }),
    tags: Joi.array().items(Joi.string().max(20)),
  },
  // post 수정 검증 스키마
  update_post: {
    title: Joi.string().max(30).messages({
      'string.empty': '제목은 필수 항목입니다.',
      'string.max': '제목은 30자 이내로 입력해주세요.',
    }),
    body: Joi.string().messages({
      'string.empty': '내용은 필수 항목입니다.',
    }),
    tags: Joi.array().items(Joi.string().max(20)),
  },
  // todo 작성 검증 스키마
  write_todo: {
    content: Joi.string().required(),
  },
  // todo 수정 검증 스키마
  update_todo: {
    content: Joi.string(),
    completed: Joi.boolean(),
  },
  // mindmap 작성 검증 스키마
  write_mindmap: {
    title: Joi.string().max(30).required(),
  },
  // mindmap 수정 검증 스키마
  update_mindmap: {
    title: Joi.string().max(30),
  },
  // node 작성 검증 스키마
  write_node: {
    name: Joi.string().max(50).required(),
    // TODO 모델이랑 맞추기
    parentId: Joi.string(),
  },
  // node 수정 검증 스키마
  udpate_node: {
    name: Joi.string().max(50),
    // TODO parent 위치 변경 가능하게 한다면 이부분에 parent 추가
  },
};

const validateRequest = (schemaName, data) => {
  const schema = Joi.object().keys(validationSchema[schemaName]);

  return schema.validate(data);
};

export default validateRequest;
