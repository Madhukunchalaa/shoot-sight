/**
 * Run once to create admin in MongoDB:
 *   node scripts/seed-admin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');

const EMAIL    = process.env.ADMIN_EMAIL    || 'admin@shootsight.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'ShootSight2026!';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await Admin.findOne({ email: EMAIL });
  if (existing) {
    console.log(`Admin already exists: ${EMAIL}`);
    process.exit(0);
  }

  await Admin.create({ email: EMAIL, password: PASSWORD });
  console.log(`Admin created: ${EMAIL}`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
