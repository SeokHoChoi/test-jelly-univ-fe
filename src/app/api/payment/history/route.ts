import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization') || '';
  const { search } = new URL(req.url);
  const res = await fetch(`https://dog-food-db.onrender.com/api/payment/history${search}`, {
    headers: {
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}


