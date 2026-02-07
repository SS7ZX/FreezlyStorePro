import { NextResponse } from 'next/server';
import crypto from 'crypto';
// import { supabase } from '@/lib/supabase'; // Import supabase client kamu nanti

export async function POST(request: Request) {
  try {
    // 1. Ambil data webhook dari Xendit
    const body = await request.json();
    const { external_id, status, paid_amount } = body;

    // 2. VERIFIKASI KEAMANAN (WAJIB!)
    // Mencegah orang iseng pura-pura jadi Xendit
    const callbackToken = request.headers.get('x-callback-token');
    const secretWebhookToken = process.env.XENDIT_WEBHOOK_TOKEN; // Ambil dari Dashboard Xendit

    if (callbackToken !== secretWebhookToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. LOGIKA BISNIS
    if (status === 'PAID') {
      console.log(`✅ Order ${external_id} BERHASIL dibayar: Rp ${paid_amount}`);

      // --- DISINI KAMU UPDATE DATABASE SUPABASE ---
      // const { data, error } = await supabase
      //   .from('orders')
      //   .update({ status: 'SUCCESS' })
      //   .eq('order_id', external_id);
      // ---------------------------------------------
    }

    // 4. Kasih respon ke Xendit
    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}