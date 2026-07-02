#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts large PNG event images to WebP format with multiple responsive sizes
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');
const IMAGES_DIR = join(PROJECT_ROOT, 'public/images/events');
const OUTPUT_DIR = IMAGES_DIR; // Output to same directory

// Responsive sizes for event images
const SIZES = [
  { suffix: '-mobile', width: 640, quality: 80 },
  { suffix: '-tablet', width: 1024, quality: 85 },
  { suffix: '', width: 1920, quality: 85 } // Original size, no suffix
];

// Target files (large PNG images)
const TARGET_FILES = [
  'from-code-to-career.png',
  'intoduction_to_mobile_dev.png'
];

async function optimizeImage(inputPath, filename) {
  console.log(`\n📸 Processing: ${filename}`);

  const nameWithoutExt = basename(filename, extname(filename));
  const metadata = await sharp(inputPath).metadata();

  console.log(`   Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

  for (const size of SIZES) {
    const outputFilename = `${nameWithoutExt}${size.suffix}.webp`;
    const outputPath = join(OUTPUT_DIR, outputFilename);

    try {
      const info = await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: size.quality })
        .toFile(outputPath);

      const originalSize = await stat(inputPath).then(s => s.size);
      const savings = ((1 - info.size / originalSize) * 100).toFixed(1);

      console.log(`   ✅ ${outputFilename}: ${size.width}w, ${(info.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
    } catch (error) {
      console.error(`   ❌ Failed to create ${outputFilename}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Input directory: ${IMAGES_DIR}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let hasErrors = false;

  for (const filename of TARGET_FILES) {
    const inputPath = join(IMAGES_DIR, filename);

    try {
      const stats = await stat(inputPath);
      totalOriginalSize += stats.size;

      await optimizeImage(inputPath, filename);

      // Calculate optimized size (main image only)
      const webpPath = join(OUTPUT_DIR, `${basename(filename, extname(filename))}.webp`);
      const webpStats = await stat(webpPath);
      totalOptimizedSize += webpStats.size;

    } catch (error) {
      console.error(`\n❌ Error processing ${filename}:`, error.message);
      hasErrors = true;
    }
  }

  const savings =
    totalOriginalSize > 0
      ? ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)
      : "0.0";

  console.log('\n' + '='.repeat(60));
  console.log(hasErrors ? '⚠️ Optimization completed with errors.\n' : '✨ Optimization complete!\n');
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💰 Total savings: ${savings}%`);
  console.log('\n📝 Next steps:');
  console.log('   1. Update MDX frontmatter to use .webp images');
  console.log('   2. Test image display in both locales');
  console.log('   3. Consider removing original .png files after verification');
  console.log('='.repeat(60) + '\n');

  if (hasErrors) {
    process.exitCode = 1;
  }
}

main().catch(console.error);
