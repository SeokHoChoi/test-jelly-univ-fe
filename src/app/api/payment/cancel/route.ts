import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization') || '';
    const body = await req.json();

    const res = await fetch(`${API_URLS.BACKEND_BASE_URL}/payment/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('결제 취소 API 에러:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


