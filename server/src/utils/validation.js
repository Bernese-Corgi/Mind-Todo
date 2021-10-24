import Joi from 'joi';

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

export const signinValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data);
};
