import Redis from 'ioredis';
const redis = new Redis('127.0.0.1:6379');

export { redis };
