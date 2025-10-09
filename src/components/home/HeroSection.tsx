import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24" style={{
      background: 'linear-gradient(to top, rgba(0, 61, 165, 0.5) 0%, rgba(121, 151, 203, 0.3) 50%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0) 90%, transparent 100%)'
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-[25px] md:text-[50px] font-medium text-[#1E1E1E] mb-6 leading-tight text-center">
            <span className="block md:hidden">
              서울대·한국수의영양학회<br />
              임원 수의사가 검증한<br />
              반려동물 맞춤 식단 솔루션
            </span>
            <span className="hidden md:block">
              서울대·한국수의영양학회 임원 수의사가<br />
              검증한 반려동물 맞춤 식단 솔루션
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            사료부터 영양제까지 교수의학 데이터로 우리 아이에게 맞는 제품인지 비교 분석해드립니다
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto px-[61.5px] sm:px-0">
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
