import mongoose, { Mongoose } from 'mongoose';
import logger from '../log.ts';

const log = logger('models');

export async function connectToMongoDB(
  mongoUrl: string = process.env.MONGO_DB_URL || '',
  options?: mongoose.ConnectOptions,
): Promise<Mongoose> {
  const mongoOpts: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    ...options,
  };

  try {
    const connection = await mongoose.connect(mongoUrl, mongoOpts);
    log.debug(`Connected to MongoDB at ${connection.connection.host}`);

    connection.on('connected', () => {
      log.debug('MongoDB connection established');
    });

    connection.on('disconnected', () => {
      log.warn('MongoDB connection disconnected');
      // Attempt reconnection with a slight delay to avoid rapid reconnects
      setTimeout(() => connectToMongoDB(mongoUrl, options), 5000);
    });

    connection.on('error', (err: Error) => {
      log.error('MongoDB connection error:', err.message);
      // Handle errors appropriately, potentially retrying or notifying users
    });

    return connection;
  } catch (error) {
    log.error('Error connecting to MongoDB:', error.message);
    throw error; // Rethrow to allow higher-level error handling
  }
}
