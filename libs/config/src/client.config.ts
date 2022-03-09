export const client_config: {
  DEVELOPMENT: boolean;
  CLIENT_PORT: number;
} = {
  DEVELOPMENT: !!process.env.DEVELOPMENT ?? true,
  CLIENT_PORT: process.env.CLIENT_PORT ? parseInt(process.env.CLIENT_PORT) : 2020,
};

export default { client_config };
