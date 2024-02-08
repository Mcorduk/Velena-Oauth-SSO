import jwt from 'jsonwebtoken';
import TokenPayload from '../types/services/token.type';

class TokenService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateAccessToken(userId: string, clientId: string, scopes: string[]): string {
    const payload: TokenPayload = { userId, clientId, scopes };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  generateRefreshToken(userId: string, clientId: string, scopes: string[]): string {
    const payload: TokenPayload = { userId, clientId, scopes };
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}

export default TokenService;
