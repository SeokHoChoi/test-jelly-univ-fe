import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_BASE_URL = 'https://dog-food-db.onrender.com/api';

interface SurveyData {
  // 보호자 정보
  ownerName: string;
  phoneNumber: string;
  email: string;

  // 반려견 정보
  birthDate: string;
  gender: string;
  neutered: string;
  pregnant: string;
  bcs: string;
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

interface ProductAnalysisData {
  dogName: string;
  dogWeight: string;
  dogBreed: string;
  feeds: Array<{
    name: string;
    amount: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { surveyData, productAnalysisData }: {
      surveyData: SurveyData;
      productAnalysisData: ProductAnalysisData;
    } = await request.json();

    // 데이터 검증
    const requiredFields = [
      'ownerName', 'phoneNumber', 'email', 'birthDate', 'gender',
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

    // product-analysis 데이터 검증
    if (!productAnalysisData || !productAnalysisData.dogName || !productAnalysisData.dogWeight || !productAnalysisData.dogBreed) {
      return NextResponse.json(
        { error: 'Product analysis 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // API 요청 데이터 구성
    const apiPayload = {
      guardian: {
        name: surveyData.ownerName,
        phone: surveyData.phoneNumber,
        email: surveyData.email
      },
      pet: {
        name: productAnalysisData.dogName,
        birthDate: surveyData.birthDate,
        breed: productAnalysisData.dogBreed,
        genderNeutered: surveyData.gender, // gender 필드를 genderNeutered로 매핑
        pregnantOrNursing: surveyData.pregnant,
        weight: parseFloat(productAnalysisData.dogWeight),
        bcsScore: typeof surveyData.bcs === 'string' ? parseInt(surveyData.bcs.replace('점', '')) : surveyData.bcs,
        rawsomeCheck: surveyData.rawsome,
        activityLevel: surveyData.activityLevel,
        healthIssues: surveyData.healthIssues,
        allergies: surveyData.allergies,
        medications: surveyData.medications,
        currentFoods: buildCurrentFoodsString(productAnalysisData.feeds, surveyData.currentFoods),
        feedingAmount: buildFeedingAmountString(productAnalysisData.feeds, surveyData.feedingAmount),
        foodResponse: surveyData.foodReaction,
        additionalInfo: surveyData.additionalInfo || ""
      }
    };

    // 외부 API 호출
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/pets/survey`, {
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

// currentFoods 문자열 구성 함수
function buildCurrentFoodsString(productAnalysisFeeds: Array<{ name: string, amount: string }>, surveyCurrentFoods: string): string {
  const productAnalysisFoods = productAnalysisFeeds.map(feed => feed.name).join(', ');
  return `분석 페이지에서 입력한 주식 목록: ${productAnalysisFoods}\n설문 페이지에서 입력한 자료 목록:\n${surveyCurrentFoods}`;
}

// feedingAmount 문자열 구성 함수
function buildFeedingAmountString(productAnalysisFeeds: Array<{ name: string, amount: string }>, surveyFeedingAmount: string): string {
  const productAnalysisAmounts = productAnalysisFeeds.map(feed => `${feed.name} ${feed.amount}g`).join(', ');
  return `분석 페이지에서 입력한 주식 급여 타이밍: ${productAnalysisAmounts}\n설문 페이지에서 입력한 급여 정보:\n${surveyFeedingAmount}`;
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
