import mongoose from 'mongoose';
import isEmail from '../utils/isEmail';
import userType from '../types/models/userType';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: { validator: isEmail, message: 'Invalid email' },
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      trim: true,
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

export const User = mongoose.model<userType>('User', userSchema);
