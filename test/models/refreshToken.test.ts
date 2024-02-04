import { Mongoose } from 'mongoose';
import connectToMongoDB from '../../src/config/db/mongodb'; // Adjust path if needed
import RefreshToken from '../../src/models/refreshToken.model'; // Adjust path if needed

describe('RefreshToken Model', () => {
  let mongoose: Mongoose;

  beforeAll(async () => {
    mongoose = await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new refresh token with valid data', async () => {
    const newRefreshToken = {
      clientId: 'test-client-id',
      userId: 'test-user-id',
      scopes: ['read:users', 'write:posts'],
      expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
    };

    const refreshToken = new RefreshToken(newRefreshToken);
    const savedRefreshToken = await refreshToken.save();

    expect(savedRefreshToken._id).toBeDefined();
    expect(savedRefreshToken.clientId).toBe(newRefreshToken.clientId);
    expect(savedRefreshToken.userId).toBe(newRefreshToken.userId);
    expect(savedRefreshToken.scopes).toEqual(newRefreshToken.scopes);
    expect(savedRefreshToken.expiresAt).toBe(newRefreshToken.expiresAt);
    expect(savedRefreshToken.createdAt).toBeDefined();
    expect(savedRefreshToken.updatedAt).toBeDefined();
  });

  it('should validate required fields', async () => {
    const invalidRefreshToken = new RefreshToken({
      userId: 'test-user-id',
      scopes: ['read:users'],
      expiresAt: new Date(),
    });

    await expect(invalidRefreshToken.save()).rejects.toThrow(
      'RefreshToken validation failed: clientId: Path `clientId` is required.',
    );
  });

  it.skip('should validate expiration date', async () => {
    const expiredRefreshToken = new RefreshToken({
      clientId: 'test-client-id',
      userId: 'test-user-id',
      scopes: ['read:users'],
      expiresAt: new Date(Date.now() - 1000), // Already expired
    });

    await expect(expiredRefreshToken.save()).rejects.toThrow(
      'ValidationError: RefreshToken validation failed: expiresAt: Expiration date must be in the future.',
    );
  });

  // Add more tests as needed, e.g., for finding, updating, and deleting refresh tokens
});
