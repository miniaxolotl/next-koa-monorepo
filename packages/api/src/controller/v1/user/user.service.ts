import { createID } from '@libs/utility';
import { db } from '@libs/database';
import { genHash } from '@libs/crypt';
import { AuthType, RoleEnum, UserUniqueValues } from '@libs/shared';

export const createUser = async ({ email, password }: AuthType) => {
  const passwordHash: string = await genHash(password);
  const result = await db.user.create({
    data: {
      userId: createID(),
      password: passwordHash,
      email,
      roles: { create: { roleId: 'user' } },
    },
  });
  return result;
};

export const getUser = async (
  { id, userId, email }: Partial<UserUniqueValues>,
  { include }: { include?: Record<string, boolean> } = {},
) => {
  const result = await db.user.findMany({ where: { OR: { id, userId, email } }, include });
  return result;
};

export const getUserAll = async ({ include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findMany({ include });
  return result;
};

export const getUserById = async (userId: number, { include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findUnique({
    where: { id: userId },
    include,
  });
  return result;
};

export const getUserByUserId = async (userId: string, { include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findUnique({
    where: { userId },
    include,
  });
  return result;
};

export const getUserByEmail = async (email: string, { include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findUnique({ where: { email }, include });
  return result;
};

export const getUserBySessionId = async (
  sessionId: string,
  { include }: { include?: Record<string, boolean> } = {},
) => {
  const result = await db.session.findFirst({ where: { sessionId }, include: { user: true, ...include } });
  return result?.user ?? null;
};

export const enableUser = async (userId: number) => {
  const result = await db.user.update({ where: { id: userId }, data: { deleted: null } }).catch(() => null);
  return result && result.deleted === null;
};

export const disableUser = async (userId: number) => {
  const result = await db.user
    .update({
      where: { id: userId },
      data: {
        deleted: new Date(),
        roles: {
          upsert: {
            where: { roleId_userId: { userId, roleId: RoleEnum.DISABLED.role } },
            create: { roleId: RoleEnum.DISABLED.role },
            update: { deleted: null },
          },
        },
      },
    })
    .catch(() => null);
  return result && !result.deleted === null;
};

export const addUserRole = async (userId: number, roleId: string) => {
  const result = await db.userRole
    .upsert({
      where: { roleId_userId: { roleId, userId } },
      create: { userId, roleId },
      update: { userId, roleId },
    })
    .catch(() => null);
  return result ?? null;
};

export const getUserRole = async (userId: number, { include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.userRole.findMany({ where: { userId }, include }).catch(() => null);
  return result && result.length > 0 ? result : null;
};

export const deleteUserRole = async (userId: number, roleId: string) => {
  const result = await db.userRole
    .delete({
      where: { roleId_userId: { roleId, userId } },
    })
    .catch(() => null);
  return result ?? null;
};
