import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증 및 최대 3개 제한
    const { dogName, dogWeight, dogBreed, feeds } = body || {};
    if (!dogName || !dogWeight || !dogBreed || !Array.isArray(feeds)) {
      return NextResponse.json(
        { success: false, error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (feeds.length === 0 || feeds.length > 3) {
      return NextResponse.json(
        { success: false, error: '사료는 1개 이상, 최대 3개까지 가능합니다.' },
        { status: 400 }
      );
    }

    // 외부 API에 그대로 프록시
    const response = await fetch(`${API_URLS.BACKEND_BASE_URL}/rating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dogName, dogWeight, dogBreed, feeds }),
      // Next.js App Router의 fetch 캐시 비활성화
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 400) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(
          { success: false, ...err },
          { status: 400 }
        );
      }
      if (response.status === 404) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json(
          { success: false, ...err },
          { status: 404 }
        );
      }
      if (response.status === 503) {
        return NextResponse.json(
          { success: false, error: 'AI 서비스 사용 불가' },
          { status: 503 }
        );
      }
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('사료 등급 평가 API 에러:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  // CORS 프리플라이트 대응 (내부 라우트이지만, 유연성을 위해 노출)
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}


