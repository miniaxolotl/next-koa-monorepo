import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import { omit } from 'lodash';

import { SessionGuard } from '@backend/middleware/session.guard';
import { CLIENT_ERROR, CreateUserSchema, IdSchema, IdStringSchema, RoleEnum, SUCCESS } from '@libs/shared';
import { PathGuard, RoleGuard, SchemaGuard } from '@backend/middleware';

import { createUser, disableUser, enableUser, getUser, getUserAll, getUserById, getUserByUserId } from './user.service';

const route = ['/user'];
const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

/************************** user **************************/

router.post('/', SchemaGuard(CreateUserSchema), async (ctx: ParameterizedContext) => {
  const data = ctx.data;
  const existingUser = await getUser(data.body);
  if (existingUser) ctx.throw(CLIENT_ERROR.CONFLICT.status, CLIENT_ERROR.CONFLICT.message);
  const newUser = await createUser(data.body);
  ctx.body = newUser;
}); // {post} /

router.get('/', SessionGuard(), RoleGuard([RoleEnum.ADMIN]), async (ctx: ParameterizedContext) => {
  const user = await getUserAll();
  if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
  ctx.body = user;
}); // {get} /me

router.get('/me', SessionGuard(), RoleGuard([RoleEnum.USER]), async (ctx: ParameterizedContext) => {
  const data = ctx.data;
  if (!data.user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
  ctx.body = omit(data.user, ['id']);
}); // {get} /me

router.get(
  '/:id',
  SessionGuard({}),
  RoleGuard([RoleEnum.USER]),
  PathGuard(IdStringSchema, { stripUnknown: false }),
  PathGuard(IdSchema, { stripUnknown: false }),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    if (typeof data.path.id === 'string') {
      const user = await getUserByUserId(data.path.id);
      if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
      ctx.body = user;
    } else {
      const user = await getUserById(data.path.id);
      if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
      ctx.body = user;
    }
  },
); // {get} /:id

/************************** user_status **************************/

router.post(
  '/:id',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(IdStringSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const status = enableUser(data.path.id);
    if (!status) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
    ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = SUCCESS.ACCEPTED.message;
  },
); // {post} /login

router.delete(
  '/:id',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(IdStringSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const status = disableUser(data.path.id);
    if (!status) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
    ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = SUCCESS.ACCEPTED.message;
  },
); // {post} /login

export { router, route };
