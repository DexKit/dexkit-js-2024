import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const ip = headers().get('x-forwarded-for') || 'anonymous';
    
    const limiter = await rateLimit(ip);
    if (!limiter.success) {
      return NextResponse.json(
        { 
          error: 'TOO_MANY_REQUESTS',
          messageId: 'newsletter.error.rateLimit'
        },
        { status: 429 }
      );
    }

    const { email, locale } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });
    }

    const existingSubscriber = await prisma.newsletter.findFirst({
      where: { email: await encrypt(email) }
    });

    if (existingSubscriber) {
      return NextResponse.json({ 
        error: 'DUPLICATE_EMAIL',
        messageId: 'newsletter.error.duplicate'
      }, { status: 400 });
    }

    await prisma.newsletter.create({
      data: {
        email: await encrypt(email),
        locale: locale || 'en',
        status: 'ACTIVE',
        subscriptionDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
} 