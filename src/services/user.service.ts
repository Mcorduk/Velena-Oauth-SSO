import User from '../models/user.model';
import userType from '../types/models/userType';
import { generatePasswordHash, validatePassword } from '../utils/password';

export class UserService {
  async register(email: string, password: string, firstName: string, lastName: string): Promise<userType> {
    const hashedPassword = await generatePasswordHash(password);
    const newUser = new User({ email, passwordHash: hashedPassword, firstName, lastName });
    await newUser.save();
    return newUser;
  }

  async authenticate(email: string, password: string): Promise<userType | null> {
    const user = await User.findOne({ email });
    if (!user) return null;
    const passwordMatches = await validatePassword(password, user.passwordHash);
    return passwordMatches ? user : null;
  }

  async findUserById(userId: string): Promise<userType | null> {
    return User.findById(userId);
  }

  // Add update user, delete user, etc.
}
