import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, email, gameTitle, productItem } = body;
    const secretKey = process.env.XENDIT_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({ error: 'Server Config Error' }, { status: 500 });
    }

    // 🔥 LOGIKA BARU: Tentukan Base URL
    // Jika sedang di Production (Vercel), pakai link Vercel.
    // Jika sedang di Laptop (Development), pakai Localhost.
    
    // ⚠️ GANTI STRING DI BAWAH INI DENGAN LINK VERCEL KAMU YANG ASLI!
    // Contoh: https://freezly-store.vercel.app
    const productionUrl = 'https://freezly-store-pro.vercel.app'; 
    
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? productionUrl 
      : 'https://freezly-store-pro.vercel.app';

    const xenditData = {
      external_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      amount: amount,
      payer_email: email || 'user@example.com',
      description: `Top Up ${gameTitle} - ${productItem}`,
      invoice_duration: 172800,
      currency: 'IDR',
      // 👇 Sekarang URL redirect sudah dinamis!
      success_redirect_url: `${baseUrl}/success`, 
      failure_redirect_url: `${baseUrl}`,
    };

    const authString = Buffer.from(secretKey + ':').toString('base64');

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(xenditData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("❌ Xendit Error:", responseData);
      return NextResponse.json({ error: 'Gagal membuat invoice', details: responseData }, { status: 500 });
    }

    return NextResponse.json({ invoiceUrl: responseData.invoice_url });

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}