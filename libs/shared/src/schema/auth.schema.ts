import Joi from 'joi';

export const LoginSchema = Joi.object({
  username: Joi.string().min(3).max(32).alphanum().lowercase().required(),

  password: Joi.string().min(8).max(256).trim().required(),
});
