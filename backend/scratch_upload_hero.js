const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const INPUT_DIR = 'C:\\Users\\madte\\Downloads\\hero banner';

const getR2Client = () =>
  new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

const optimizeImage = async (buffer) => {
  return sharp(buffer)
    .resize({ width: 2400, withoutEnlargement: true }) // cap at 2400px
    .webp({ quality: 85 })                             // convert to webp
    .withMetadata(false)                               // strip EXIF
    .toBuffer();
};

const uploadToR2 = async (buffer, filename) => {
  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `hero-banner/${filename}`,
      Body: buffer,
      ContentType: 'image/webp',
    })
  );

  return `${process.env.R2_PUBLIC_URL}/hero-banner/${filename}`;
};

async function run() {
  console.log('Starting optimization and upload for hero banner images...');
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Input directory does not exist: ${INPUT_DIR}`);
    return;
  }

  const files = fs.readdirSync(INPUT_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.webp';
  });

  console.log(`Found ${files.length} images to process.`);

  const urls = [];

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    console.log(`Processing: ${file}...`);
    try {
      const buffer = fs.readFileSync(filePath);
      const optimized = await optimizeImage(buffer);
      
      // Use clean filename based on original name but webp
      const cleanName = path.parse(file).name.replace(/[^a-zA-Z0-9]/g, '_') + '.webp';
      const url = await uploadToR2(optimized, cleanName);
      
      console.log(`Uploaded! URL: ${url}`);
      urls.push(url);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }

  console.log('\nAll done! Here are the uploaded WebP URLs:');
  console.log(JSON.stringify(urls, null, 2));
  
  fs.writeFileSync(path.join(__dirname, 'uploaded_hero_urls.json'), JSON.stringify(urls, null, 2));
  console.log('URLs saved to backend/uploaded_hero_urls.json');
}

run().catch(console.error);
