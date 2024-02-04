import { Mongoose } from 'mongoose';
import connectToMongoDB from '../../src/config/db/mongodb'; // Adjust path if needed
import AccessToken from '../../src/models/accessToken.model'; // Adjust path if needed

describe('AccessToken Model', () => {
  let mongoose: Mongoose;

  beforeAll(async () => {
    mongoose = await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new access token with valid data', async () => {
    const newAccessToken = {
      clientId: 'test-client-id',
      userId: 'test-user-id',
      scopes: ['read:users', 'write:posts'],
      expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
    };

    const accessToken = new AccessToken(newAccessToken);
    const savedAccessToken = await accessToken.save();

    expect(savedAccessToken._id).toBeDefined();
    expect(savedAccessToken.clientId).toBe(newAccessToken.clientId);
    expect(savedAccessToken.userId).toBe(newAccessToken.userId);
    expect(savedAccessToken.scopes).toEqual(newAccessToken.scopes);
    expect(savedAccessToken.expiresAt).toBe(newAccessToken.expiresAt);
    expect(savedAccessToken.createdAt).toBeDefined();
    expect(savedAccessToken.updatedAt).toBeDefined();
  });

  it('should validate required fields', async () => {
    const invalidAccessToken = new AccessToken({
      userId: 'test-user-id',
      scopes: ['read:users'],
      expiresAt: new Date(),
    });

    await expect(invalidAccessToken.save()).rejects.toThrow(
      'AccessToken validation failed: clientId: Path `clientId` is required.',
    );
  });

  it.skip('should validate expiration date', async () => {
    const expiredAccessToken = new AccessToken({
      clientId: 'test-client-id',
      userId: 'test-user-id',
      scopes: ['read:users'],
      expiresAt: new Date(Date.now() - 1000), // Already expired
    });

    await expect(expiredAccessToken.save()).rejects.toThrow(
      'ValidationError: AccessToken validation failed: expiresAt: Expiration date must be in the future.',
    );
  });

  // Add more tests as needed, e.g., for finding, updating, and deleting access tokens
});
