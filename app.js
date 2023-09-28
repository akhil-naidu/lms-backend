import 'dotenv/config';
import express from 'express';

// ^ 01
export const app = express();

// ^ 03
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
