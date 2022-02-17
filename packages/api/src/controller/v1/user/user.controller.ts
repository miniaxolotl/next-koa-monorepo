import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
// import _ from 'lodash';

import { SessionGuard } from '@backend/middleware/session.guard';
import { CLIENT_ERROR, CreateUserSchema, IdSchema, RoleEnum, RolePathSchema, SUCCESS } from '@libs/shared';
import { PathGuard, RoleGuard, SchemaGuard } from '@backend/middleware';

import {
  addUserRole,
  createUser,
  deleteUserRole,
  disableUser,
  enableUser,
  getUser,
  getUserAll,
  getUserById,
  getUserRole,
} from './user.service';

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
  ctx.body = data.user;
}); // {get} /me

router.get(
  '/:id',
  SessionGuard(),
  RoleGuard([RoleEnum.USER]),
  PathGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const user = await getUserById(data.path.id);
    if (!user) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
    ctx.body = user;
  },
); // {get} /:user_id

/************************** user_status **************************/

router.post(
  '/:id',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(IdSchema),
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
  PathGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const status = disableUser(data.path.id);
    if (!status) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
    ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = SUCCESS.ACCEPTED.message;
  },
); // {post} /login

/************************** user_role **************************/

router.get(
  '/:id/role',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const roles = await getUserRole(data.path.id);
    console.log(roles);

    if (!roles) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
    // ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = roles;
    //
  },
); // {post} /login

router.post(
  '/:id/:role',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(RolePathSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const status = addUserRole(data.path.id, data.path.role);
    if (!status) ctx.throw(CLIENT_ERROR.BAD_REQUEST.status, CLIENT_ERROR.BAD_REQUEST.message);
    ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = SUCCESS.ACCEPTED.message;
  },
); // {post} /login

router.delete(
  '/:id/:role',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(RolePathSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const status = deleteUserRole(data.path.id, data.path.role);
    if (!status) ctx.throw(CLIENT_ERROR.BAD_REQUEST.status, CLIENT_ERROR.BAD_REQUEST.message);
    ctx.status = SUCCESS.ACCEPTED.status;
    ctx.body = SUCCESS.ACCEPTED.message;
  },
); // {post} /login

export { router, route };
