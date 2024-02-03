import { Mongoose } from 'mongoose';
import connectToMongoDB from '../../../src/config/db/mongodb';

describe('insert', () => {
  let mongoose: Mongoose; // Store the Mongoose instance

  beforeAll(async () => {
    mongoose = await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = mongoose.connection.collection('users');

    const mockUser: { name: string } = { name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ name: 'John' });
    expect(insertedUser).toEqual(mockUser);
  });
});
