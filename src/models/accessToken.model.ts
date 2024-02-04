import mongoose, { Schema } from 'mongoose';
import accessTokenType from '../types/models/accessTokenType';

const accessTokenSchema = new Schema<accessTokenType>(
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

const AccessToken = mongoose.model<accessTokenType>('AccessToken', accessTokenSchema);
export default AccessToken;
