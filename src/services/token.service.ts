import jwt from 'jsonwebtoken';
import RefreshToken from '../models/refreshToken.model';
import refreshTokenType from '../types/models/refreshTokenType';

export class TokenService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateAccessToken(userId: string, clientId: string, scopes: string[]): string {
    const payload = { userId, clientId, scopes };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  generateRefreshToken(userId: string, clientId: string, scopes: string[]): refreshTokenType {
    const refreshToken = new RefreshToken({ userId, clientId, scopes });
    refreshToken.save();
    return refreshToken;
  }

  verifyAccessToken(token: string): any | null {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }

  // Add more methods as needed (revoke tokens, etc.)
}
