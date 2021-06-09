import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_ADDRESS);

export { redis };
