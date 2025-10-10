import { NextRequest, NextResponse } from 'next/server';

// 임시 품종 데이터 (추후 실제 API로 교체 가능)
const DOG_BREEDS = [
  '골든 리트리버', '래브라도 리트리버', '시베리안 허스키', '말티즈', '푸들',
  '치와와', '불독', '비글', '요크셔 테리어', '포메라니안',
  '시바견', '진돗개', '삽살개', '풍산개', '제주개',
  '아메리칸 스태퍼드셔 테리어', '로트와일러', '도베르만', '저먼 셰퍼드', '보더 콜리',
  '오스트레일리안 셰퍼드', '잭 러셀 테리어', '웨스트 하이랜드 화이트 테리어', '스코티시 테리어', '케언 테리어',
  '코기', '웰시 코기', '잉글리시 코커 스패니얼', '아메리칸 코커 스패니얼', '스프링어 스패니얼',
  '버니즈 마운틴 독', '그레이트 데인', '세인트 버나드', '마스티프', '불마스티프',
  '샤페이', '차우차우', '아키타', '시바견', '진도개',
  '불테리어', '스태퍼드셔 불테리어', '아메리칸 불테리어', '미니어처 불테리어', '스카이 테리어',
  '스코티시 테리어', '웨스트 하이랜드 화이트 테리어', '케언 테리어', '스카이 테리어', '실키 테리어'
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    // 검색어가 없으면 빈 배열 반환
    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
      });
    }

    // 검색어와 일치하는 품종 필터링 (대소문자 구분 없음)
    const filteredBreeds = DOG_BREEDS.filter(breed =>
      breed.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // 최대 10개만 반환

    return NextResponse.json({
      success: true,
      data: filteredBreeds,
      total: filteredBreeds.length,
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('품종 검색 API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        error: '품종 검색 중 오류가 발생했습니다.',
        data: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
