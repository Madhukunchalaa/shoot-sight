/**
 * CLOUDFLARE IMAGE OPTIMIZER
 * =============================
 * This script downloads your images from Cloudflare R2,
 * optimizes them to web-friendly WebP format, and saves
 * them locally so you can re-upload the smaller versions.
 *
 * HOW TO USE:
 *   node optimize_cloudflare.js
 *
 * OUTPUT FOLDER: ./optimized-output/<folder-name>/
 * Then upload the files in that folder to Cloudflare, replacing the originals.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const BASE_URL = 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev';

// =============================================
// DEFINE YOUR CLIENT FOLDERS & IMAGES HERE
// =============================================
const clients = [
  {
    folder: 'pavithra and arun',
    images: [
      'C9148.00_38_05_49.Still104.webp',
      'C9148.00_45_35_36.Still115.webp',
      'C9148.00_47_29_38.Still120.webp',
      'C9148.00_48_55_15.Still123.webp',
      'C9148.00_49_43_35.Still127.webp',
      'C9148.00_56_48_24.Still142.webp',
      'C9148.01_15_05_35.Still161.webp',
      'DSC00437.webp',
      'DSC00441.webp',
      'DSC00541.webp',
      'DSC00571.webp',
    ]
  },
  {
    folder: 'aishwarya and akshay',
    images: [
      'KRP_6193.webp',
      'KRP_6202.webp',
      'KRP_6209.jpg',
      'KRP_7208.webp',
      'KRP_7791.webp',
      'KRP_7858.jpg',
      'KRP_7896.webp',
      'KRP_8213.webp',
      'KRP_8887.webp',
      'KRP_9045.webp',
      'KRP_9106.webp',
      '_DSC7299.webp',
      '_DSC7806.webp',
      '_DSC8119.webp',
    ]
  },
  {
    folder: 'ragini',
    images: [
      '_I3A6369.webp',
      '_I3A6392.webp',
      '_I3A6398.webp',
      '_I3A6607.webp',
      '_I3A6939.webp',
      '_I3A6987.webp',
      '_I3A7057.webp',
      '_I3A7175.webp',
      '_I3A7398.webp',
      '_I3A7446.webp',
      '_I3A7475.webp',
    ]
  }
];

// =============================================
// OPTIMIZATION SETTINGS
// =============================================
const MAX_WIDTH = 2000;       // Max width in pixels (2000 is great for full-screen gallery)
const WEBP_QUALITY = 82;      // Quality 0-100 (82 is a great balance of quality vs file size)
const OUTPUT_BASE = path.join(__dirname, 'optimized-output');

// =============================================
// HELPER: Download a file from URL to buffer
// =============================================
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// =============================================
// MAIN PROCESS
// =============================================
async function run() {
  console.log('\n🚀 Cloudflare Image Optimizer Starting...\n');

  if (!fs.existsSync(OUTPUT_BASE)) {
    fs.mkdirSync(OUTPUT_BASE, { recursive: true });
  }

  let totalSaved = 0;
  let totalOriginal = 0;

  for (const client of clients) {
    const encodedFolder = encodeURIComponent(client.folder);
    const outputDir = path.join(OUTPUT_BASE, client.folder);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`📁 Processing: ${client.folder} (${client.images.length} images)`);

    for (const image of client.images) {
      const url = `${BASE_URL}/${encodedFolder}/${encodeURIComponent(image)}`;
      const baseName = path.parse(image).name;
      const outputPath = path.join(outputDir, `${baseName}.webp`);

      try {
        process.stdout.write(`   ⬇  Downloading ${image}...`);
        const buffer = await downloadBuffer(url);
        const originalKB = Math.round(buffer.length / 1024);
        totalOriginal += buffer.length;

        const optimized = await sharp(buffer)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .withMetadata(false)
          .toBuffer();

        const optimizedKB = Math.round(optimized.length / 1024);
        totalSaved += (buffer.length - optimized.length);

        fs.writeFileSync(outputPath, optimized);

        const savings = Math.round((1 - optimized.length / buffer.length) * 100);
        console.log(` ✅ ${originalKB}KB → ${optimizedKB}KB (${savings}% smaller)`);

      } catch (err) {
        console.log(` ❌ FAILED: ${err.message}`);
      }
    }
    console.log('');
  }

  const totalSavedMB = (totalSaved / 1024 / 1024).toFixed(1);
  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(1);
  console.log(`\n🎉 Done! Total space saved: ${totalSavedMB}MB (from ${totalOriginalMB}MB)`);
  console.log(`\n📂 Optimized files are saved in: ${OUTPUT_BASE}`);
  console.log('👉 Upload these files to Cloudflare R2 to replace the originals.\n');
}

run().catch(console.error);
