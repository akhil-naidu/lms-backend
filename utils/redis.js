// ^ 07 At this stage we will not connect it to the redis dB
import 'dotenv/config';
import Redis from 'ioredis';

const redisURL = process.env.REDIS_URL;

const redis = () => {
  redisURL && new Redis(redisURL);
  throw new Error('Redis Connection Failed');
};

export default redis;
