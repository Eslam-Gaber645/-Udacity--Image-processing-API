'use strict';
import { Application } from 'express';
import imageRouter from './image';
import rootRouter from './root';

export default function setupRoutes(app: Application): Application {
  // setup image routes.
  app.use('/image', imageRouter);
  // setup root routes.
  app.use('/', rootRouter);

  return app;
}
