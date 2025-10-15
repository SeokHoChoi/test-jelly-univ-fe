import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization') || '';
  const res = await fetch('https://dog-food-db.onrender.com/api/payment/subscription', {
    headers: { Authorization: token },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}


