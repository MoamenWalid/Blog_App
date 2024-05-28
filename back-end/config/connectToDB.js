import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB! ^_^');
  } catch (err) {
    console.log('Connection failed to MongoDB!', err.message);
  }
}

export { connectDB };