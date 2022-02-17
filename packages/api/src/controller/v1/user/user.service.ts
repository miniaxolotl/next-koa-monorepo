import { db } from '@libs/database';
import { UserType, UserUniqueValues } from '@libs/shared';
import { createID, genHash } from '@libs/utility';

export const createUser = async ({ username, email, password }: UserType) => {
  const passwordHash: string = await genHash(password);
  const userId: string = createID();
  const result = await db.user.create({
    data: {
      userId,
      username,
      password: passwordHash,
      email,
      roles: { create: { roleId: 'user' } },
    },
  });
  return result;
};

export const getUser = async (
  { userId, email, username }: Partial<UserUniqueValues>,
  { include }: { include?: Record<string, boolean> } = {},
) => {
  const result = await db.user.findFirst({ where: { OR: { userId, email, username } }, include });
  return result;
};

export const getUserAll = async ({ include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findMany({ include });
  return result;
};

export const getUserById = async (userId: string, { include }: { include?: Record<string, boolean> } = {}) => {
  const result = await db.user.findUnique({ where: { userId }, include });
  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await db.user.findUnique({ where: { email } });
  return result;
};

export const getUserByUsername = async (username: string) => {
  const result = await db.user.findUnique({ where: { username } });
  return result;
};

export const getUserBySessionId = async (sessionId: string) => {
  const result = await db.session.findUnique({ where: { sessionId }, include: { user: true } });
  return result?.user ?? null;
};

export const enableUser = async (userId: string) => {
  const result = await db.user.update({ where: { userId }, data: { deleted: new Date() } });
  return !result.deleted === null;
};

export const disableUser = async (userId: string) => {
  const result = await db.user.update({ where: { userId }, data: { deleted: null } });
  return result.deleted === null;
};

export const addUserRole = async (userId: string, role: string) => {
  const result = await db.userRole.upsert({
    where: { roleId_userId: { roleId: role, userId } },
    create: { userId, roleId: role },
    update: { userId, roleId: role },
  });
  return result ?? null;
};

export const getUserRole = async (userId: string) => {
  const result = await db.userRole.findMany({ where: { userId } });
  return result.length > 0 ? result : null;
};

export const deleteUserRole = async (userId: string, role: string) => {
  const result = await db.userRole.delete({
    where: { roleId_userId: { roleId: role, userId } },
  });
  return result ?? null;
};
