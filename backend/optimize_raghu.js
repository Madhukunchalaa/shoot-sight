const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '..', '4 RAGHUDIXITH AND VARIJASHREE');
const outputDir = path.join(__dirname, '..', '4 RAGHUDIXITH AND VARIJASHREE_WEBP');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(sourceDir, async (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const imageFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));
  console.log(`Found ${imageFiles.length} images to convert to WebP...`);

  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const parsed = path.parse(file);
    const outputPath = path.join(outputDir, `${parsed.name}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      console.log(`✅ Optimized: ${file} -> ${parsed.name}.webp`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  console.log("🎉 All Raghu Dixit & Varijashree images successfully converted and optimized to WebP format!");
});
