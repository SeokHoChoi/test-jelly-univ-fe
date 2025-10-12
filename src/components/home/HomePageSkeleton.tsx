const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton - 정확한 구조로 */}
      <section className="relative py-16 md:py-24" style={{
        background: 'linear-gradient(to top, rgba(0, 61, 165, 0.5) 0%, rgba(121, 151, 203, 0.3) 50%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0) 90%, transparent 100%)'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 메인 타이틀 */}
            <div className="mb-6">
              <div className="block md:hidden">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="hidden md:block">
                <div className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* 서브 타이틀 */}
            <div className="my-[30px] md:my-[45px] max-w-4xl mx-auto">
              <div className="h-4 md:h-7 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 md:h-7 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto px-[61.5px] sm:px-0 mb-[30px] md:mb-[45px]">
              <div className="h-12 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
            </div>

            {/* 하단 텍스트 */}
            <div className="h-3 md:h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* 하단 데코레이션 이미지 스켈레톤 */}
        <div className="w-full flex justify-center -mb-16 md:-mb-24">
          <div className="block md:hidden">
            <div className="w-[327px] h-[100px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="hidden md:block">
            <div className="w-[922px] h-[200px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Article Section Skeleton - 정확한 구조로 */}
      <section id="service" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-18">
            <div className="h-4 md:h-5 bg-gray-200 rounded mb-[15px] md:mb-[20px] w-24 mx-auto animate-pulse"></div>
            <div className="h-6 md:h-11 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-6 md:h-11 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border-0 shadow-none">
                {/* 이미지 */}
                <div className="mb-6 md:mb-8">
                  <div className="block md:hidden">
                    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* 제목 */}
                <div className="h-6 md:h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>

                {/* 설명 */}
                <div className="space-y-2">
                  <div className="h-4 md:h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 md:h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 md:h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Section Skeleton - 정확한 구조로 */}
      <section id="plans" className="bg-[#F8F8F8] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-18">
            <div className="h-4 md:h-5 bg-gray-200 rounded mb-[15px] md:mb-[20px] w-20 mx-auto animate-pulse"></div>
            <div className="h-6 md:h-11 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-6 md:h-11 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* FREE CARD */}
          <div className="mb-10 md:mb-12 border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] md:px-[94.5px] py-[24px] bg-white rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-[30px]">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="h-6 md:h-8 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="space-y-[6px] md:space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-[6px] md:gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <div className="h-12 bg-gray-200 rounded-lg w-full md:w-[199px] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* PAID CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((index) => (
              <div key={index} className="relative border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px] bg-white rounded-lg">
                {/* 할인 배지 */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-200 text-white px-4 py-2 rounded-full h-8 w-20 animate-pulse"></div>
                </div>

                {/* 제목과 가격 */}
                <div className="text-left mb-8">
                  <div className="h-6 md:h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 md:h-5 bg-gray-200 rounded mb-6 w-3/4 animate-pulse"></div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <div className="h-10 md:h-14 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 md:h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>

                {/* 기능 리스트 */}
                <div className="space-y-[6px] md:space-y-2 mb-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-[6px] md:gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 animate-pulse"></div>
                      <div className="h-4 md:h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* 버튼 */}
                <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section Skeleton - 정확한 구조로 */}
      <section id="reviews" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-18">
            <div className="h-4 md:h-5 bg-gray-200 rounded mb-[15px] md:mb-[20px] w-20 mx-auto animate-pulse"></div>
            <div className="h-6 md:h-11 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* 슬라이더 스켈레톤 */}
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-white rounded-lg p-8 shadow-sm border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-5 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner Skeleton - 정확한 구조로 */}
      <section className="relative overflow-hidden w-full aspect-[375/364] md:aspect-[1280/568]">
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="h-6 md:h-10 bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="h-6 md:h-10 bg-gray-300 rounded mb-8 md:mb-14 animate-pulse"></div>
          <div className="h-6 md:h-10 bg-gray-300 rounded mb-[30px] md:mb-[60px] animate-pulse"></div>
          <div className="h-12 md:h-14 bg-gray-300 rounded w-[170px] md:w-[205px] animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSkeleton;