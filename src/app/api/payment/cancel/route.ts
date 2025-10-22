import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization') || '';
    const body = await req.json();

    console.log('=== 결제 취소 API 요청 ===');
    console.log('Authorization:', token);
    console.log('Request Body:', body);

    const res = await fetch('https://dog-food-db.onrender.com/api/payment/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Backend Response Status:', res.status);
    console.log('Backend Response Data:', data);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('결제 취소 API 에러:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


