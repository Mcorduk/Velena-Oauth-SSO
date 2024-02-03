import { generatePasswordHash, validatePassword, isPasswordHash } from '../../src/utils/password';

describe('Password hash generation and validation', () => {
  const password: string = 'secret';
  let hash: string;

  beforeAll(async () => {
    hash = await generatePasswordHash(password);
  });

  test('generates a valid password hash', async () => {
    expect(hash).not.toBe(password);
    expect(isPasswordHash(hash)).toBe(true);
  });

  test('hashes of different passwords differ', async () => {
    const otherPassword: string = 'mystery';
    const otherHash: string = await generatePasswordHash(otherPassword);

    expect(hash).not.toEqual(otherHash);
  });

  test('hashes of same password are randomly salted', async () => {
    const otherHash: string = await generatePasswordHash(password);
    expect(hash).not.toEqual(otherHash);
  });

  test('correct password is validated', async () => {
    const result: boolean = await validatePassword(password, hash);
    expect(result).toBe(true);
  });

  test('incorrect password is not validated', async () => {
    const incorrectPassword: string = 'incorrect';
    const result: boolean = await validatePassword(incorrectPassword, hash);
    expect(result).toBe(false);
  });
});
