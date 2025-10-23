import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }
    const backendUrl = `${API_URLS.BACKEND_BASE_URL}/foods/${encodeURIComponent(id)}`;
    const resp = await fetch(backendUrl, { cache: 'no-store' });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (error) {
    console.error('Food detail proxy error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
