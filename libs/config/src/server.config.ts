export const server_config: {
  DEVELOPMENT: boolean;
  PORT: number;
  DATA_DIR: string;
  MAX_BYTES: number;
  CRYPT_SALT_ROUNDS: number;
  SESSION_KEYS: string[];
  ADMIN_EMAIL: string;
  ADMIN_USER: string;
  ADMIN_PASS: string;
  DATABASE_URL: string;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 2000,
  DATA_DIR: process.env.DATA_DIR ? process.env.DATA_DIR : './data',
  MAX_BYTES: process.env.MAX_BYTES ? parseInt(process.env.MAX_BYTES) : (2 << 19) * 500,
  CRYPT_SALT_ROUNDS: process.env.CRYPT_SALT_ROUNDS ? parseInt(process.env.CRYPT_SALT_ROUNDS) : 12,
  SESSION_KEYS: process.env.SESSION_KEYS
    ? JSON.parse(process.env.SESSION_KEYS)
    : ['super-duper-secret', 'even-more-secret'],
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  ADMIN_USER: process.env.ADMIN_USER ?? 'admin',
  ADMIN_PASS: process.env.ADMIN_PASS ?? 'password',
};

export default server_config;
