import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connect (){
  const mongoDB = process.env.DB_URL;
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(mongoDB);
    console.log('Connecting to MongodB server\n');
  } catch (err) {
    console.log('Error in connecting to MongoDB because of:', err);
    console.error(err);
  }
}
export default connect;