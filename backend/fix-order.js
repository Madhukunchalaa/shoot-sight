const mongoose = require('mongoose');
require('dotenv').config();

const { Schema, model } = mongoose;
const shootSchema = new Schema(
  { title: String, slug: String, category: String, location: String, date: String, desc: String, heroImage: String, gallery: [String] },
  { timestamps: true, autoIndex: false }
);
const Shoot = model('Shoot', shootSchema);

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected!');

  // Delete test entries
  const del = await Shoot.deleteMany({ slug: 'test' });
  console.log('Deleted test entries:', del.deletedCount);

  // Set correct display order via createdAt so ASC sort = correct scroll order
  const order = [
    { slug: 'raghudixith-varijashree', createdAt: new Date('2026-01-01') },
    { slug: 'naveen-kate',             createdAt: new Date('2026-02-01') },
    { slug: 'ragini',                  createdAt: new Date('2026-03-01') },
    { slug: 'aishwarya-and-akshay',    createdAt: new Date('2026-04-01') },
    { slug: 'srinidhi-and-ramya',      createdAt: new Date('2026-05-01') },
  ];

  for (const o of order) {
    await Shoot.collection.updateOne({ slug: o.slug }, { $set: { createdAt: o.createdAt } });
    console.log('Set order for:', o.slug);
  }

  const all = await Shoot.find().sort({ createdAt: 1 }).select('title slug');
  console.log('\nFinal order (left to right):');
  all.forEach((s, i) => console.log(` ${i + 1}. ${s.title}`));

  await mongoose.disconnect();
  console.log('\nDone!');
}

run().catch(e => { console.error('Error:', e.message); process.exit(1); });
