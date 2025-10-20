'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';

const PetSuitabilitySection = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const response = useRatingStore((s) => s.response);
  const overall = response?.overallSummary;
  const first = response?.foodRatings?.[0];
  const recommendations = first?.rating?.overallRating?.recommendations ?? [];
  const improvements = first?.rating?.overallRating?.improvements ?? [];

  // Alert 정보 활용
  const hasUrgentAlert = overall?.hasUrgentAlert ?? false;
  const hasCautionAlert = overall?.hasCautionAlert ?? false;

  // Alert 레벨에 따른 이모지와 텍스트 결정
  const getAlertInfo = () => {
    if (hasUrgentAlert) {
      return {
        emoji: '🚨',
        title: '즉시 개선이 필요한 심각한 문제',
        description: null
      };
    } else if (hasCautionAlert) {
      return {
        emoji: '⚠️',
        title: '장기적으로 문제가 될 수 있는 잠재적 위험',
        description: null
      };
    } else {
      return {
        emoji: '🤔',
        title: '최적화를 위한 개선 포인트 발견',
        description: null // 점검 상태에서는 설명 텍스트 없음
      };
    }
  };

  const alertInfo = getAlertInfo();

  // 플로팅 버튼 토글 함수
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Survey 페이지로 이동하는 함수
  const handleLearnMore = () => {
    router.push('/survey');
  };

  // const petName = useMemo(() => {
  //   const name = dog?.name || '반려견';
  //   return name;
  // }, [dog?.name]);

  // const headerTitle = useMemo(() => {
  //   return `그래서 이 사료,\n${petName}에게 잘 맞을까?`;
  // }, [petName]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 플로팅 버튼 */}
      <div className="flex justify-center px-4 pb-4">
        <button
          onClick={toggleExpanded}
          className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
        >
          <span className="text-2xl">{alertInfo.emoji}</span>
          <span className="font-semibold text-sm">{alertInfo.title}</span>
          <span className="text-lg transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
      </div>

      {/* 확장된 내용 */}
      {isExpanded && (
        <div className="bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-[1008px] mx-auto px-[20px] sm:px-[40px] md:px-[64px] py-[30px] sm:py-[45px] md:py-[64.5px]">
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
                  <div className="text-[30px] sm:text-[35px] md:text-[40px] mb-[5px]">{alertInfo.emoji}</div>
                  <div className="text-[#DA0E0E] font-semibold text-[20px] leading-[26px] mb-[10px] sm:mb-[18px] md:mb-[21px]">
                    {alertInfo.title}
                  </div>
                  {alertInfo.description && (
                    <div className="text-[#666666] text-[14px] leading-[20px] mb-[15px]">
                      {alertInfo.description}
                    </div>
                  )}
                  {/* 데스크톱에서만 버튼 표시 */}
                  <div className="hidden md:flex justify-center">
                    <button
                      onClick={handleLearnMore}
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-[20px] sm:px-[24px] md:px-8 py-[10px] sm:py-[12px] md:py-3 rounded-[40px] sm:rounded-[45px] md:rounded-[50px] font-semibold text-[14px] sm:text-[15px] md:text-[16px] transition-colors"
                    >
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
                <button
                  onClick={handleLearnMore}
                  className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white py-[12px] rounded-[30px] font-semibold text-[16px] transition-colors"
                >
                  자세히 알아보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetSuitabilitySection;
