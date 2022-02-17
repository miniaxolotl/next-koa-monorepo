import { ParameterizedContext } from 'koa';
import { Session, User } from '@prisma/client';

import { CLIENT_ERROR } from '@libs/shared';
import { getRoleByUserId } from '@backend/controller/v1/role/role.service';
import {
  deferSession,
  getSession,
  isSessionExpired,
  revokeSession,
} from '@backend/controller/auth/session/session.service';
import { getUser, getUserById } from '@backend/controller/v1/user/user.service';

export const SessionGuard = (options?: { passthrough?: boolean }) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    const authorization = ctx.headers.authorization;
    if (authorization && authorization.length > 0) {
      const authorization_key = authorization.split(' ')[1] ?? '';
      if (authorization_key) {
        const session = await getSession(authorization_key);
        if (session && !(await isSessionExpired(session))) {
          await deferSession(session);
          const user = await getUserById(session.userId);
          const roles = await getRoleByUserId(session.userId);
          ctx.data = {
            ...ctx.data,
            session: session,
            user: user,
            roles: roles,
          };
          return await next();
        } else {
          if (session) revokeSession(session);
        }
      }
    }

    if (options?.passthrough) return await next();
    ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  };
};
