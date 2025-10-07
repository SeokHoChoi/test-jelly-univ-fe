import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';

const AdBanner = () => {
  return (
    <section className="relative py-12 md:py-20">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-90">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-dark opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Text variant="title" className="text-white mb-4">
          수많은 광고와 광고 속 믿을 수 있는 선택이 필요하다면
        </Text>

        <Text variant="subtitle" className="text-white mb-8">
          지금 바로 식단 분석을 시작해보세요!
        </Text>

        <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
          <Link href="/product-analysis">30초 만에 분석하기</Link>
        </Button>
      </div>
    </section>
  );
};

export default AdBanner;
