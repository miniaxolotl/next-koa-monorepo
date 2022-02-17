import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

import { CreateUserSchema } from '@libs/shared';
import { SchemaGuard } from '@backend/middleware';

const route = ['/role'];
const router: Router = new Router();

/************************************************
 * routes
 ************************************************/

router.post('/', SchemaGuard(CreateUserSchema), async (ctx: ParameterizedContext) => {
  ctx.body = 'Hello World';
}); // {post} /login

export { router, route };
