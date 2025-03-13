import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  const isDev = process.env.NODE_ENV === 'development';
  const rateLimitResult = await rateLimit(
    ip, 
    isDev ? 50 : 5,
    isDev ? 10 : 30
  );
  
  if (!rateLimitResult.success) {
    console.log(`Rate limit exceeded for IP: ${ip}. Attempts: ${rateLimitResult.current}`);
    return NextResponse.json(
      { error: "Too many requests", messageId: "hireADev.form.rateLimit" },
      { status: 429 }
    );
  }
  
  try {
    const { clientEmail, product, extraNotes, cost, paymentType, locale, turnstileToken, paymentTxId } = await request.json();
    
    console.log('Processing request with data:', { 
      email: clientEmail.substring(0, 3) + '...',
      product, 
      cost,
      paymentTxId: paymentTxId ? `Provided: "${paymentTxId}" (length: ${paymentTxId.length})` : 'Not provided'
    });
    
    let turnstileVerified = false;
    
    if (process.env.NODE_ENV === 'development') {
      turnstileVerified = true;
    } else {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: ip,
          }),
        }
      );
      
      const turnstileResult = await turnstileResponse.json();
      
      if (!turnstileResult.success) {
        console.error('Error verifying turnstile:', turnstileResult);
        return NextResponse.json(
          { error: "Turnstile verification failed", messageId: "hireADev.form.turnstileError" },
          { status: 400 }
        );
      }
      
      turnstileVerified = true;
    }
    
    if (!turnstileVerified) {
      return NextResponse.json(
        { error: "Turnstile verification failed", messageId: "hireADev.form.turnstileError" },
        { status: 400 }
      );
    }
    
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Email is required", messageId: "hireADev.form.emailRequired" },
        { status: 400 }
      );
    }
    
    console.log('Try to save in database with paymentTxId:', paymentTxId ? 'Yes (length: ' + paymentTxId.length + ')' : 'No');
    
    const processedPaymentTxId = paymentTxId?.trim();
    console.log('Valor final de paymentTxId a guardar:', processedPaymentTxId || 'NULL');
    
    const newService = await prisma.service.create({
      data: {
        clientEmail: encrypt(clientEmail),
        product,
        extraNotes: extraNotes || '',
        cost,
        paymentType,
        status: 'pending',
        ipAddress: encrypt(ip),
        locale: locale || 'en',
        paymentTxId: processedPaymentTxId || null
      }
    });
    
    console.log('Service saved with ID:', newService.id, 'PaymentTxId en respuesta:', newService.paymentTxId);
    
    return NextResponse.json({ 
      success: true, 
      message: "Service request saved successfully",
      serviceId: newService.id 
    });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: String(error), messageId: "hireADev.form.error" },
      { status: 500 }
    );
  }
} 