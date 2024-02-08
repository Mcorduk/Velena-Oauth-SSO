import mongoose from 'mongoose';
import isEmail from '../utils/isEmail';
import { isPasswordHash } from '../utils/password';
import userType from '../types/models/user.type';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: { validator: isEmail, message: 'Invalid email' },
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
      validate: { validator: isPasswordHash, message: 'Invalid password hash' },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<userType>('User', userSchema);
export default User;
