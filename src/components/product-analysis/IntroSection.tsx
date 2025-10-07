import Text from '@/components/common/Text';

const IntroSection = () => {
  return (
    <section className="bg-brand-blue-light py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Text variant="caption" className="text-brand-blue mb-4">
          현재 급여 제품 분석
        </Text>

        <Text variant="title" className="mb-6 text-gray-900">
          내가 먹이는 이 사료, 정말 믿고 먹일 수 있을까요?
        </Text>

        <Text variant="subtitle" className="text-gray-700 max-w-3xl mx-auto">
          서울대·한국수의영양학회 임원 수의사 함께 설계한 AI가 30초 만에 분석해드려요!
        </Text>
      </div>
    </section>
  );
};

export default IntroSection;
