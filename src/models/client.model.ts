import mongoose from 'mongoose';
import clientType from '../types/models/clientType';

const client = new mongoose.Schema<clientType>(
  {
    clientId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

const Client = mongoose.model('Client', client);
export default Client;
