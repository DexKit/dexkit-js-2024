import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { decrypt } from '@/lib/encryption';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';



interface Subscriber {
  id: string;
  email: string;
  locale: string;
  subscriptionDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'ACTIVE';

    const subscribers = await prisma.newsletter.findMany({
      where: { status },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const decryptedSubscribers = await Promise.all(
      subscribers.map(async (sub: Subscriber) => {
        try {
          return {
            ...sub,
            email: await decrypt(sub.email),
          };
        } catch (error) {
          console.error('Error decrypting email:', error);
          return {
            ...sub,
            email: 'Error decrypting email',
          };
        }
      })
    );

    const total = await prisma.newsletter.count({
      where: { status },
    });

    return NextResponse.json({
      subscribers: decryptedSubscribers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
} 