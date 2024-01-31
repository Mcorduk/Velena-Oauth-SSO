"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.env = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'sandbox';
dotenv_1.default.config({ path: path_1.default.resolve(`.env.${exports.env === 'production' ? 'prod' : 'sand'}`) });
console.log('ENV:', exports.env);
exports.config = {
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
