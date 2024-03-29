import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbUrl: process.env.DB_URL,
}));
