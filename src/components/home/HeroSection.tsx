import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            서울대·한국수의영양학회 임원 수의사가 검증한<br />
            반려동물 맞춤 식단 솔루션
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            사료부터 영양제까지 교수의학 데이터로 우리 아이에게 맞는 제품인지 비교 분석해드립니다
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <Button
              variant="hero-primary"
              size="hero"
              className="flex-1 sm:w-auto"
            >
              <Link href="/product-analysis">무료로 시작하기</Link>
            </Button>
            <Button
              variant="hero-secondary"
              size="hero"
              className="flex-1 sm:w-auto"
            >
              <Link href="#service">더 알아보기 →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
