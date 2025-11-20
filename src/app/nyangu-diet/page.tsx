'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';
import { ArrowLeft } from 'lucide-react';
import NyanguInfoPanel from '@/components/nyangu-diet/NyanguInfoPanel';
import ProcessStepCarousel from '@/components/nyangu-diet/ProcessStepCarousel';
import ProcessStepContent from '@/components/nyangu-diet/ProcessStepContent';
import HeroBanner from '@/components/nyangu-diet/HeroBanner';

/**
 * 냥구 식단 설명 페이지
 * - 냥구 케이스 소개 및 식단 공개
 * - 젤리대학교 식단 설계 과정 소개
 * - 1:1 맞춤 서비스 신청하기 CTA 포함
 */
export default function NyanguDietPage() {
  const router = useRouter();
  const response = useRatingStore((s) => s.response);
  const [activeStep, setActiveStep] = useState(1);

  const dogName = useMemo(() => {
    return response?.dogInfo?.name || '우리 아이';
  }, [response]);

  const goCheckout = () => {
    router.push('/checkout?plan=basic&dir=true&campaign=nyangu');
  };

  // 4단계 프로세스 정의
  const processSteps = useMemo(
    () => [
      {
        id: 1,
        title: '01 사료 품질 심층 분석',
        subtitle: '원료·제조·영양·안전성 검증',
        content: <ProcessStepContent stepId={1} />,
      },
      {
        id: 2,
        title: '02 현재 식단 분석',
        subtitle: '현재 급여 진단 · 개선 방향 설계',
        content: <ProcessStepContent stepId={2} />,
      },
      {
        id: 3,
        title: '03 맞춤 식단 설계',
        subtitle: '현재 급여 진단 · 개선 방향 설계',
        content: <ProcessStepContent stepId={3} />,
      },
      {
        id: 4,
        title: '04 최종 검증',
        subtitle: '영양학 전문 수의사의 최종 리뷰',
        content: <ProcessStepContent stepId={4} />,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-gray-900">상위 1% 튼튼한 장으로 인정 받은 냥구 케이스</h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="relative mx-auto max-w-7xl">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-[13px] md:text-[14px] font-medium mb-6">
              <span>🔬</span>
              <span>젤리대 1호 학생 냥구</span>
            </div>
            <h2 className="text-[clamp(28px,5vw,44px)] font-bold text-gray-900 leading-[1.2] tracking-[-0.02em] mb-6">
              경쟁률 407:4 변 공여견 합격 🎉
            </h2>
            <p className="text-[clamp(16px,2.5vw,19px)] text-gray-600 leading-relaxed max-w-3xl mx-auto">
              무엇을 어떻게 해야할지 모르겠다고요?!
              <br />
              냥구 식단의 케이스 스터디를 통해
              <br />
              건강한 식단의 힌트를 얻어보세요!
            </p>
          </div>

          {/* 메인 레이아웃: 왼쪽 고정 패널 + 오른쪽 캐러셀 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
            {/* 왼쪽: 냥구 정보 패널 (고정) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <NyanguInfoPanel />
            </div>

            {/* 오른쪽: 프로세스 단계 캐러셀 */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ProcessStepCarousel
                steps={processSteps}
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </div>
          </div>

          {/* 핵심 메시지 섹션 */}
          <div className="mb-20">
            <div className="bg-gray-50 rounded-lg p-8 md:p-10 border border-gray-200">
              <p className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-4">
                ⚠️ 기억하세요! 프리미엄 사료와 식단은 없습니다.
              </p>
              <p className="text-[16px] md:text-[17px] text-gray-700 leading-relaxed mb-3">
                냥구에게 완벽한 식단이 우리 아이에게는 맞지 않은 식단일 수 있어요.
              </p>
              <p className="text-[16px] md:text-[17px] text-gray-700 leading-relaxed mb-3">
                나이가 다르고, 체중이 다르고, 활동량이 다르고, 알레르기가 다르고, 심지어 사는 환경까지 다르니까요.
              </p>
              <p className="text-[16px] md:text-[17px] text-gray-700 leading-relaxed">
                단순한 프리미엄 사료 추천이 아닌 <span className="font-bold text-gray-900">과학적 근거</span>를 바탕으로{' '}
                <span className="font-bold text-gray-900">'왜 이 사료가 우리 아이에게 맞는지'</span> 설명합니다.
              </p>
            </div>
          </div>

          {/* 하단 CTA 섹션 */}
          <div className="bg-white rounded-lg p-10 md:p-14 lg:p-20 mb-12 md:mb-16 border border-gray-200">
            <div className="max-w-5xl mx-auto">
              {/* 헤더 */}
              <div className="text-center mb-12 md:mb-16">
                <h3 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold mb-6 leading-tight text-gray-900">
                  냥구처럼 {dogName}도<br className="md:hidden" />
                  <span className="text-[#003DA5]">젤리대학교 식단</span>을 받아보세요
                </h3>
                <p className="text-[18px] md:text-[20px] text-gray-600 leading-relaxed">
                  냥구가 받은 것과 동일한 3원칙 검증 프로세스로<br className="hidden md:block" />
                  {dogName}만을 위한 맞춤 식단을 설계해드립니다
                </p>
              </div>

              {/* 서비스 항목 리스트 */}
              <div className="bg-gray-50 rounded-lg p-8 md:p-10 mb-10 md:mb-12 border border-gray-200">
                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DA5] text-white flex items-center justify-center font-bold text-[15px] md:text-[16px] mt-0.5">
                      1
                    </div>
                    <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed pt-0.5">
                      주식/보조식 최대 5개 및 영양제 제품 안전성 분석
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DA5] text-white flex items-center justify-center font-bold text-[15px] md:text-[16px] mt-0.5">
                      2
                    </div>
                    <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed pt-0.5">
                      1:1 우리 아이 맞춤 데이터 기반 1일 에너지 및 급여량 설정
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DA5] text-white flex items-center justify-center font-bold text-[15px] md:text-[16px] mt-0.5">
                      3
                    </div>
                    <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed pt-0.5">
                      목표 에너지 및 급여량에 따른 맞춤 식단 설계 2가지 제공
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DA5] text-white flex items-center justify-center font-bold text-[15px] md:text-[16px] mt-0.5">
                      4
                    </div>
                    <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed pt-0.5">
                      영양학 전문 수의사 최종 검토
                    </p>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#003DA5] text-white flex items-center justify-center font-bold text-[15px] md:text-[16px] mt-0.5">
                      5
                    </div>
                    <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed pt-0.5">
                      영양학 전문 상담사의 관련 Q&A 1회 제공
                    </p>
                  </div>
                </div>
              </div>

              {/* 멘트 */}
              <div className="text-center mb-10 md:mb-12">
                <p className="text-[20px] md:text-[22px] text-gray-900 font-semibold">
                  이것이 젤리대학교가 추구하는<br className="md:hidden" />
                  <span className="text-[#003DA5]">맞춤 식단 설계</span>입니다
                </p>
              </div>

              {/* CTA 버튼 */}
              <div className="text-center">
                <button
                  onClick={goCheckout}
                  className="w-full md:w-auto bg-[#003DA5] text-white py-6 md:py-7 px-14 md:px-20 rounded-lg font-bold text-[19px] md:text-[21px] hover:bg-[#002A7A] transition-colors mb-5"
                >
                  1:1 맞춤 서비스 신청하기
                </button>
                <p className="text-[15px] text-gray-500">
                  서울대·한국수의영양학회 임원 수의사 검증
                </p>
              </div>
            </div>
          </div>

          {/* 롤링 이미지 갤러리 */}
          <div className="bg-white overflow-hidden">
            <div className="mx-auto">
              <div className="relative h-[200px] md:h-[250px] overflow-hidden">
                {/* 왼쪽 그라데이션 마스크 */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none opacity-60" />
                {/* 오른쪽 그라데이션 마스크 */}
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none opacity-60" />
                <div className="flex animate-scroll h-full will-change-transform" style={{ width: 'max-content' }}>
                  {/* 첫 번째 세트 */}
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={`first-${num}`} className="flex-shrink-0 w-[216px] md:w-[266px] h-full pr-4">
                      <img
                        src={`/img/nyangu-page/Image ${num}.png`}
                        alt={`반려견 ${num}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                  {/* 두 번째 세트 (무한 루프를 위해) */}
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={`second-${num}`} className="flex-shrink-0 w-[216px] md:w-[266px] h-full pr-4">
                      <img
                        src={`/img/nyangu-page/Image ${num}.png`}
                        alt={`반려견 ${num}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                  {/* 세 번째 세트 (더 부드러운 루프를 위해) */}
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={`third-${num}`} className="flex-shrink-0 w-[216px] md:w-[266px] h-full pr-4">
                      <img
                        src={`/img/nyangu-page/Image ${num}.png`}
                        alt={`반려견 ${num}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
