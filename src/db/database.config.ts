import 'dotenv/config'
import mongoose from 'mongoose'

// database configuration from hodal connection string!!!!!
const uri =
//   process.env.NODE_ENV === 'production'
//     ? process.env.MONGO_PRO_DB
//     : process.env.NODE_ENV === 'test'
//     ? process.env.MONG_TEST_DB
//     : process.env.DEV
process.env.NODE_ENV === 'production'
? process.env.MONGO_PROD_DB
: process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_DB
    : process.env.MONGO_DEV_DB

export const connect = async (): Promise<void> => {
  // database connection
  try {
    await mongoose.connect(uri!);
  } catch (error) {
    console.log(
      `Database connection failed at ${uri} and gives this error of string connection ${error}`
    );
    process.exit(1);
  }
};
