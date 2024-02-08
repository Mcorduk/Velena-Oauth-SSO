import TokenService from '../../src/services/token.service';
import { JwtPayload } from 'jsonwebtoken'; // Import the JwtPayload type from the 'jsonwebtoken' package

describe('TokenService', () => {
  const secretKey = 'mySecretKey';
  const tokenService = new TokenService(secretKey);

  test('generates an access token', () => {
    const userId = '123';
    const clientId = '456';
    const scopes = ['read', 'write'];
    const accessToken = tokenService.generateAccessToken(userId, clientId, scopes);

    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe('string');
  });

  test('generates a refresh token', () => {
    const userId = '123';
    const clientId = '456';
    const scopes = ['read', 'write'];
    const refreshToken = tokenService.generateRefreshToken(userId, clientId, scopes);

    expect(refreshToken).toBeDefined();
    expect(typeof refreshToken).toBe('string');
  });

  test('verifies a valid access token', () => {
    const userId = '123';
    const clientId = '456';
    const scopes = ['read', 'write'];
    const accessToken = tokenService.generateAccessToken(userId, clientId, scopes);

    const verifiedToken = tokenService.verifyToken(accessToken, secretKey) as JwtPayload;

    expect(verifiedToken).toBeDefined();
    expect(verifiedToken.userId).toBe(userId);
    expect(verifiedToken.clientId).toBe(clientId);
    expect(verifiedToken.scopes).toEqual(scopes);
  });

  test('returns null for an invalid access token', () => {
    const invalidToken = 'invalidToken';

    const verifiedToken = tokenService.verifyToken(invalidToken, secretKey);

    expect(verifiedToken).toBeNull();
  });
});
