import { prisma } from './prisma';

interface RateLimitResponse {
  success: boolean;

  current: number;
  limit: number;
  remaining: number;
}

export async function rateLimit(ip: string, limit: number = 10, windowMin: number = 5): Promise<RateLimitResponse> {
  const now = new Date();
  const windowMs = windowMin * 60 * 1000;

  return await prisma.$transaction(async (tx) => {
    await tx.rateLimit.deleteMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });

    const currentLimit = await tx.rateLimit.findUnique({
      where: { ip }
    });

    if (!currentLimit) {
      await tx.rateLimit.create({
        data: {
          ip,
          count: 1,
          expiresAt: new Date(now.getTime() + windowMs)
        }
      });
      return {
        success: true,
        current: 1,
        limit,
        remaining: limit - 1
      };
    }

    if (currentLimit.count >= limit) {
      return {
        success: false,
        current: currentLimit.count,
        limit,
        remaining: 0
      };
    }

    const updated = await tx.rateLimit.update({
      where: { ip },
      data: {
        count: {
          increment: 1
        }
      }
    });

    return {
      success: updated.count <= limit,
      current: updated.count,
      limit,
      remaining: Math.max(0, limit - updated.count)
    };
  });
} 