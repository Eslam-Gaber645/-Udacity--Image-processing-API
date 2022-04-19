'use strict';

import { access, unlink } from 'fs/promises';
import { resolve as resolvePath } from 'path';
import { fileNameSplitter, getThumbImageName, resizeImage } from '../helpers';

const originalImgsDir: string = process.env.ORIGINAL_IMAGES_DIR as string,
  thumbImgsDir: string = process.env.THUMB_IMAGES_DIR as string,
  originalTestImage: string = 'fjord.jpg',
  originalTestImagePath = resolvePath(originalImgsDir, originalTestImage),
  outputTestImagePath = resolvePath(
    thumbImgsDir,
    `resized_${originalTestImage}`
  );

describe(`App 'helper functions' tests`, (): void => {
  describe('Function: fileNameSplitter', (): void => {
    it(`Takes a filename to return an object with the base name and extension`, (): void => {
      const result: SplittingFileName = fileNameSplitter('testName.jpg');

      expect(result).toEqual({
        basename: 'testName',
        ext: '.jpg',
      });
    });
  });

  describe('Function: fileNameSplitter', (): void => {
    it(`Takes a resize image options to return new thumb name based-on this options`, (): void => {
      const result: string = getThumbImageName({
        imgName: 'testName',
        imgExt: '.jpg',
        width: 200,
        height: 100,
      });

      expect(result).toBe('testName_width-200_height-100.jpg');
    });
  });

  describe('Function: resizeImage', (): void => {
    it(`Takes options as arguments to resize specific image`, async (): Promise<void> => {
      await expectAsync(
        resizeImage({
          inputPath: originalTestImagePath,
          outputPath: outputTestImagePath,
          width: 200,
          height: 100,
        })
      ).toBeResolved();
      await expectAsync(access(outputTestImagePath)).toBeResolved();
      await expectAsync(unlink(outputTestImagePath)).toBeResolved();
    });
  });
});
