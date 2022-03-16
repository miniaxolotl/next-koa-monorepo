export const server_config: {
  DEVELOPMENT: boolean;
  APPNAME: string;

  HOSTNAME: string;
  SERVER_PORT: number;
  CLIENT_PORT: number;

  SERVER_HOST: string;
  CLIENT_HOST: string;

  DATA_DIR: string;
  MAX_BYTES: number;

  SALT_ROUNDS: number;
  SESSION_KEYS: string[];

  ADMIN_EMAIL: string;
  ADMIN_USER: string;
  ADMIN_PASS: string;

  DATABASE_URL: string;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  APPNAME: process.env.APPNAME ?? 'next-koa-monorepo',

  HOSTNAME: process.env.HOSTNAME ?? 'localhost',
  SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 2000,
  CLIENT_PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT) : 2020,

  SERVER_HOST: process.env.SERVER_HOST ?? `http://localhost:${process.env.SERVER_PORT ?? 2000}/api/v1`,
  CLIENT_HOST: process.env.CLIENT_HOST ?? `http://localhost:${process.env.CLIENT_PORT ?? 2020}`,

  DATA_DIR: process.env.DATA_DIR ? process.env.DATA_DIR : './data',
  MAX_BYTES: process.env.MAX_BYTES ? parseInt(process.env.MAX_BYTES) : (2 << 19) * 500,

  SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 12,
  SESSION_KEYS: process.env.SESSION_KEYS
    ? JSON.parse(process.env.SESSION_KEYS)
    : ['super-duper-secret', 'even-more-secret'],

  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  ADMIN_USER: process.env.ADMIN_USER ?? 'admin',
  ADMIN_PASS: process.env.ADMIN_PASS ?? 'password',

  DATABASE_URL: process.env.DATABASE_URL ?? '',
};

export default { server_config };
