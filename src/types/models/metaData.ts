import mongoose from 'mongoose';

interface metaData extends mongoose.Schema {
  createdAt: Date;
  updatedAt: Date;
}

export default metaData;
