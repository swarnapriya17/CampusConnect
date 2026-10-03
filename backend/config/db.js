const mongoose = require('mongoose');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI;

  if (!connStr || connStr.includes('<username>')) {
    console.warn('⚠️  MongoDB URI not configured or placeholder used. Running in standalone REST API mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500 // Quick timeout so server startup is not blocked if DB is unavailable
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn('ℹ️  Backend API is running. MongoDB features will activate once connection is established.');
    return false;
  }
};

module.exports = connectDB;
