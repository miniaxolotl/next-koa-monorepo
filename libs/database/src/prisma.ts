import { PrismaClient } from '@prisma/client';

export const db: PrismaClient = new PrismaClient();

export const connectDB = async () => {
  if (db) {
    console.log('database: connected successfully');
    await db.$connect();

    return db;
  } else {
    console.log('database: error connecting');
    return null;
  }
};
