import jwt from 'jsonwebtoken';
import RefreshToken from '../models/refreshToken.model';
import refreshTokenType from '../types/models/refreshTokenType';

export class JwtService {
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

export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(userId: string, clientId: string, scopes: string[]): Promise<string> {
    const payload = { userId, clientId, scopes };
    return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
  }

  async generateRefreshToken(userId: string, clientId: string, scopes: string[]): Promise<refreshTokenType> {
    const refreshToken = new RefreshToken({ userId, clientId, scopes });
    await refreshToken.save();
    return refreshToken;
  }

  async verifyAccessToken(token: string): Promise<any | null> {
    try {
      return jwt.verify(token, 'your-secret-key');
    } catch (error) {
      return null;
    }
  }

  // Add more methods as needed (revoke tokens, etc.)
}
