import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR } from '@libs/shared';

import { getRolesByUserId } from '@backend/controller/v1/role/role.service';
import { getUserById } from '@backend/controller/v1/user/user.service';
import { getSession, isSessionExpired, revokeSession } from '@backend/controller/auth/session/session.service';

export const SessionGuard = (options?: { passthrough?: boolean }) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const authorization = ctx.headers.authorization;
    if (authorization && authorization.length > 0) {
      const authorization_key = authorization.split(' ')[1] ?? '';
      if (authorization_key) {
        const session = await getSession(authorization_key);
        if (!session || (await isSessionExpired(session))) {
          if (session) revokeSession(session);
          ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
        }
        const user = await getUserById(session.userId);
        if (!user) ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
        const roles = await getRolesByUserId(user?.id);
        ctx.data = {
          ...ctx.data,
          session,
          user,
          roles,
        };
        return await next();
      }
    }
    if (options?.passthrough) return await next();
    ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  };
};
