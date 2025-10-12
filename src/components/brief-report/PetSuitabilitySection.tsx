'use client';

const PetSuitabilitySection = () => {
  return (
    <section id="pet-suitability" className="bg-[#003DA5] pt-[40px] sm:pt-[60px] md:pt-[93.5px] pb-[30px] sm:pb-[45px] md:pb-[64.5px] px-[20px] sm:px-[40px] md:px-[64px]">
      <div className="max-w-7xl mx-auto">
        {/* 메인 제목 */}
        <div className="text-center mb-[30px] sm:mb-[45px] md:mb-[62px]">
          <h1 className="text-[#F2F2F2] font-medium text-[16px] sm:text-[18px] md:text-[20px] mb-[15px] sm:mb-[18px] md:mb-[20px]">
            냥구의 맞춤 식단 분석
          </h1>
          <h2 className="text-[#FFFFFF] font-medium text-[24px] sm:text-[32px] md:text-[45px] mb-[24px] sm:mb-[36px] md:mb-[48px]">
            그래서 이 사료,<br className="sm:hidden" />
            냥구에게 잘 맞을까?
          </h2>
          <p className="text-[#F2F2F2] font-normal text-[16px] sm:text-[20px] md:text-[25px] max-w-4xl mx-auto leading-relaxed px-[10px] sm:px-[20px]">
            급여 중인 사료가 냥구의 현재 건강 상태와<br className="sm:hidden" />
            필요 영양에 부합하는지, 그리고<br className="sm:hidden" />
            현재 급여 방식이 적절한지<br className="sm:hidden" />
            최종적으로 진단하고 해결책을 제시해 드려요!<br className="sm:hidden" />
            <span className="hidden sm:inline">
              급여 중인 사료가 냥구의 현재 건강 상태와 필요 영양에 부합하는지, 그리고 현재 급여 방식이 적절한지 최종적으로 진단하고 해결책을 제시해 드려요!
            </span>
          </p>
        </div>

        {/* 하얀 박스 */}
        <div className="bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] py-[20px] sm:py-[23px] md:py-[26px] px-[15px] sm:px-[20px] md:px-0">
          <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] sm:gap-[40px] md:gap-[52px] max-w-4xl mx-auto">
            {/* 왼쪽: 경고 영역 */}
            <div className="text-center w-full sm:w-[280px] md:w-[300px] flex-shrink-0">
              <div className="text-[30px] sm:text-[35px] md:text-[40px] mb-[5px]">🤯</div>
              <div className="text-[#DA0E0E] font-medium text-[16px] sm:text-[18px] md:text-[20px] leading-[20px] sm:leading-[23px] md:leading-[26px] mb-[20px] sm:mb-[22px] md:mb-[25px]">
                즉각적인 개선이 필요한<br />
                심각한 문제가 발견됐어요!
              </div>
              <button className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-[20px] sm:px-[24px] md:px-8 py-[10px] sm:py-[12px] md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold text-[14px] sm:text-[15px] md:text-[16px] transition-colors">
                더 알아보기 →
              </button>
            </div>

            {/* 오른쪽: 상세 분석 */}
            <div className="space-y-[8px] sm:space-y-[10px] md:space-y-2 w-full sm:w-[350px] md:w-auto">
              <div className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                <span className="text-[#525252] text-[14px] sm:text-[16px] md:text-[18px] mt-1 flex-shrink-0">✓</span>
                <p className="text-[#525252] font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
                  냥구에게는 생명 유지에 필요한 최소 에너지조차 공급되지 않고 있어요.
                </p>
              </div>
              <div className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                <span className="text-[#525252] text-[14px] sm:text-[16px] md:text-[18px] mt-1 flex-shrink-0">✓</span>
                <p className="text-[#525252] font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
                  현재 급여량은 하루 최소치의 00%에 불과한 매우 위험한 상태에요.
                </p>
              </div>
              <div className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                <span className="text-[#525252] text-[14px] sm:text-[16px] md:text-[18px] mt-1 flex-shrink-0">✓</span>
                <p className="text-[#525252] font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
                  이 상태가 지속될 경우, 부족한 에너지를 충당하기 위해 체지방뿐만 아니라 근육을 분해하게 됩니다. 이는 슬개골을 지지해야 할 다리 근육을 악화 시켜 관절 문제 악화의 직접적인 원인이 될 수 있으며, 장기적으로는 기초대사량 저하와 활력 저하를 유발할 수 있습니다.
                </p>
              </div>
              <div className="flex items-start gap-[12px] sm:gap-[14px] md:gap-3">
                <span className="text-transparent text-[14px] sm:text-[16px] md:text-[18px] mt-1 w-[14px] sm:w-[16px] md:w-[18px] flex-shrink-0">*</span>
                <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed">
                  *위 결과는 추가적인 반려동물 정보에 따라 달라질 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetSuitabilitySection;
