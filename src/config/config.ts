import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Determine the environment
export const env = process.env.NODE_ENV || 'sandbox';
dotenv.config({ path: path.resolve(`.env.${env === 'production' ? 'prod' : 'sand'}`) });
console.log('ENV:', env);

// Calculate default log level based on environment
const DEFAULT_LOG_LEVEL = env === 'production' ? 'info' : 'debug';

// Define configuration
export const config = {
  // Common configuration properties
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',

  // Application-specific configuration properties
  DATABASE_URL: process.env.MONGO_DB_URL,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST || 'localhost',
  NODEMAILER_PORT: process.env.NODEMAILER_PORT || 25,
  NODEMAILER_USER: process.env.NODEMAILER_USER || undefined,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS || undefined,
  NODEMAILER_SECURE: process.env.NODEMAILER_SECURE || false,
  BG_TASKS_QUEUE: process.env.BG_TASKS_QUEUE || 'bg-tasks',

  // Logging configuration
  NODE_ENV: env,
  LOG_LEVEL: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,

  // Other application-specific properties
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,

  // Third-party API keys
  LinkedInClientId: process.env.LinkedInClientId,
  LinkedInApiSecret: process.env.LinkedInApiSecret,
  GoogleClientId: process.env.GoogleClientId,
  GoogleApiSecret: process.env.GoogleApiSecret,
  MicrosoftClientId: process.env.MicrosoftClientId,
  MicrosoftSecret: process.env.MicrosoftSecret,
  MicrosoftTenant: process.env.MicrosoftTenant,
};
