export const client_config: {
  DEVELOPMENT: boolean;
  APPNAME: string;

  HOSTNAME: string;
  SERVER_PORT: number;
  CLIENT_PORT: number;

  SERVER_HOST: string;
  CLIENT_HOST: string;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  APPNAME: process.env.APPNAME ?? 'next-koa-monorepo',

  HOSTNAME: process.env.HOSTNAME ?? 'localhost',
  SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 2000,
  CLIENT_PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT) : 2020,

  SERVER_HOST: process.env.SERVER_HOST ?? `http://localhost:${process.env.SERVER_PORT ?? 2000}/api/v1`,
  CLIENT_HOST: process.env.CLIENT_HOST ?? `http://localhost:${process.env.CLIENT_PORT ?? 2020}`,
};

export default { client_config };
