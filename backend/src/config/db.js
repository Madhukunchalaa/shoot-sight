const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Automatically seed a default admin if none exists in the database
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@shootsight.com';
      const password = process.env.ADMIN_PASSWORD || 'ShootSight2026!';

      await Admin.create({ email, password });
      console.log(`Seeded default Admin: ${email}`);
    }
  } catch (error) {
    console.warn(`⚠️ MongoDB connection offline: ${error.message}`);
    console.warn(`⚙️ Backend is running in Database-Free fallback mode (Offline JSON database).`);
  }
};

module.exports = connectDB;
