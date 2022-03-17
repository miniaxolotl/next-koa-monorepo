import { db } from '@libs/database';

export const getRolesByUserId = async (userId: number) => {
  const result = await db.userRole.findMany({ where: { userId } });
  return result;
};
