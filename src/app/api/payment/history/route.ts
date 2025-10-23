import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization') || '';
  const { search } = new URL(req.url);
  const res = await fetch(`${API_URLS.BACKEND_BASE_URL}/payment/history${search}`, {
    headers: {
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}


