import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-brand-blue-light to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Text variant="title" className="mb-6 text-gray-900">
            서울대·한국수의영양학회 임원 수의사가 검증한<br />
            반려동물 맞춤 식단 솔루션
          </Text>

          <Text variant="body" className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            사료부터 영양제까지 교수의학 데이터로 우리 아이에게 맞는 제품인지 비교 분석해드립니다
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              <Link href="/product-analysis">무료로 시작하기</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/home">더 알아보기 →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
