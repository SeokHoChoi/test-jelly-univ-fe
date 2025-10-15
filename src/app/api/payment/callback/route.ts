import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('OK', { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return new NextResponse('OK', { status: 200 });
}


