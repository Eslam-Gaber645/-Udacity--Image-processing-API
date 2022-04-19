'use strict';

import { fileNameSplitter, getThumbImageName } from '../helpers';

describe(`App 'helper functions' tests`, (): void => {
  describe('Function: fileNameSplitter', (): void => {
    it(`Takes a filename to return an object with the base name and extension`, (): void => {
      const result: FileNameSplitter = fileNameSplitter('testName.jpg');

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
});
