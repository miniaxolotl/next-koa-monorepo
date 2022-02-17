import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

import { SchemaGuard } from '@backend/middleware';
import { getUser } from '@backend/controller/v1/user/user.service';

import { CLIENT_ERROR, LoginSchema } from '@libs/shared';

import { login } from './session.service';

const route = [''];
const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.post('/', SchemaGuard(LoginSchema), async (ctx: ParameterizedContext) => {
  const data = ctx.data;
  const user = await getUser(data.body, { include: { roles: true } });
  if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
  const session = await login(data.body, user);
  if (!session) ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  ctx.body = session;
}); // {post} /login

export { router, route };
