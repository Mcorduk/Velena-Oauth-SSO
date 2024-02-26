import User from '../models/user.model';
import userType from '../types/models/user.type';
import { generatePasswordHash, validatePassword } from '../utils/password';
import mongoose from 'mongoose';

/**
 * Service class for managing user operations.
 */
export class UserService {
  /**
   * Registers a new user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @returns A promise that resolves to the newly registered user.
   */
  async register(email: string, password: string, firstName: string, lastName: string): Promise<userType> {
    const hashedPassword = await generatePasswordHash(password);
    const newUser = new User({ email, passwordHash: hashedPassword, firstName, lastName });
    await newUser.save();
    return newUser;
  }

  /**
   * Authenticates a user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the authenticated user or null if authentication fails.
   */
  async authenticate(email: string, password: string): Promise<userType | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const passwordMatches = await validatePassword(password, user.passwordHash);
    return passwordMatches ? user : null;
  }

  /**
   * Finds a user by their ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the found user or null if no user is found.
   */
  async findUserById(userId: string): Promise<userType | null> {
    return User.findById(userId);
  }

  /**
   * Updates a user by their ID.
   * @param {string} userId - The ID of the user to update.
   * @param {Partial<userType>} update - The partial user object containing the fields to update.
   * @returns {Promise<userType | null>} - A promise that resolves to the updated user object, or null if the user was not found.
   */
  async updateUserById(userId: string, update: Partial<userType>): Promise<userType | null> {
    const modifiedUser = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!modifiedUser) {
      return null;
    }
    return modifiedUser;
  }

  /**
   * Removes a user by their ID.
   * @param userId The ID of the user to remove.
   * @returns A Promise that resolves to the removed user, or null if the user was not found.
   */
  async removeUserById(userId: string): Promise<userType | null> {
    const removedUser = await User.findByIdAndDelete(userId);
    if (!removedUser) {
      return null;
    }
    return removedUser;
  }

  // Add update user, delete user, etc.
}
