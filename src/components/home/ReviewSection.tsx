"use client";
import Card from '@/components/common/Card';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 'review-1',
      dogName: '두부',
      guardianName: '신지원',
      location: '말티즈',
      title: '노화 관리 식단 관리에 확신이 생겼어요',
      age: { value: 4, unit: 'year' },
      content: '4살이 되면서 점점 노화에 대한 걱정이 커졌는데, 현재 먹이고 있는 건사료가 주식으로 적합한지 궁금했어요. 리포트에서 목표 체중과 권장 칼로리를 명확히 제시해주시고, 탄수화물 비중 등 구체적인 영양소 분석을 해주셔서 사료 변경 결정에 확신이 생겼어요. 리포트 형태라 계속 참고할 수 있어서 더 만족스럽습니다.',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      id: 'review-2',
      dogName: '밤비',
      guardianName: '남은비',
      location: '셔틀랜드 쉽독',
      title: '영양제 과다섭취를 발견해서 정말 다행이에요',
      age: { value: 1, unit: 'year' },
      content: '밤비가 계란노른자 알레르기와 슬개골 문제가 있어서 영양 관리가 정말 어려웠어요. 알러지 성분을 피하면서 영양 균형을 맞추는 게 쉽지 않았거든요. 리포트를 받고 충격적이었던 건 영양제를 너무 과하게 먹이고 있었다는 사실이었어요! 모르게 계속 먹였다가 오히려 독이 될 뻔했는데, 일찍 알게 되어 정말 다행입니다. 리포트를 기반으로 식단과 영양제를 모두 바꿨어요!',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      id: 'review-3',
      dogName: '하이',
      guardianName: '김지우',
      location: '포메라니안',
      title: '데이터 기반의 분석이 정말 만족스러워요',
      age: { value: 2, unit: 'year' },
      content: '기존 수의사 컨설팅은 35만원이나 해서 부담스러웠는데, 이 정도 퀄리티를 합리적인 가격에 받을 수 있어서 너무 좋았어요. 원료프로필과 영양성분비 등 수치적 구성도 우수하고, 사료 뒤 라벨의 애매한 정보를 구체적 수치로 명확하게 보여주셔서 이해하기 쉬웠어요. 평소 꼼꼼히 기록하는 편인데, 제가 계산한 것과 비교해봐도 정확했습니다!',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
    {
      id: 'review-4',
      dogName: '코코',
      guardianName: '이서연',
      location: '푸들',
      title: '식단 가이드 덕분에 급여가 훨씬 쉬워졌어요',
      age: { value: 3, unit: 'year' },
      content: '권장 칼로리와 1일 급여량이 명확해서 매번 계산 스트레스가 사라졌어요. 기존에 주던 간식 비중도 조정해 주셔서 체중이 안정적으로 관리되고 있습니다.',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      id: 'review-5',
      dogName: '몽이',
      guardianName: '박하늘',
      location: '믹스',
      title: '알러지 원인을 추적하는 데 큰 도움이 됐어요',
      age: { value: 10, unit: 'month' },
      content: '원료 프로필을 기반으로 의심 성분을 걸러내고 대체 식단을 제안해줘서 트러블이 빠르게 가라앉았어요. 기록 기능과 비교도 유용했습니다.',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      id: 'review-6',
      dogName: '보리',
      guardianName: '최민준',
      location: '시바 이누',
      title: '수치 기반 분석이 신뢰를 주네요',
      age: { value: 5, unit: 'year' },
      content: '에너지원 비율과 필수 영양소 충족 여부를 수치로 보여줘서 이해가 쉬웠습니다. 식단과 영양제 조합을 바꾼 뒤 활력이 눈에 띄게 좋아졌어요.',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
  ];

  const [sliderRef] = useKeenSlider({
    loop: true,
    drag: true,
    mode: 'snap',
    renderMode: 'performance',
    slides: {
      origin: 'center',
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 1.6, spacing: 20 },
      },
      '(min-width: 768px)': {
        slides: { perView: 2.2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2.8, spacing: 24 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 3.1, spacing: 24 },
      },
    },
  });

  return (
    <section id="reviews" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-18">
          <p className="text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]">
            보호자 후기
          </p>
          <h2 className="text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight">
            CBT 참여 보호자들의 생생한 후기
          </h2>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider overflow-visible"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch'
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="keen-slider__slide"
              style={{
                width: 'auto',
                minHeight: 'auto',
                flexShrink: 0,
                display: 'block'
              }}
            >
              <Card className="p-8 hover:shadow-lg transition-shadow h-auto">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={review.avatar}
                    alt={`${review.dogName} 보호자 ${review.guardianName} avatar`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-[8px] object-cover"
                  />
                  <div>
                    <h4 className="text-[#000000] font-bold text-[18px]">
                      {review.dogName} 보호자 {review.guardianName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {review.location} · {review.age.value}
                      {review.age.unit === 'year' ? '살' : review.age.unit === 'month' ? '개월' : '주'}
                    </p>
                  </div>
                </div>

                {/* Review title */}
                {review.title && (
                  <p className="text-[18px] font-medium text-[#003DA5] mb-4">
                    &ldquo;{review.title}&rdquo;
                  </p>
                )}

                {/* Review content */}
                <p className="text-[#1E1E1E] text-[17px] font-normal leading-relaxed">
                  {review.content}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
