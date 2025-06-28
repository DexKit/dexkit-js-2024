import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';
import { rateLimit } from '@/lib/rate-limit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  const isDev = process.env.NODE_ENV === 'development';
  const rateLimitResult = await rateLimit(
    ip, 
    isDev ? 50 : 5,
    isDev ? 10 : 30
  );
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests", messageId: "hireADev.form.rateLimit" },
      { status: 429 }
    );
  }
  
  try {
    const { 
      clientEmail, 
      product, 
      extraNotes, 
      cost, 
      paymentType, 
      locale, 
      turnstileToken,
      paymentTxId,
      paymentNetwork,
      paymentCoin 
    } = await request.json();
    
    let turnstileVerified = false;
    
    if (turnstileToken) {
      try {
        const decodedToken = atob(turnstileToken);
        const matches = decodedToken.match(/^(\d+)\+(\d+)=(\d+)$/);
        
        if (matches) {
          const num1 = parseInt(matches[1]);
          const num2 = parseInt(matches[2]);
          const result = parseInt(matches[3]);
          
          turnstileVerified = (num1 + num2 === result);
        }
      } catch (error) {
        console.error('Error verifying captcha token:', error);
      }
    }
    
    if (!turnstileVerified) {
      return NextResponse.json(
        { error: "Captcha verification failed", messageId: "hireADev.form.turnstileError" },
        { status: 400 }
      );
    }
    
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Email is required", messageId: "hireADev.form.emailRequired" },
        { status: 400 }
      );
    }
    
    const processedPaymentTxId = paymentTxId?.trim();
    
    const newService = await prisma.service.create({
      data: {
        clientEmail: encrypt(clientEmail),
        product: encrypt(product),
        extraNotes: encrypt(extraNotes || ''),
        cost: parseFloat(cost),
        paymentType: encrypt(paymentType),
        status: encrypt('pending'),
        ipAddress: encrypt(ip),
        locale: locale || 'en',
        paymentTxId: processedPaymentTxId ? encrypt(processedPaymentTxId) : null,
        paymentNetwork: paymentNetwork ? encrypt(paymentNetwork) : null,
        paymentCoin: paymentCoin ? encrypt(paymentCoin) : null
      }
    });

    try {
      const serviceNames: {[key: string]: string} = {
        singleDApp: "Single onchain app",
        intermediateDApp: "Intermediate onchain app",
        advancedDApp: "Advanced onchain app",
        blockchainConsulting: "Blockchain Consulting",
        completeProject: "Complete Project"
      };

      const serviceName = serviceNames[product] || product;

      await resend.emails.send({
        from: 'DexKit Support <no-reply@dexkit.com>',
        to: 'support@dexkit.com',
        subject: `New service request: ${serviceName}`,
        html: `
          <h1>New service request</h1>
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Client email:</strong> ${clientEmail}</p>
          <p><strong>Cost:</strong> ${cost} USD</p>
          <p><strong>Payment method:</strong> ${paymentCoin} on ${paymentNetwork} network</p>
          <p><strong>Transaction ID:</strong> ${paymentTxId || 'Not provided'}</p>
          <p><strong>Additional notes:</strong> ${extraNotes || 'None'}</p>
          <p><strong>Service ID:</strong> ${newService.id}</p>
          <p><strong>Request date:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Language:</strong> ${locale || 'en'}</p>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }
    
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