import { Mongoose } from 'mongoose';
import connectToMongoDB from '../../src/config/db/mongodb';
import Client from '../../src/models/client.model';

describe('Client Model', () => {
  let mongoose: Mongoose;

  beforeAll(async () => {
    mongoose = await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new client with valid data', async () => {
    const newClient = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      redirectUrl: 'https://example.com/callback',
      name: 'Test Client',
      description: 'This is a test client',
    };

    const client = new Client(newClient);
    const savedClient = await client.save();

    expect(savedClient._id).toBeDefined();
    expect(savedClient.clientId).toBe(newClient.clientId);
    expect(savedClient.clientSecret).toBe(newClient.clientSecret);
    expect(savedClient.redirectUrl).toBe(newClient.redirectUrl);
    expect(savedClient.name).toBe(newClient.name);
    expect(savedClient.description).toBe(newClient.description);
    expect(savedClient.createdAt).toBeDefined();
    expect(savedClient.updatedAt).toBeDefined();
  });

  it('should validate required fields', async () => {
    const invalidClient = new Client({
      name: 'Test Client',
      description: 'This is a test client',
    });

    await expect(invalidClient.save()).rejects.toThrow(
      'Client validation failed: redirectUrl: Path `redirectUrl` is required., clientSecret: Path `clientSecret` is required., clientId: Path `clientId` is required.',
    );
  });

  it('should trim whitespace from name and description', async () => {
    const clientWithWhitespace = new Client({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      redirectUrl: 'https://example.com/callback',
      name: '  Test Client  ',
      description: '  This is a test client  ',
    });

    const savedClient = await clientWithWhitespace.save();

    expect(savedClient.name).toBe('Test Client');
    expect(savedClient.description).toBe('This is a test client');
  });

  it.skip('should handle duplicate clientId errors', async () => {
    // Implement test for handling duplicate clientId errors
  });

  // Add more tests as needed, e.g., for updating, deleting, and querying clients
});
