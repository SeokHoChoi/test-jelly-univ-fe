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
    <div className="fixed bottom-4 left-4 right-4 z-50">
      {/* 위기 문구 카드 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* 카드 헤더 */}
        <div className="p-4 text-center">
          <div className="text-2xl mb-2">{alertInfo.emoji}</div>
          <h3 className="text-red-600 font-bold text-lg mb-2">
            {alertInfo.title}
          </h3>
          
          {/* 기본 내용 (항상 표시) */}
          <div className="text-gray-700 text-sm mb-3">
            {(recommendations.length > 0 ? recommendations : improvements.length > 0 ? improvements : [overall?.summary].filter(Boolean))[0]}
          </div>

          {/* 더 자세히 보기 버튼 */}
          <button
            onClick={toggleExpanded}
            className="text-gray-600 text-sm hover:text-gray-800 transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            더 자세히 보기
            <span className={`text-xs transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        {/* 확장된 내용 */}
        {isExpanded && (
          <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
            {/* 추가 상세 내용 */}
            {(recommendations.length > 0 ? recommendations : improvements.length > 0 ? improvements : [overall?.summary].filter(Boolean)).slice(1).map((text, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-gray-500 text-sm mt-0.5 flex-shrink-0">✓</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
            
            {/* 면책 조항 */}
            <div className="flex items-start gap-2">
              <span className="text-transparent text-sm mt-0.5 w-4 flex-shrink-0">*</span>
              <p className="text-gray-500 text-xs leading-relaxed">
                *위 결과는 추가적인 반려동물 정보에 따라 달라질 수 있습니다.
              </p>
            </div>

            {/* 액션 버튼 */}
            <div className="pt-2">
              <button
                onClick={handleLearnMore}
                className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white py-3 rounded-xl font-semibold text-base transition-colors"
              >
                내 맞춤 식단 확인하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetSuitabilitySection;
