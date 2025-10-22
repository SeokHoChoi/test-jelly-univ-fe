import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_BASE_URL = 'https://dog-food-db.onrender.com/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      phone = '',
      isPreRegistered = false,
      referralSource = ''
    } = body;

    // 필수 필드 검증
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: '필수 필드가 누락되었습니다.',
        },
        { status: 400 }
      );
    }

    // 외부 API 호출
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, phone, isPreRegistered, referralSource }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // 상태 코드별 구체적인 에러 메시지
      let errorMessage = errorData.message || '회원가입에 실패했습니다.';

      if (response.status === 409) {
        errorMessage = '이미 사용 중인 이메일입니다.';
      } else if (response.status === 400) {
        errorMessage = errorData.message || '입력 정보를 확인해주세요.';
      } else if (response.status === 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 201,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('회원가입 API 에러:', error);
    return NextResponse.json(
      {
        success: false,
        error: '회원가입 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
