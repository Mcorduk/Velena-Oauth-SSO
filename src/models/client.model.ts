import mongoose from 'mongoose';
import clientType from '../types/models/clientType';

const client = new mongoose.Schema<clientType>(
  {
    name: String,
    id: {
      type: String,
      unique: true,
    },
    secret: String,
    redirectUrl: String,
  },
  { timestamps: true },
);

export const Client = mongoose.model('Clients', client);
