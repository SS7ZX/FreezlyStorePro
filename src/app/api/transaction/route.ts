import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, email, gameTitle, productItem } = body;
    const secretKey = process.env.XENDIT_SECRET_KEY;

    // 1. Cek API Key
    if (!secretKey) {
      console.error("❌ XENDIT_SECRET_KEY tidak ditemukan di .env.local");
      return NextResponse.json({ error: 'Server Config Error' }, { status: 500 });
    }

    // 2. Siapkan Data Invoice Xendit
    const xenditData = {
      external_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      amount: amount,
      payer_email: email || 'user@example.com',
      description: `Top Up ${gameTitle} - ${productItem}`,
      invoice_duration: 172800, // 48 jam
      currency: 'IDR',
      success_redirect_url: 'http://localhost:3000/success',
      failure_redirect_url: 'http://localhost:3000',
    };

    console.log("🚀 Mengirim request ke Xendit...", xenditData);

    // 3. Tembak API Xendit Langsung (Tanpa Library)
    // Auth menggunakan Basic Auth: username=SecretKey, password=kosong
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

    // 4. Cek apakah Xendit menolak?
    if (!response.ok) {
      console.error("❌ Xendit Error Response:", responseData);
      return NextResponse.json({ error: 'Gagal membuat invoice di Xendit', details: responseData }, { status: 500 });
    }

    console.log("✅ Sukses! Invoice URL:", responseData.invoice_url);

    // 5. Kembalikan URL ke Frontend
    return NextResponse.json({ invoiceUrl: responseData.invoice_url });

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}