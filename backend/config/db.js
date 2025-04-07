import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
// CHECKOUT_API_KEY_SECRET="sk_test_51PXnzIRqUQgN4UXmv2YevewHDxLYS6Prz7V7UsnzYSAFCWjYsw9Ki0YUYSKX0q1K1KGuKsb15K7oRY7nwDWRIxNy008fXWjTvD"