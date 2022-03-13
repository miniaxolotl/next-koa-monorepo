import Joi from 'joi';

import { AuthType } from '../type/auth.type';

export const AuthSchema = Joi.object<AuthType>({
  username: Joi.string().min(3).max(32).alphanum().lowercase().required(),
  password: Joi.string().min(8).max(256).trim().required(),
});
