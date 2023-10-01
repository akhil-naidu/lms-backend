import 'dotenv/config';
import Redis from 'ioredis';

/** @type {string} Enter your Redis URL*/
const redisURL = process.env.REDIS_URL;

const redis = () => {
  redisURL && new Redis(redisURL);
  throw new Error('Redis Connection Failed');
};

export default redis;
