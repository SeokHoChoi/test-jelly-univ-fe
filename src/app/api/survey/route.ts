import { NextRequest, NextResponse } from 'next/server';

interface SurveyData {
  // 보호자 정보
  ownerName: string;
  phoneNumber: string;
  email: string;

  // 반려견 정보
  gender: string;
  neutered: string;
  pregnant: string;
  bcs: number;
  rawsome: string;
  activityLevel: string;

  // 건강 정보
  healthIssues: string;
  allergies: string;
  medications: string;

  // 사료 정보
  currentFoods: string;
  feedingAmount: string;
  foodReaction: string;
  additionalInfo: string;
}

export async function POST(request: NextRequest) {
  try {
    const surveyData: SurveyData = await request.json();

    // 데이터 검증
    const requiredFields = [
      'ownerName', 'phoneNumber', 'email', 'gender', 'neutered',
      'pregnant', 'bcs', 'rawsome', 'activityLevel',
      'healthIssues', 'allergies', 'medications',
      'currentFoods', 'feedingAmount', 'foodReaction'
    ];

    for (const field of requiredFields) {
      if (!surveyData[field as keyof SurveyData]) {
        return NextResponse.json(
          { error: `필수 필드가 누락되었습니다: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: 실제 데이터베이스에 저장하는 로직 구현
    // 예시: 데이터베이스에 저장
    console.log('Survey data received:', surveyData);

    // TODO: 외부 API 호출 또는 데이터베이스 저장
    // const result = await saveSurveyData(surveyData);

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: '설문조사가 성공적으로 제출되었습니다.',
        data: surveyData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
// 데이터베이스 저장 함수 (예시)
async function saveSurveyData(data: SurveyData) {
  // TODO: 실제 데이터베이스 저장 로직 구현
  // 예시: MongoDB, PostgreSQL, MySQL 등

  // 임시로 콘솔에 출력
  console.log('Saving survey data to database:', data);

  // 실제 구현 예시:
  // const db = await connectToDatabase();
  // const result = await db.collection('surveys').insertOne(data);
  // return result;

  return { success: true, id: 'temp-id' };
}

