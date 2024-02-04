import mongoose, { Schema } from 'mongoose';
import refreshTokenType from '../types/models/refreshTokenType';

const refreshTokenSchema = new Schema<refreshTokenType>(
  {
    clientId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    scopes: {
      type: [String],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const RefreshToken = mongoose.model<refreshTokenType>('User', refreshTokenSchema);
