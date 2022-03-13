import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR } from '@libs/shared';
import { validateSchema } from '@libs/shared';

export const SchemaGuard = <T = unknown>(Schema: Joi.ObjectSchema) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const { value, error } = validateSchema<T>(Schema, ctx.request.body);
    if (error) {
      ctx.status = CLIENT_ERROR.BAD_REQUEST.status;
      ctx.body = error;
      return;
    }
    ctx.data = {
      ...ctx.data,
      body: value,
    };
    ctx.request.body = value;
    await next();
  };
};
