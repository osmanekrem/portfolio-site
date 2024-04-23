import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://us1-settling-bullfrog-42688.upstash.io',
  token: process.env.REDIS_KEY!,
})