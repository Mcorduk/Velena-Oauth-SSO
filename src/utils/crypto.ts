import { randomBytes } from 'crypto';

const generateRandomString = (length: number): string => {
  return randomBytes(length).toString('hex');
};

export const generateClientId = (): string => {
  return generateRandomString(8);
};

export const generateClientSecret = (): string => {
  return generateRandomString(16);
};
