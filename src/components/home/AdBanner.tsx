import Link from 'next/link';
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

        <Link
          href="/product-analysis"
          className="inline-flex items-center justify-center rounded-[12px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] hover:bg-[#002A7A] text-[#FFFFFF] text-[15px] md:text-[20px] w-[170px] h-[50px] md:w-[205px] md:h-[57px]"
        >
          30초 만에 분석하기
        </Link>
      </div>
    </section>
  );
};

export default AdBanner;
