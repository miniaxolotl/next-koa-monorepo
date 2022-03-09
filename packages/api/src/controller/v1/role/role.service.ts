import { db } from '@libs/database';

export const getRolesByUserId = async (userId: string) => {
  const result = await db.userRole.findMany({ where: { userId } });
  return result;
};
