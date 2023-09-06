// database config
import mongoose from 'mongoose';

const API_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://tluuchau1:Siunhanheo1@mindx-social-app.f2piaog.mongodb.net/?retryWrites=true&w=majority';

export const connectToDataBase = async () => {
  try {
    const connection = await mongoose.connect(API_URL);
    console.log(`Database is connected at ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
