import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization') || '';
  const body = await req.json();


  const res = await fetch(`${API_URLS.BACKEND_BASE_URL}/payment/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}