'use strict';

import { resolve as resolvePath } from 'path';
import { NextFunction, Request, Response } from 'express';
import {
  fileNameSplitter,
  checkFileExists,
  getThumbImageName,
  resizeImage,
} from '../helpers';

const originalImgsDir: string = process.env.ORIGINAL_IMAGES_DIR as string,
  thumbImgsDir: string = process.env.THUMB_IMAGES_DIR as string;

export default {
  getImage: [
    async function initializeRequestData(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void | Response> {
      const { filename, width, height } = req.query;

      // check filename query.
      if (!filename)
        return res.status(400).send("You should define 'filename' query");

      // get a numeric width value.
      const widthNum: number = width ? parseInt(width as string) : NaN,
        // get a numeric height value.
        heightNum: number = height ? parseInt(height as string) : NaN,
        // get the original image path by its name and the original images directory.
        originalImgPath: string = resolvePath(
          originalImgsDir,
          filename as string
        );

      // set initialized data in "res.locals".
      res.locals.filename = filename;
      res.locals.originalImgPath = originalImgPath;
      res.locals.originalImgIsExists = await checkFileExists(originalImgPath);
      if (widthNum > 0) res.locals.width = widthNum;
      if (heightNum > 0) res.locals.height = heightNum;
      res.locals.getOriginalImg = !(res.locals.width || res.locals.height);

      next();
    },

    function serveOriginalImg(
      _req: Request,
      res: Response,
      next: NextFunction
    ): void | Response {
      const { getOriginalImg, originalImgPath, originalImgIsExists } =
        res.locals;

      // try to serve the original image if it is required.
      if (getOriginalImg)
        if (!originalImgIsExists)
          return res.status(404).send('Image not found');
        else return res.sendFile(originalImgPath);

      next();
    },

    async function serveCachedThumbImg(
      _req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void | Response> {
      const { filename, width, height } = res.locals,
        // split image name.
        splittingImgName: FileNameSplitter = fileNameSplitter(filename),
        // get thumb image name.
        thumbImgName: string = getThumbImageName({
          imgName: splittingImgName.basename,
          imgExt: splittingImgName.ext,
          width,
          height,
        }),
        // get thumb image path.
        thumbImgPath: string = resolvePath(thumbImgsDir, thumbImgName),
        thumbImgIsExists = await checkFileExists(thumbImgPath);

      // try to serve the original image if it is exists.
      if (thumbImgIsExists) return res.sendFile(thumbImgPath);

      // set thumb image data to "res.locals"
      res.locals.splittingImgName = splittingImgName;
      res.locals.thumbImgName = thumbImgName;
      res.locals.thumbImgPath = thumbImgPath;
      next();
    },

    async function resizeAndServeNewThumbImg(
      _req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void | Response> {
      try {
        const {
          width,
          height,
          thumbImgPath,
          originalImgPath,
          originalImgIsExists,
        } = res.locals;

        // check if the original image is exists.
        if (!originalImgIsExists)
          return res.status(404).send('Image not found');

        // resize image and save it in thumb dir.
        await resizeImage({
          width,
          height,
          inputPath: originalImgPath,
          outputPath: thumbImgPath,
        });

        // serve resized image.
        return res.sendFile(thumbImgPath);
      } catch (e) {
        next(e);
      }
    },
  ],
};
