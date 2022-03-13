import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

import { CLIENT_ERROR, IdSchema, RoleEnum, RolePathSchema, SUCCESS } from '@libs/shared';
import { PathGuard, RoleGuard, SessionGuard } from '@backend/middleware';
import { addUserRole, deleteUserRole, getUserRole } from '../user/user.service';

const route = ['/role'];
const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.get(
  '/:id',
  SessionGuard(),
  RoleGuard([RoleEnum.ADMIN]),
  PathGuard(IdSchema),
  async (ctx: ParameterizedContext) => {
    const data = ctx.data;
    const roles = await getUserRole(data.path.id);
    if (!roles) ctx.throw(CLIENT_ERROR.NOT_FOUND.status, CLIENT_ERROR.NOT_FOUND.message);
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
