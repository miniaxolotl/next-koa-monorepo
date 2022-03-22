import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

import { AuthSchema, CLIENT_ERROR } from '@libs/shared';

import { getUserByEmail } from '@backend/controller/v1/user/user.service';
import { SchemaGuard, SessionGuard } from '@backend/middleware';
import { login, refreshSession } from './session.service';

const route = ['/session'];
const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.post('/', SchemaGuard(AuthSchema), async (ctx: ParameterizedContext) => {
  const data = ctx.data;
  const user = await getUserByEmail(data.body.email, { include: { roles: true } });
  if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
  const session = await login(data.body, user);
  if (!session) ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  ctx.body = {
    sessionId: session.sessionId,
    userId: session.user.userId,
    expires: session.deleted,
  };
}); // {post} /login

router.post('/refresh', SessionGuard(), async (ctx: ParameterizedContext) => {
  const data = ctx.data;
  const session = await refreshSession(data.session);
  if (session) {
    ctx.body = {
      sessionId: session.sessionId,
      userId: session.user.userId,
    };
  }
}); // {post} /login

export { router, route };
