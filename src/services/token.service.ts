import jwt from 'jsonwebtoken';
import TokenPayload from '../types/services/token.type';

/**
 * Service for generating and verifying tokens.
 */
class TokenService {
  private readonly secretKey: string;

  /**
   * Constructs a new TokenService instance.
   * @param secretKey The secret key used for token generation and verification.
   */
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  /**
   * Generates an access token.
   * @param userId The user ID associated with the token.
   * @param clientId The client ID associated with the token.
   * @param scopes The scopes associated with the token.
   * @returns The generated access token.
   */
  generateAccessToken(userId: string, clientId: string, scopes: string[]): string {
    const payload: TokenPayload = { userId, clientId, scopes };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  /**
   * Generates a refresh token.
   * @param userId The user ID associated with the token.
   * @param clientId The client ID associated with the token.
   * @param scopes The scopes associated with the token.
   * @returns The generated refresh token.
   */
  generateRefreshToken(userId: string, clientId: string, scopes: string[]): string {
    const payload: TokenPayload = { userId, clientId, scopes };
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  /**
   * Verifies a token.
   * @param token The token to verify.
   * @param secret The secret key used for verification.
   * @returns The decoded token if it is valid, otherwise null.
   */
  verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}

export default TokenService;
