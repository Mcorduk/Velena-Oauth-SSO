import mongoose, { Mongoose } from 'mongoose';
import logger from '../log';

const log = logger('models');

async function connectToMongoDB(): Promise<Mongoose> {
  try {
    const mongoUrl: string = process.env.MONGO_DB_URL || '';

    // Connect to MongoDB and assign the connection object to a variable
    await mongoose.connect(mongoUrl);

    // Access the connection object using `mongoose.connection`
    const connection = mongoose.connection;

    connection.on('connected', () => {
      log.debug(`Connected to MongoDB at ${connection.host}`);
    });

    connection.on('disconnected', () => {
      log.warn('MongoDB connection disconnected');
      // Attempt reconnection with a slight delay to avoid rapid reconnects
      setTimeout(() => connectToMongoDB(), 5000);
    });

    connection.on('error', (err: Error) => {
      log.error('MongoDB connection error:', err.message);
      // Handle errors appropriately, potentially retrying or notifying users
    });

    return mongoose;
  } catch (error: unknown) {
    if (error instanceof Error) {
      log.error('Error connecting to MongoDB:', error.message);
      throw error; // Rethrow to allow higher-level error handling
    } else {
      throw new Error('Unknown error occurred while connecting to MongoDB');
    }
  }
}

export default connectToMongoDB;
