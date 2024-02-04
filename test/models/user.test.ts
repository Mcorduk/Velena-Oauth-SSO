import { Mongoose } from 'mongoose';
import connectToMongoDB from '../../src/config/db/mongodb';
import User from '../../src/models/user.model';

describe('User Model', () => {
  let mongoose: Mongoose;

  beforeAll(async () => {
    mongoose = await connectToMongoDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user with valid data', async () => {
    const newUser = {
      email: 'john.doe@example.com',
      passwordHash: 'someStrongPassword', // Replace with a hashed password
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = new User(newUser);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(newUser.email);
    expect(savedUser.firstName).toBe(newUser.firstName);
    expect(savedUser.lastName).toBe(newUser.lastName);
    expect(savedUser.isActive).toBe(newUser.isActive);
  });

  it('should validate email format', async () => {
    const invalidUser = new User({
      email: 'invalidEmail',
      firstName: 'Test',
      lastName: 'User',
      passwordHash: 'password',
    });

    await expect(invalidUser.save()).rejects.toThrow('Invalid email');
  });

  it('should require a password hash', async () => {
    const userWithoutPassword = new User({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    });

    await expect(userWithoutPassword.save()).rejects.toThrow(
      'User validation failed: passwordHash: Path `passwordHash` is required.',
    );
  });

  it('should require firstName', async () => {
    const userWithoutFirstName = new User({
      email: 'test@example.com',
      lastName: 'User',
      passwordHash: 'password',
    });

    await expect(userWithoutFirstName.save()).rejects.toThrow(
      'User validation failed: firstName: Path `firstName` is required.',
    );
  });

  it('should require lastName', async () => {
    const userWithoutLastName = new User({
      email: 'test@example.com',
      firstName: 'Test',
      passwordHash: 'password',
    });

    await expect(userWithoutLastName.save()).rejects.toThrow(
      'User validation failed: lastName: Path `lastName` is required.',
    );
  });

  it.skip('should handle duplicate email errors', async () => {
    const existingUser = new User({
      email: 'existing@example.com',
      passwordHash: 'password',
      firstName: 'Existing',
      lastName: 'User',
    });
    await existingUser.save();

    const duplicateUser = new User({
      email: 'existing@example.com',
      passwordHash: 'anotherPassword',
      firstName: 'Duplicate',
      lastName: 'User',
    });

    await expect(duplicateUser.save()).rejects.toThrow('E11000'); // Duplicate email error code
  });
});
