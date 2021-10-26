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
    repeat_password: Joi.ref('password'),
  },
  // 로그인 검증 스키마
  signin: {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  },
  // post 작성 검증 스키마
  write_post: {
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  },
  // post 수정 검증 스키마
  update_post: {
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
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
};

const validateRequest = (schemaName, data) => {
  const schema = Joi.object(validationSchema[schemaName]);

  return schema.validate(data);
};

export default validateRequest;
