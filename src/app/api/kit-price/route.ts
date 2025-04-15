import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dexkit&vs_currencies=usd', {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error('Error on Kit Price API');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error on Kit Price API:', error);
    return NextResponse.json({ dexkit: { usd: 0.05 } });
  }
} 