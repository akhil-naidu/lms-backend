import 'dotenv/config';
import express from 'express';

export const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.js';

app.use(
  express.json({
    limit: '50mb',
  }),
);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

app.get('/test', (req, res, next) => {
  res.status(200).send({
    succuss: 'true',
  });
});

app.all('*', (req, res, next) => {
  /** @type {*} */
  const error = new Error(`Router ${req.originalUrl} not found`);
  error.statusCode = 400;
  next(error);
});

app.use(errorMiddleware);
