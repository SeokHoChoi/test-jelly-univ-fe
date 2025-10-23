import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: '인증 토큰이 필요합니다.',
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // 'Bearer ' 제거

    // 외부 API 호출
    const response = await fetch(`${API_URLS.BACKEND_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('사용자 정보 조회 API 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: '사용자 정보 조회 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
