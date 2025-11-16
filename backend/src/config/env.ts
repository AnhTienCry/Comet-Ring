import dotenv from 'dotenv';

dotenv.config();

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT, 4000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/comet-ring',
  jwtSecret: process.env.JWT_SECRET ?? 'comet-ring-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
};

export default env;

