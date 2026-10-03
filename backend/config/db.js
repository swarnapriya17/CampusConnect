const mongoose = require('mongoose');
const dns = require('dns');

// Optimize DNS resolution for MongoDB Atlas SRV lookup on Windows networks
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (err) {
  // ignore if DNS override is restricted
}

const connectDB = async () => {
  let connStr = process.env.MONGODB_URI;

  if (!connStr || connStr.includes('<username>') || connStr.includes('<db_password>')) {
    console.warn('⚠️  MongoDB URI not configured or placeholder <db_password> used in backend/.env. Running in standalone REST API mode.');
    return false;
  }

  // Safely auto-encode special characters like '@' in the password if unencoded
  try {
    const schemeIndex = connStr.indexOf('://');
    if (schemeIndex !== -1) {
      const prefix = connStr.substring(0, schemeIndex + 3);
      const rest = connStr.substring(schemeIndex + 3);
      const lastAt = rest.lastIndexOf('@');
      if (lastAt !== -1) {
        const userInfo = rest.substring(0, lastAt);
        const hostAndParams = rest.substring(lastAt + 1);
        const firstColon = userInfo.indexOf(':');
        if (firstColon !== -1) {
          const user = userInfo.substring(0, firstColon);
          const rawPass = userInfo.substring(firstColon + 1);
          if (rawPass.includes('@') && !rawPass.includes('%40')) {
            const encodedPass = encodeURIComponent(rawPass);
            connStr = `${prefix}${user}:${encodedPass}@${hostAndParams}`;
          }
        }
      }
    }
  } catch (err) {
    // fallback to original connStr if parsing fails
  }

  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000 // Allow up to 10s for Atlas DNS + TLS handshake
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


