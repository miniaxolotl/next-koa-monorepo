import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR } from '@libs/shared';
import { validateSchema } from '@libs/shared';

export const PathGuard = <T = unknown>(
  Schema: Joi.ObjectSchema,
  {
    allowUnknown,
    stripUnknown,
  }: {
    allowUnknown?: boolean;
    stripUnknown?: boolean;
  } = {
    allowUnknown: false,
    stripUnknown: true,
  },
) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const { value, error } = validateSchema<T>(Schema, ctx.params, {
      allowUnknown,
      stripUnknown,
    });
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
