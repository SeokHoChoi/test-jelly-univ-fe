import ReviewSlider from './ReviewSlider';

const ReviewSection = () => {
  const reviews = [
    {
      id: 'review-1',
      dogName: '레오',
      guardianName: '신혜선',
      location: '말티푸',
      title: '객관적인 데이터로 확신을 얻었어요',
      age: { value: 8, unit: 'month' as const },
      content:
        '처음 키우는 강아지라 정말 잘 키우고 있는지 항상 불안했어요. 레오가 사료를 잘 안 먹어서 더욱 걱정이 많았고요. 리포트를 받고 나서야 제가 먹이고 있던 방법에 대한 객관적인 평가를 받을 수 있었어요. 특히 사료 성분표를 쉽게 풀어서 설명해주셔서 이해하기 좋았고, 전문가 검증을 거친다는 점에서 큰 신뢰가 갔습니다!',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      id: 'review-2',
      dogName: '카키',
      guardianName: '양한아',
      location: '이탈리안 그레이 하운드',
      title: '사료부터 청소 습관까지 모두 바꿨어요',
      age: { value: 6, unit: 'year' as const },
      content:
        '리포트를 보고 자동급식기 청소부터 사료 보관 방식까지 완전히 바꿨어요. 습식 사료를 상온에 1시간 이상 두면 안된다는 한 문장에 바로 청소 습관이 달라졌죠. 색소·방부제가 든 사료 성분도 다시 살펴보고 결국 바꾸게 됐어요. 덕분에 사료 급여가 훨씬 안심돼요!',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      id: 'review-3',
      dogName: '두부',
      guardianName: '신지원',
      location: '말티즈',
      title: '노화 관리 식단 관리에 확신이 생겼어요',
      age: { value: 4, unit: 'year' as const },
      content:
        '4살이 되면서 점점 노화에 대한 걱정이 커졌는데, 현재 먹이고 있는 건사료가 주식으로 적합한지 궁금했어요. 리포트에서 목표 체중과 권장 칼로리를 명확히 제시해주시고, 탄수화물 비중 등 구체적인 영양소 분석을 해주셔서 사료 변경 결정에 확신이 생겼어요. 리포트 형태라 계속 참고할 수 있어서 더욱 만족스럽습니다.',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
    {
      id: 'review-4',
      dogName: '밤비',
      guardianName: '남은비',
      location: '셔틀랜드 쉽독',
      title: '영양제 과다섭취를 발견해서 정말 다행이에요',
      age: { value: 1, unit: 'year' as const },
      content:
        '밤비가 계란노른자 알러지와 슬개골 문제가 있어서 영양 관리가 정말 어려웠어요. 알러지 성분을 피하면서 영양 균형을 맞추는 게 쉽지 않았거든요. 리포트를 받고 충격적이었던 건 영양제를 너무 과하게 먹이고 있다는 사실이었어요! 모르고 계속 먹였다면 오히려 독이 될 뻔했는데, 일찍 알게 되어 정말 다행입니다. 리포트를 기반으로 식단과 영양제를 모두 바꿨어요!',
      avatar: '/img/home/tmp-review-profile/review-4.png',
    },
    {
      id: 'review-5',
      dogName: '하이',
      guardianName: '김지우',
      location: '포메라니안',
      title: '데이터 기반의 분석이 정말 만족스러워요',
      age: { value: 2, unit: 'year' as const },
      content:
        '기존 수의사 컨설팅은 35만원이나 해서 부담스러웠는데, 이 정도 퀄리티를 합리적인 가격에 받을 수 있어서 너무 좋았어요. 원그래프와 영양성분비 등 시각적 구성도 우수하고, 사료 뒤 라벨의 애매한 정보를 구체적 수치로 명확하게 보여주셔서 이해하기 쉬웠어요. 평소 꼼꼼히 기록하는 편인데, 제가 계산한 것과 비교해봐도 정확했습니다!',
      avatar: '/img/home/tmp-review-profile/review-5.png',
    },
    {
      id: 'review-6',
      dogName: '도담이',
      guardianName: '박혜영',
      location: '셔틀랜드 쉽독',
      title: '며칠 만에 황금빛 단단한 똥이 나왔어요',
      age: { value: 1, unit: 'year' as const },
      content:
        '리포트를 받고 급여량부터 조절했어요. 이후 추천받은 식단을 참고해 모두 변경 했고요. 그랬더니 훈련 때문에 설사에 가깝던 변이 며칠 만에 황금빛 단단한 똥으로 바뀌더라고요. 이렇게 바로 결과가 보이니 신뢰가 확 갔죠!',
      avatar: '/img/home/tmp-review-profile/review-6.png',
    },
    {
      id: 'review-7',
      dogName: '카쿠',
      guardianName: '황윤희',
      location: '이탈리안 그레이 하운드',
      title: '구리축적 걱정이 해결됐어요',
      age: { value: 4, unit: 'year' as const },
      content:
        '카쿠가 구리축적 유전자를 가지고 있어서 사료 선택이 정말 까다로웠어요. 어떤 사료 회사에 구리 함량을 물어봐도 알려주지 않더라고요. 리포트에서 에너지원 구성 적절성을 자세히 분석해주시고, 현재 과다 급여하고 있다는 것도 정확히 파악해주셔서 큰 도움이 됐어요. 이제 확신을 가지고 급여량을 조절할 수 있게 됐습니다.',
      avatar: '/img/home/tmp-review-profile/review-7.png',
    },
  ];

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
        <ReviewSlider reviews={reviews} />
      </div>
    </section>
  );
};

export default ReviewSection;
