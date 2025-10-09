import Link from 'next/link';
import Button from '@/components/common/Button';

const AdBanner = () => {
  return (
    <section
      className="relative overflow-hidden w-full aspect-[327/204] md:aspect-[1280/568]"
      style={{
        backgroundImage: 'url(/img/home/ad-banner-mobile.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 데스크탑 배경 이미지 */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: 'url(/img/home/ad-banner-desktop.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          수많은 광고와 광고 속 믿을 수 있는 선택이 필요하다면
        </h2>

        <p className="text-xl md:text-2xl text-white mb-10 opacity-90">
          지금 바로 식단 분석을 시작해보세요!
        </p>

        <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
          <Link href="/product-analysis">30초 만에 분석하기</Link>
        </Button>
      </div>
    </section>
  );
};

export default AdBanner;
