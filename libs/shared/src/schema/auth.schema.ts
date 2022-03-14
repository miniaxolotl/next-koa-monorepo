import Joi from 'joi';

import { AuthType } from '../type/auth.type';

export const AuthSchema = Joi.object<AuthType>({
  email: Joi.string().max(32).email({ tlds: false }).required(),
  password: Joi.string().min(8).max(256).trim().required(),
});
