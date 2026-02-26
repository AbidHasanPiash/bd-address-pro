/**
 * Copy data files to dist folder for npm publishing
 */
import { mkdir, copyFile } from 'fs/promises';
import { join } from 'path';

const srcDir = join(import.meta.dir, '..', 'src', 'data');
const distDir = join(import.meta.dir, '..', 'dist', 'data');

const files = ['divisions.json', 'districts.json', 'upazilas.json'];

async function copyData() {
  // Create dist/data directory
  await mkdir(distDir, { recursive: true });

  // Copy each data file
  for (const file of files) {
    const src = join(srcDir, file);
    const dest = join(distDir, file);
    await copyFile(src, dest);
    console.log(`Copied ${file} to dist/data/`);
  }

  console.log('✓ Data files copied successfully');
}

copyData().catch(console.error);
