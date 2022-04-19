'use strict';

import { mkdir } from 'fs/promises';
import { parse as parsePath } from 'path';
import sharp from 'sharp';
import checkFileExists from './checkFileExists';

export default async function resizeImage({
  width,
  height,
  inputPath,
  outputPath,
}: ResizeImageOptions): Promise<void> {
  const outputDir = parsePath(outputPath).dir,
    outputDirIsExists = await checkFileExists(outputDir);

  if (!outputDirIsExists) await mkdir(outputDir, { recursive: true });

  await sharp(inputPath).resize({ width, height }).toFile(outputPath);
}
