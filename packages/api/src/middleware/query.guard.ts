import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR } from '@libs/shared';
import { validateSchema } from '@libs/shared';

export const QueryGuard = <T = unknown>(Schema: Joi.ObjectSchema) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const { value, error } = validateSchema<T>(Schema, ctx.request.query);
    if (error) {
      ctx.status = CLIENT_ERROR.BAD_REQUEST.status;
      ctx.body = error;
      return;
    }
    ctx.data = {
      ...ctx.data,
      path: value,
    };
    ctx.request.body = value;
    await next();
  };
};
