import mongoose from 'mongoose';
import env from './env';

mongoose.set('strictQuery', true);

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(env.mongoUri);
    console.log('✅ Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error);
    throw error;
  }
};

export default connectToDatabase;

