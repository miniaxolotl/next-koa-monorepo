import { ParameterizedContext } from 'koa';

import { CLIENT_ERROR, RoleEnum, RoleType } from '@libs/shared';

export const RoleGuard = (roles: RoleType[], options?: { passthrough?: boolean; match?: boolean }) => {
  return async (ctx: ParameterizedContext, next: () => Promise<void>) => {
    let authorized = false;
    for (const role of ctx.data.roles) {
      if (role.roleId === RoleEnum.DISABLED.role)
        return ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
      for (const requirement of roles) {
        if (roles.length === 1 || !options?.match) {
          if (role.roleId === requirement.role || role.authority >= requirement.authority) authorized = true;
        } else {
          if (role.roleId === requirement.role) authorized = true;
        }
      }
    }
    if (authorized || options?.passthrough) return await next();
    return ctx.throw(CLIENT_ERROR.UNAUTHORIZED.status, CLIENT_ERROR.UNAUTHORIZED.message);
  };
};
