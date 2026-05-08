import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.resolve('../images');
const destDir = path.resolve('src/assets');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

async function optimizeImages() {
  try {
    const files = fs.readdirSync(sourceDir);
    console.log(`Found ${files.length} items in images directory.`);
    
    let processedCount = 0;

    for (const file of files) {
      const ext = path.extname(file);
      if (!supportedExtensions.includes(ext)) {
        continue;
      }

      const baseName = path.basename(file, ext);
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(destDir, `${baseName}.webp`);

      const stats = fs.statSync(inputPath);
      const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`\nOptimizing: ${file} (${originalSizeMB} MB)`);

      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let pipeline = image;

      // Downscale if image is extremely wide to save massive GPU VRAM texture decode overhead
      if (metadata.width > 1920) {
        console.log(`-> Resizing from ${metadata.width}px wide to 1920px wide...`);
        pipeline = pipeline.resize({ width: 1920 });
      } else {
        console.log(`-> Keeping original width of ${metadata.width}px...`);
      }

      // Convert to high-quality WebP
      await pipeline
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);

      const outStats = fs.statSync(outputPath);
      const optimizedSizeKB = (outStats.size / 1024).toFixed(1);
      const optimizedSizeMB = (outStats.size / (1024 * 1024)).toFixed(2);

      console.log(`✓ Completed: ${baseName}.webp (${optimizedSizeMB} MB / ${optimizedSizeKB} KB)`);
      processedCount++;
    }

    console.log(`\n🎉 Success! Successfully optimized and converted ${processedCount} images directly to Assets folder!`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

optimizeImages();
