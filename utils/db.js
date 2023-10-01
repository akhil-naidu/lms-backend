import 'dotenv/config';
import mongoose from 'mongoose';

/** @type {string} Enter your MongoDB URL*/
const dbURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const data = await mongoose.connect(dbURL);
    console.log(`Data connected with ${data.connection.host}`);
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
