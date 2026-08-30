const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[VivahaVerse DB] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[VivahaVerse DB] MongoDB Atlas Connection Notice: ${error.message}`);
    console.warn(`[VivahaVerse DB] Operating with DB state fallback/mock database handling.`);
    return false;
  }
};

module.exports = connectDB;
