'use strict';
import express, { Application } from 'express';
import dotenv from 'dotenv';
// config environment variables.
dotenv.config();

import setupRoutes from './routes';

const app: Application = express(),
  port: number = parseInt(process.env.PORT as string) | 3000;

// setup app routes.
setupRoutes(app);

// start server listening.
app.listen(port, () => {
  console.log(`Server listening on: ${port}!`);
});

export default app;
