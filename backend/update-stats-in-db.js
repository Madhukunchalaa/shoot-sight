const mongoose = require('mongoose');
const dns = require('dns');
// Set DNS servers to Google Public DNS to ensure SRV resolution works
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const SiteConfig = require('./src/models/SiteConfig');

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('❌ MONGO_URI not found in environment or .env file.');
    process.exit(1);
  }

  console.log('🚀 Connecting to MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('✅ Connected!');

  const doc = await SiteConfig.findOne({ sectionKey: 'about_philosophy' });
  if (doc) {
    console.log('Found about_philosophy config in DB:', doc.content);
    doc.content.stat1Num = '250+';
    doc.content.stat1Label = 'Weddings Covered';
    doc.content.stat2Num = '15+';
    doc.content.stat2Label = 'Cities Covered';
    
    // Mark modified because content is Mixed type
    doc.markModified('content');
    await doc.save();
    console.log('✅ Updated about_philosophy statistics in DB!');
  } else {
    console.log('about_philosophy config not found in DB. Seeding will handle it on next start.');
  }

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌ Error updating DB:', err);
  process.exit(1);
});
