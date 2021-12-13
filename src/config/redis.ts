import { createClient } from 'redis';
export const redisClient = createClient({
  url: process.env.REDIS_HOST,
});
export const connectRedis = async () => {
  await redisClient.connect();
};
