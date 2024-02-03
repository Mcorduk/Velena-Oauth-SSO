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

  it('should connect to MongoDB successfully', async () => {
    const connection = mongoose.connection;
    expect(connection.readyState).toBe(1); // 1 indicates connected
  });

  it('should insert a doc into collection and find it by ID', async () => {
    const users = mongoose.connection.collection('users');

    const mockUser: { date: Date } = { date: new Date() };
    const insertedUser = await users.insertOne(mockUser);
    const insertedUserId = insertedUser.insertedId;

    const foundUser = await users.findOne({ _id: insertedUserId });
    expect(foundUser).toEqual(mockUser);
  });
});
