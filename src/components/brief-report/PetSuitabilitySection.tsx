'use client';

// import { useMemo } from 'react';
import { useRatingStore } from '@/contexts/RatingStore';

const PetSuitabilitySection = () => {
  const response = useRatingStore((s) => s.response);
  // const dog = response?.dogInfo;
  const overall = response?.overallSummary;
  const first = response?.foodRatings?.[0];
  const recommendations = first?.rating?.overallRating?.recommendations ?? [];
  const improvements = first?.rating?.overallRating?.improvements ?? [];

  // 가중 평균 점수를 우선 사용, 없으면 기존 점수 사용
  // const badge = first?.rating?.overallRatingWeighted?.badge ?? first?.rating?.overallRating?.badge ?? overall?.badge;
  // const score = first?.rating?.overallRatingWeighted?.score ?? first?.rating?.overallRating?.score ?? overall?.score;

  // Alert 정보 활용
  // const alertLevel = first?.rating?.alertLevel;
  // const alertMessageKey = first?.rating?.alertMessageKey;
  // const alertSeverity = first?.rating?.alertSeverity;
  // const alertCategory = first?.rating?.alertCategory;
  const hasUrgentAlert = overall?.hasUrgentAlert ?? false;
  const hasCautionAlert = overall?.hasCautionAlert ?? false;

  // const petName = useMemo(() => {
  //   const name = dog?.name || '반려견';
  //   return name;
  // }, [dog?.name]);

  // const headerTitle = useMemo(() => {
  //   return `그래서 이 사료,\n${petName}에게 잘 맞을까?`;
  // }, [petName]);

  return (
    <section id="pet-suitability" className="pt-[30px] pb-[40px] sm:pt-[45px] sm:pb-[60px] md:pt-[64.5px] md:pb-[93.5px] px-[20px] sm:px-[40px] md:px-[64px]">
      <div className="max-w-[1008px] mx-auto">
        {/* 하얀 박스 */}
        <div
          className="bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] py-[20px] sm:py-[23px] md:py-[26px] px-[15px] sm:px-[20px] md:px-0"
          style={{
            boxShadow: '10px 5px 30px 0px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] sm:gap-[40px] md:gap-[52px] max-w-4xl mx-auto">
            {/* 왼쪽: 경고 영역 */}
            <div className="text-center w-full sm:w-[280px] md:w-[300px] flex-shrink-0">
              <div className="text-[30px] sm:text-[35px] md:text-[40px] mb-[5px]">🤯</div>
              <div className="text-[#DA0E0E] font-semibold text-[20px] leading-[26px] mb-[10px] sm:mb-[18px] md:mb-[21px]">
                {hasUrgentAlert
                  ? '즉시 개선이 필요한 사항이 있습니다!'
                  : hasCautionAlert
                    ? '주의가 필요한 사항이 있습니다.'
                    : overall?.recommendedAction || '권장 조치를 확인해 주세요.'}
              </div>
              {/* 데스크톱에서만 버튼 표시 */}
              <div className="hidden md:flex justify-center">
                <button className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-[20px] sm:px-[24px] md:px-8 py-[10px] sm:py-[12px] md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold text-[14px] sm:text-[15px] md:text-[16px] transition-colors">
                  자세히 알아보기
                </button>
              </div>
            </div>

            {/* 오른쪽: 상세 분석 */}
            <div className="space-y-[8px] sm:space-y-[10px] md:space-y-2 w-full sm:w-[350px] md:w-auto">
              {(recommendations.length > 0 ? recommendations : improvements.length > 0 ? improvements : [overall?.summary].filter(Boolean)).map((text, idx) => (
                <div key={idx} className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                  <span className="text-[#525252] text-[14px] sm:text-[16px] md:text-[18px] mt-1 flex-shrink-0">✓</span>
                  <p className="text-[#525252] font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
              <div className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                <span className="text-transparent text-[14px] sm:text-[16px] md:text-[18px] mt-1 w-[14px] sm:w-[16px] md:w-[18px] flex-shrink-0">*</span>
                <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed">
                  *위 결과는 추가적인 반려동물 정보에 따라 달라질 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 모바일에서만 표시되는 버튼 - 하얀 카드를 꽉 채움 */}
          <div className="md:hidden mt-14">
            <button className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white py-[12px] rounded-[30px] font-semibold text-[16px] transition-colors">
              자세히 알아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetSuitabilitySection;
