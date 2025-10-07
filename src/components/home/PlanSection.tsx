import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { Check } from 'lucide-react';

const PlanSection = () => {
  const plans = [
    {
      title: '무료',
      price: null,
      originalPrice: null,
      discount: null,
      features: [
        '정확한 신체 지표, 영양 분석 결과',
        '전체 분석 리포트 제공',
        '기본 맞춤형 제안',
      ],
      buttonText: '30초 만에 분석하기',
      buttonVariant: 'primary' as const,
      href: '/product-analysis',
    },
    {
      title: '현재 급여 식단 분석',
      price: '3.9만원',
      originalPrice: '4.5만원',
      discount: '13% 할인',
      features: [
        '무료 플랜 모든 기능',
        '현재 급여 식단 상세 분석',
        '영양소 부족/과다 진단',
        '급여량 최적화 제안',
        '1:1 전문가 상담',
      ],
      buttonText: '선택하기',
      buttonVariant: 'primary' as const,
      href: '/signup',
    },
    {
      title: '맞춤형 식단 설계',
      price: '7.9만원',
      originalPrice: '12만원',
      discount: '34% 할인',
      features: [
        '현재 급여 식단 분석 모든 기능',
        '완전 맞춤형 식단 설계',
        '영양제 추천 및 조합',
        '장기 건강 관리 계획',
        '월 1회 전문가 상담',
        '식단 변경 가이드',
      ],
      buttonText: '선택하기',
      buttonVariant: 'outline' as const,
      href: '/signup',
    },
  ];

  return (
    <section id="plans" className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            우리 아이와 나의 고민에 딱 맞는 플랜을 선택하세요!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="relative">
              {plan.discount && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {plan.discount}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <Text variant="subtitle" className="text-xl mb-2">
                  {plan.title}
                </Text>

                {plan.price && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <Text variant="title" className="text-3xl text-brand-blue">
                        {plan.price}
                      </Text>
                      {plan.originalPrice && (
                        <Text variant="caption" className="line-through text-gray-500">
                          {plan.originalPrice}
                        </Text>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <Text variant="body" className="text-sm">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                size="lg"
                className="w-full"
              >
                <Link href={plan.href}>{plan.buttonText}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
