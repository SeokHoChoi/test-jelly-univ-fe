import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/utils/constants';


export async function POST(request: NextRequest) {
  try {
    const apiPayload = await request.json();

    // 데이터 검증
    if (!apiPayload.guardian || !apiPayload.pet) {
      return NextResponse.json(
        { error: 'guardian 또는 pet 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const { guardian, pet } = apiPayload;

    // guardian 필수 필드 검증
    const guardianRequiredFields = ['name', 'phone', 'email'];
    for (const field of guardianRequiredFields) {
      if (!guardian[field]) {
        return NextResponse.json(
          { error: `guardian 필수 필드가 누락되었습니다: ${field}` },
          { status: 400 }
        );
      }
    }

    // pet 필수 필드 검증
    const petRequiredFields = [
      'name', 'birthDate', 'breed', 'genderNeutered', 'pregnantOrNursing',
      'weight', 'bcsScore', 'rawsomeCheck', 'activityLevel',
      'healthIssues', 'allergies', 'medications',
      'currentFoods', 'feedingAmount', 'foodResponse'
    ];
    for (const field of petRequiredFields) {
      if (pet[field] === undefined || pet[field] === null || pet[field] === '') {
        return NextResponse.json(
          { error: `pet 필수 필드가 누락되었습니다: ${field}` },
          { status: 400 }
        );
      }
    }

    // 외부 API 호출
    const response = await fetch(`${API_URLS.BACKEND_BASE_URL}/pets/survey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiPayload),
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
    console.error('Survey submission error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
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
