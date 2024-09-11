// NOT IMPLEMENTED YET
// This file is for future use with a Firestore database
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Mail is required' }, { status: 400 });
    }

    const subscribersRef = db.collection('subscribers');
    const result = await subscribersRef.add({
      email,
      subscribeDate: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (result.id) {
      return NextResponse.json({ message: 'Success!' }, { status: 200 });
    } else {
      throw new Error('Could not save the subscriber');
    }
  } catch (error) {
    console.error('Error processing the subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}