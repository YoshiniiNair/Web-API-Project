
const mongoose = require('mongoose');

// Define the database URI (using environment variable)
const DATABASE_URL = process.env.DATABASE_URL;

const connect = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful connection
    console.log('MongoDB connected successfully');
  } catch (err) {
    // Log connection errors and exit the process
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connect;