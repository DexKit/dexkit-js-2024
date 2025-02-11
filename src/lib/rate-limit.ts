import { prisma } from './prisma';

interface RateLimitResponse {
  success: boolean;

  current: number;
  limit: number;
  remaining: number;
}

export async function rateLimit(ip: string, limit: number = 5, windowHrs: number = 1): Promise<RateLimitResponse> {
  const now = new Date();
  const windowMs = windowHrs * 60 * 60 * 1000;

  await prisma.rateLimit.deleteMany({
    where: {
      expiresAt: {
        lt: now
      }
    }
  });

  const rateLimit = await prisma.rateLimit.upsert({
    where: {
      ip,
    },
    update: {
      count: {
        increment: 1
      }
    },
    create: {
      ip,
      count: 1,
      expiresAt: new Date(now.getTime() + windowMs)
    }
  });

  return {
    success: rateLimit.count <= limit,
    current: rateLimit.count,
    limit,
    remaining: Math.max(0, limit - rateLimit.count)
  };
} 