import mongoose from 'mongoose';

export async function connect(): Promise<mongoose.Mongoose> {
  try {
    const url = process.env.MONGO_DB_URL || '';
    const connection: mongoose.Mongoose = await mongoose.connect(url);
    console.log('DB CONNECTED');
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
  // Reconnect only if not already reconnecting
  if (!mongoose.connection.readyState) {
    connect();
  }
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
