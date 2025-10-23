import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = searchParams.get('limit') || '10';
    const offset = searchParams.get('offset') || '0';

    // 외부 API 호출
    const response = await fetch(
      `${API_URLS.BACKEND_BASE_URL}/foods/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('사료 검색 API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        error: '사료 검색 중 오류가 발생했습니다.',
        data: [],
        pagination: {
          offset: 0,
          limit: 10,
          total: 0,
          hasMore: false,
        },
      },
      { status: 500 }
    );
  }
}
