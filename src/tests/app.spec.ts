'use strict';

import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import supertest, { Test } from 'supertest';
import app from '../app';
import { fileNameSplitter, getThumbImageName } from '../helpers';

const request: supertest.SuperTest<supertest.Test> = supertest(app),
  testData: TestData = {
    invalid: {
      imgName: 'non-exists-img',
      width: -200,
      height: 'bar',
    },
    valid: {
      imgName: 'fjord.jpg',
      width: 200,
      height: 100,
      originalImgsDir: process.env.ORIGINAL_IMAGES_DIR as string,
      thumbImgsDir: process.env.THUMB_IMAGES_DIR as string,
      get originalImgPath() {
        return resolvePath(this.originalImgsDir, this.imgName);
      },
      calcThumbImgPath({ width, height }: { width?: true; height?: true }) {
        const splittingImgName: FileNameSplitter = fileNameSplitter(
          this.imgName
        );

        return resolvePath(
          this.thumbImgsDir,
          getThumbImageName({
            imgName: splittingImgName.basename,
            imgExt: splittingImgName.ext,
            width: width && this.width,
            height: height && this.height,
          })
        );
      },
    },
  };

describe(`App endpoints tests`, (): void => {
  describe(`Endpoint: '/'`, (): void => {
    it(`GET /`, async (): Promise<void> => {
      const response: supertest.Response = await request.get(`/`);

      expect(response.status).toBe(200);
    });
  });

  describe(`Endpoint: '/image'`, (): void => {
    (() => {
      let endpoint: string = `/image`;
      it(`GET ${endpoint} | (return 400 and message error if 'filename' query is missing )`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint);
        expect(response.status).toBe(400);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.invalid.imgName}`;
      it(`GET ${endpoint} | (return 404 and message error for a non-exists image)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint);
        expect(response.status).toBe(404);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.valid.imgName}`;
      it(`GET ${endpoint} | (Return 200 and original '${testData.valid.imgName}' image)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint),
          originalImage: string = readFileSync(
            testData.valid.originalImgPath
          ).toString('base64');

        expect(response.status).toBe(200);
        expect(response.body.toString('base64')).toBe(originalImage);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.valid.imgName}&width=${testData.valid.width}`;
      it(`GET ${endpoint}| (Return 200 and '${testData.valid.imgName}' image after resize width)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint),
          thumbImage: string = readFileSync(
            testData.valid.calcThumbImgPath({ width: true })
          ).toString('base64');

        expect(response.status).toBe(200);
        expect(response.body.toString('base64')).toBe(thumbImage);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.valid.imgName}&height=${testData.valid.height}`;
      it(`GET ${endpoint}| (Return 200 and '${testData.valid.imgName}' image after resize height)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint),
          thumbImage: string = readFileSync(
            testData.valid.calcThumbImgPath({ height: true })
          ).toString('base64');

        expect(response.status).toBe(200);
        expect(response.body.toString('base64')).toBe(thumbImage);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.valid.imgName}&width=${testData.valid.width}&height=${testData.valid.height}`;
      it(`GET ${endpoint} | (Return 200 and '${testData.valid.imgName}' image after resize width and height)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint),
          thumbImage: string = readFileSync(
            testData.valid.calcThumbImgPath({ width: true, height: true })
          ).toString('base64');

        expect(response.status).toBe(200);
        expect(response.body.toString('base64')).toBe(thumbImage);
      });
    })();

    (() => {
      let endpoint: string = `/image?filename=${testData.valid.imgName}&width=${testData.invalid.width}&height=${testData.invalid.height}`;
      it(`GET ${endpoint} | (Return 200 and original '${testData.valid.imgName}' image if height and width are invalid)`, async (): Promise<void> => {
        const response: supertest.Response = await request.get(endpoint),
          originalImage: string = readFileSync(
            testData.valid.originalImgPath
          ).toString('base64');

        expect(response.status).toBe(200);
        expect(response.body.toString('base64')).toBe(originalImage);
      });
    })();
  });

  describe(`endpoint: /foo`, (): void => {
    it(`returns 404 for invalid endpoint`, async (): Promise<void> => {
      const response: supertest.Response = await request.get(`/foo`);

      expect(response.status).toBe(404);
    });
  });
});
