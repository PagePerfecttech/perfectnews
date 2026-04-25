import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

if (!redisClient.isOpen) {
  redisClient.connect();
}

/**
 * Caches data with a TTL (Time-To-Live)
 */
export async function setCache(key: string, value: unknown, ttlSeconds: number = 60) {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  } catch (error) {
    console.error("Redis Cache Set Error:", error);
  }
}

/**
 * Retrieves data from cache
 */
export async function getCache(key: string) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis Cache Get Error:", error);
    return null;
  }
}

export { redisClient };
