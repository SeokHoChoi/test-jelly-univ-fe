'use client';

import Link from 'next/link';
import Card from '@/components/common/Card';
import { Check } from 'lucide-react';
import PreReservationModal from '@/components/common/PreReservationModal';
import { useState } from 'react';

const PlanSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string } | null>(null);

  const freeFeatures = [
    '영양 정보 신뢰도, 영양 설계 균형도, 원료 품질, 제조 품질',
    '현재 급여 제품의 주식 여부 (최대 3개)',
    '제품 설명과 장단점 및 주의사항',
  ];

  const plans = [
    {
      title: '현재 급여 식단 분석',
      subtitle: '현재 식단이 우리 아이에게 잘 맞는지 걱정이라면',
      price: '3.9만원',
      originalPrice: '4.5만원',
      discount: '13% 할인',
      features: [
        '국제 표준 준수 여부',
        '에너지원 구성의 적정성',
        '주요 영양소 비율의 적정성',
        '필수 영양소 포함 여부',
        '기능성 영양소 포함 여부',
        '반려견의 현재 신체 상태 진단',
        '목표 체중 및 일일 목표 칼로리 설정',
        '현재 섭취 칼로리 및 영양소 함량 분석',
        '현재 vs 목표 영양 섭취량 비교 분석',
        '급여 식단과 영영제의 상호작용 및 평가',
        '종합 결론 및 솔루션',
        { text: '맞춤형 식단 설계 2가지 타입', disabled: true },
        { text: '주식, 보조식, 영양제 신규 제품 추천', disabled: true },
        { text: '1일 급여량 및 급여 주기 상세 계획', disabled: true },
      ],
      buttonText: '신청하기',
      buttonVariant: 'primary' as const,
    },
    {
      title: '맞춤형 식단 설계',
      subtitle: '저속노화를 위해 무엇을, 얼마나 먹일지 고민이라면',
      price: '7.9만원',
      originalPrice: '12만원',
      discount: '34% 할인',
      features: [
        '국제 표준 준수 여부',
        '에너지원 구성의 적정성',
        '주요 영양소 비율의 적정성',
        '필수 영양소 포함 여부',
        '기능성 영양소 포함 여부',
        '반려견의 현재 신체 상태 진단',
        '목표 체중 및 일일 목표 칼로리 설정',
        '현재 섭취 칼로리 및 영양소 함량 분석',
        '현재 vs 목표 영양 섭취량 비교 분석',
        '급여 식단과 영영제의 상호작용 및 평가',
        '종합 결론 및 솔루션',
        { text: '맞춤형 식단 설계 2가지 타입', disabled: false },
        { text: '주식, 보조식, 영양제 신규 제품 추천', disabled: false },
        { text: '1일 급여량 및 급여 주기 상세 계획', disabled: false },
      ],
      buttonText: '신청하기',
      buttonVariant: 'outline' as const,
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
              className="relative border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px]"
            >
              {plan.discount && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium">
                    {plan.discount}
                  </span>
                </div>
              )}

              <div className="text-left mb-8">
                <h3 className="text-[20px] md:text-[30px] font-medium text-[#000000]">
                  {plan.title}
                </h3>
                {plan.subtitle && (
                  <p className="text-[15px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)] mb-6">
                    {plan.subtitle}
                  </p>
                )}

                {plan.price && (
                  <div className="mb-4">
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
              </div>

              <ul className="space-y-[6px] md:space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => {
                  const isDisabled = typeof feature === 'object' && feature.disabled;
                  const featureText = typeof feature === 'string' ? feature : feature.text;
                  return (
                    <li key={featureIndex} className="flex items-start gap-[6px] md:gap-2">
                      <Check
                        className={`flex-shrink-0 mt-0.5 ${isDisabled ? 'text-[#C1C1C1]' : 'text-[#1E1E1E]'}`}
                        size={20}
                      />
                      <span className={`font-medium text-[14px] md:text-[18px] leading-[25px] ${isDisabled ? 'text-[#C1C1C1]' : 'text-[#1E1E1E]'}`}>
                        {featureText}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={() => {
                  setSelectedPlan({ title: plan.title, price: plan.price });
                  setModalOpen(true);
                }}
                className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 h-12 px-6 text-lg w-full ${index === 0
                  ? 'bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] mx-auto'
                  : plan.buttonVariant === 'primary'
                    ? 'bg-brand-blue text-white hover:bg-brand-blue-dark active:bg-brand-blue-dark'
                    : 'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white active:bg-brand-blue active:text-white'
                  }`}
              >
                {plan.buttonText}
              </button>
            </Card>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PreReservationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planTitle={selectedPlan.title}
          planPrice={selectedPlan.price}
        />
      )}
    </section>
  );
};

export default PlanSection;
