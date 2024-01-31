import path from 'path';
import dotenv from 'dotenv';

export const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'sandbox';
dotenv.config({ path: path.resolve(`.env.${env === 'production' ? 'prod' : 'sand'}`) });
console.log('ENV:', env);

export const config = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,

  REDIS_URL: process.env.REDIS_URL || '',

  LinkedInClientId: process.env.LinkedInClientId,
  LinkedInApiSecret: process.env.LinkedInApiSecret,

  GoogleClientId: process.env.GoogleClientId,
  GoogleApiSecret: process.env.GoogleApiSecret,

  MicrosoftClientId: process.env.MicrosoftClientId,
  MicrosoftSecret: process.env.MicrosoftSecret,
  MicrosoftTenant: process.env.MicrosoftTenant,
};
