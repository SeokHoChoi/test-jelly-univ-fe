import Link from 'next/link';
import Button from '@/components/common/Button';

const AdBanner = () => {
  return (
    <section
      className="relative overflow-hidden w-full aspect-[375/364] md:aspect-[1280/568]"
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-[22px] md:text-[40px] font-bold text-[#FFFFFF] mb-8 md:mb-14 leading-tight">
          수많은 광고와 광고 속<br />
          믿을 수 있는 선택이 필요하다면
        </h2>

        <p className="text-[22px] md:text-[40px] font-bold text-[#FFFFFF] mb-[30px] md:mb-[60px]">
          지금 바로 식단 분석을 시작해보세요!
        </p>

        <Button
          size="lg"
          className="bg-[#003DA5] hover:bg-[#002A7A] text-[#FFFFFF] font-bold text-[15px] md:text-[20px] rounded-[12px] w-[170px] h-[50px] md:w-[205px] md:h-[57px]"
        >
          <Link href="/product-analysis">30초 만에 분석하기</Link>
        </Button>
      </div>
    </section>
  );
};

export default AdBanner;
