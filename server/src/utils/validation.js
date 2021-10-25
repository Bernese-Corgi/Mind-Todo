import Joi from 'joi';

/* ----------------------------- auth validation ---------------------------- */
// 회원가입 검증
export const signupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
  });

  return schema.validate(data);
};

// 로그인 검증
export const signinValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data);
};

/* ----------------------------- post validation ---------------------------- */
// write post 검증
export const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};

// update post 검증
export const postUpdateValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};
