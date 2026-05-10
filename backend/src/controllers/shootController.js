const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Shoot = require('../models/Shoot');

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// Helper to determine if R2 is configured
const isR2Configured = () => {
  return !!(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    process.env.R2_PUBLIC_URL
  );
};

// Get Cloudflare R2 S3 Client
const getR2Client = () =>
  new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

// Optimize image to next-gen .webp format
const optimizeImage = async (buffer) => {
  return sharp(buffer)
    .resize({ width: 2400, withoutEnlargement: true }) // cap at 2400px width
    .webp({ quality: 85 })                             // webp high-performance compression
    .withMetadata(false)                               // strip metadata
    .toBuffer();
};

// Handle generic upload (R2 or Local Folder fallback)
const processAndStoreImage = async (buffer, filename, req) => {
  const optimized = await optimizeImage(buffer);

  if (isR2Configured()) {
    // Cloudflare R2 Upload
    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
        Body: optimized,
        ContentType: 'image/webp',
      })
    );
    return `${process.env.R2_PUBLIC_URL}/${filename}`;
  } else {
    // Local Folder Fallback
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, optimized);

    // Build local server URL
    const protocol = req.secure ? 'https' : 'http';
    const host = req.get('host');
    return `${protocol}://${host}/uploads/${filename}`;
  }
};

// Helper to delete an image file (R2 or Local)
const deleteStoredImage = async (url) => {
  if (!url) return;

  if (isR2Configured() && url.includes(process.env.R2_PUBLIC_URL)) {
    try {
      const filename = url.replace(`${process.env.R2_PUBLIC_URL}/`, '');
      const client = getR2Client();
      await client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: filename,
        })
      );
    } catch (err) {
      console.error(`Failed to delete ${url} from R2:`, err.message);
    }
  } else if (url.includes('/uploads/')) {
    try {
      const filename = url.substring(url.lastIndexOf('/') + 1);
      const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(`Failed to delete local file ${url}:`, err.message);
    }
  }
};

// 1. GET ALL SHOOTS
const getAllShoots = async (req, res, next) => {
  try {
    const shoots = await Shoot.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: shoots.length, data: shoots });
  } catch (err) {
    next(err);
  }
};

// 2. GET SINGLE SHOOT BY ID OR SLUG
const getShootByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let shoot = await Shoot.findOne({ slug: idOrSlug });

    if (!shoot && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      shoot = await Shoot.findById(idOrSlug);
    }

    if (!shoot) {
      return res.status(404).json({ success: false, message: 'Shoot not found' });
    }

    return res.json({ success: true, data: shoot });
  } catch (err) {
    next(err);
  }
};

// 3. CREATE SHOOT
const createShoot = async (req, res, next) => {
  try {
    const { title, category, location, date, desc } = req.body;

    if (!title || !category || !location || !date || !desc) {
      return res.status(400).json({ success: false, message: 'Please provide all required text fields.' });
    }

    if (!req.files || !req.files['heroImage'] || req.files['heroImage'].length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload a Hero Cover Image.' });
    }

    // Generate unique slug
    const slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -

    // Check if slug is already used
    const existingShoot = await Shoot.findOne({ slug });
    if (existingShoot) {
      return res.status(400).json({ success: false, message: 'A shoot with this title or similar slug already exists.' });
    }

    // Process Hero Image
    const heroFile = req.files['heroImage'][0];
    const heroFilename = `${uuidv4()}.webp`;
    const heroImageUrl = await processAndStoreImage(heroFile.buffer, heroFilename, req);

    // Process Gallery Images
    const galleryUrls = [];
    if (req.files['gallery'] && req.files['gallery'].length > 0) {
      const galleryUploadPromises = req.files['gallery'].map(async (file) => {
        const fileFilename = `${uuidv4()}.webp`;
        const fileUrl = await processAndStoreImage(file.buffer, fileFilename, req);
        return fileUrl;
      });
      const resolvedUrls = await Promise.all(galleryUploadPromises);
      galleryUrls.push(...resolvedUrls);
    }

    // Save Shoot to DB
    const shoot = await Shoot.create({
      title,
      slug,
      category,
      location,
      date,
      desc,
      heroImage: heroImageUrl,
      gallery: galleryUrls,
    });

    return res.status(201).json({ success: true, data: shoot });
  } catch (err) {
    next(err);
  }
};

// 4. DELETE SHOOT
const deleteShoot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shoot = await Shoot.findById(id);

    if (!shoot) {
      return res.status(404).json({ success: false, message: 'Shoot not found' });
    }

    // Delete Hero image
    await deleteStoredImage(shoot.heroImage);

    // Delete all gallery images
    if (shoot.gallery && shoot.gallery.length > 0) {
      const deletePromises = shoot.gallery.map(async (url) => {
        await deleteStoredImage(url);
      });
      await Promise.all(deletePromises);
    }

    // Delete shoot from DB
    await Shoot.findByIdAndDelete(id);

    return res.json({ success: true, message: 'Shoot and associated images deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllShoots,
  getShootByIdOrSlug,
  createShoot,
  deleteShoot,
};
