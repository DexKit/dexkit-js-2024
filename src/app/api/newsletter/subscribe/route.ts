import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/encryption';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { Prisma } from '@prisma/client';

const isDev = process.env.NODE_ENV === 'development';

export async function POST(request: Request) {
  try {
    const ip = headers().get('x-forwarded-for') || 'anonymous';
    
    const limiter = await rateLimit(
      ip, 
      isDev ? 30 : 10, 
      isDev ? 2 : 5
    );

    if (!limiter.success) {
      return NextResponse.json(
        { 
          error: 'TOO_MANY_REQUESTS',
          messageId: 'newsletter.error.rateLimit'
        },
        { status: 429, headers: {
          'Retry-After': isDev ? '120' : '300',
          'X-RateLimit-Limit': limiter.limit.toString(),
          'X-RateLimit-Remaining': limiter.remaining.toString(),
          'X-RateLimit-Reset': new Date(Date.now() + (isDev ? 120000 : 300000)).toISOString()
        }}
      );
    }

    const { email, locale } = await request.json();

    if (!email) {
      return NextResponse.json({ 
        error: 'EMAIL_REQUIRED',
        messageId: 'newsletter.error.required'
      }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    const allSubscribers = await prisma.newsletter.findMany({
      where: {
        OR: [
          { status: 'ACTIVE' },
          { status: 'INACTIVE' }
        ]
      },
      select: { email: true }
    });

    for (const subscriber of allSubscribers) {
      try {
        const decryptedEmail = await decrypt(subscriber.email);
        if (decryptedEmail.toLowerCase().trim() === normalizedEmail) {
          return NextResponse.json({ 
            error: 'DUPLICATE_EMAIL',
            messageId: 'newsletter.error.duplicate'
          }, { status: 400 });
        }
      } catch (error) {
        console.error('Error decrypting email during duplicate check:', error);
      }
    }

    const encryptedEmail = await encrypt(normalizedEmail);

    return await prisma.$transaction(async (tx) => {
      try {
        await tx.newsletter.create({
          data: {
            email: encryptedEmail,
            locale: locale || 'en',
            status: 'ACTIVE',
            subscriptionDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        });

        return NextResponse.json({ 
          success: true,
          messageId: 'newsletter.success',
          remaining: limiter.remaining
        }, { 
          status: 201,
          headers: {
            'X-RateLimit-Remaining': limiter.remaining.toString()
          }
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          return NextResponse.json({ 
            error: 'DUPLICATE_EMAIL',
            messageId: 'newsletter.error.duplicate'
          }, { status: 400 });
        }
        throw error;
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        error: 'INTERNAL_SERVER_ERROR',
        messageId: 'newsletter.error.internal'
      },
      { status: 500 }
    );
  }
} 