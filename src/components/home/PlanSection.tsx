'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/Card';
import { Check } from 'lucide-react';

const PlanSection = () => {
  const router = useRouter();

  const freeFeatures = [
    '영양 정보 신뢰도, 영양 설계 균형도, 원료 품질, 제조 품질',
    '현재 급여 제품의 주식 여부 (최대 3개)',
    '제품 설명과 장단점 및 주의사항',
  ];

  const plans = [
    {
      title: '현재 급여 식단 맞춤 설계',
      subtitle: '',
      description: '',
      price: '19,500원',
      originalPrice: '3.9만원',
      discount: '50% 할인',
      features: [
        '현재 식단 평가 및 솔루션',
        '우리 아이의 현재 신체 상태 진단 및 분석',
        '하루 권장 에너지량, 주요 영양소 섭취 함량 설계',
        '현재 주식과 보조식을 활용한 맞춤 식단 설계',
        '우리 아이가 먹는 제품의 품질과 안전성에 대한 정밀 분석 *최대 3종',
      ],
      buttonText: '신청하기',
      buttonVariant: 'primary' as const,
      recommendationTitle: '이런 분들에게 추천드려요!',
      recommendations: [
        '현재 주식(사료)가 잘 맞아서 새롭게 변경하지 않아도 되는 보호자',
        '현재 주식을 활용해 우리 아이의 건강 상태에 맞게 맞춤 설계하고 싶은 보호자',
        '현재 먹이는 제품의 품질이 좋은지, 정말 안전한지 궁금한 보호자',
      ],
      benefitsTitle: '이런걸 받으실 수 있어요!',
      footerNote: '*글로벌 수의영양학 데이터를 학습한 전문 AI가 제공해드립니다.',
    },
    {
      title: '신규 맞춤 식단 설계',
      subtitle: '영양학 전문 수의사 직접 검증',
      description: '',
      price: '59,000원',
      originalPrice: '15만원',
      discount: '60% 할인',
      features: [
        '현재 식단 평가 및 진단',
        '우리 아이의 현재 신체 상태 진단 및 분석',
        '하루 권장 에너지량, 주요 영양소 섭취 함량 설계',
        '새로운 맞춤 식단 2가지 설계 제공',
        '현재 → 신규 식단 단계별 변경 플랜',
        '신규 식단 관련 영양학 Q&A 1회 제공',
        '우리 아이가 먹는 제품의 품질과 안전성에 대한 정밀 분석',
      ],
      buttonText: '신청하기',
      buttonVariant: 'outline' as const,
      recommendationTitle: '이런 분들에게 추천드려요!',
      recommendations: [
        '새로운 주식(사료)로 변경하고 싶은 보호자',
        '새로운 주식을 활용해 우리 아이의 건강 상태에 맞게 맞춤 설계하고 싶은 보호자',
        '신규 제품의 품질이 좋은지, 정말 안전한지 궁금한 보호자',
      ],
      benefitsTitle: '이런걸 받으실 수 있어요!',
      footerNote: '*수의영양학 전문 수의사가 최종 검증 후 제공해드립니다.',
    },
  ];

  return (
    <section id="plans" className="bg-[#F8F8F8] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-18">
          <p className="text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]">
            플랜 안내
          </p>
          <h2 className="text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight">
            우리 아이와 나의 고민에 딱 맞는<br />
            플랜을 선택하세요!
          </h2>
        </div>

        {/* FREE CARD */}
        <Card className="mb-10 md:mb-12 border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] md:px-[94.5px] py-[24px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-[30px]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <span className="text-[#000000] font-bold text-[20px] md:text-[30px] md:mr-[165px]">무료</span>
              <ul className="space-y-[6px] md:space-y-2">
                {freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-[6px] md:gap-2">
                    <Check className="text-[#1E1E1E] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-[#525252] font-normal text-[15px] md:text-[18px] leading-[25px]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link
                href="/product-analysis"
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-12 px-6 text-lg w-full md:w-[199px] whitespace-nowrap mx-auto md:mx-0"
              >
                30초 만에 분석하기
              </Link>
            </div>
          </div>
        </Card>

        {/* PAID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="relative border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px] flex flex-col"
            >
              {plan.discount && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium">
                    {plan.discount}
                  </span>
                </div>
              )}

              <div className="text-left flex-1 flex flex-col">
                <h3 className="text-[20px] md:text-[30px] font-bold text-[#000000] mb-4">
                  <span className="inline-block">{plan.title}</span>
                  {plan.subtitle && (
                    <>
                      <span className="text-[14px] md:text-[16px] text-[#003DA5] font-normal ml-2 md:ml-3 whitespace-nowrap">
                        {plan.subtitle}
                      </span>
                      <br className="md:hidden" />
                      <span className="md:hidden text-[14px] text-[#003DA5] font-normal block mt-1">
                        {plan.subtitle}
                      </span>
                    </>
                  )}
                </h3>
                {plan.price && (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[40px] md:text-[55px] font-bold text-brand-blue">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="line-through text-[17px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)]">
                          / 정가 {plan.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {plan.recommendationTitle && (
                  <div className="mb-6">
                    <p className="text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3">
                      {plan.recommendationTitle}
                    </p>
                    <ul className="space-y-2 text-[14px] md:text-[16px] text-[#666666]">
                      {plan.recommendations?.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span>✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {plan.benefitsTitle && (
                  <div className="mb-6">
                    <p className="text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3">
                      {plan.benefitsTitle}
                    </p>
                    <ul className="space-y-2 text-[14px] md:text-[16px] text-[#666666]">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <span>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.footerNote && (
                      <p className="text-[13px] md:text-[14px] text-[#666666] mt-3 italic">
                        {plan.footerNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 버튼 영역 - 하단 고정 */}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => {
                    // 모든 플랜은 프로덕트 분석 페이지로 이동
                    router.push('/product-analysis');
                  }}
                  className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003DA5]/30 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 h-12 px-6 text-lg w-full ${index === 0
                    ? 'bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] mx-auto'
                    : plan.buttonVariant === 'primary'
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-dark active:bg-brand-blue-dark'
                      : 'border border-gray-300 text-[#003DA5] hover:bg-gray-50 active:bg-gray-100'
                    }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
