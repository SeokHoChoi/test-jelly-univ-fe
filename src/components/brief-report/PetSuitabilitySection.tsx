'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';
import { Check, ChevronDown } from 'lucide-react';
import {
  ALERT_MESSAGES,
  formatAlertMessage,
  type AlertMessageKey,
  type AlertLevel
} from '@/constants/alert-messages';

const PetSuitabilitySection = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const response = useRatingStore((s) => s.response);
  const overall = response?.overallSummary;
  const first = response?.foodRatings?.[0];
  const dogInfo = response?.dogInfo;

  // Alert 정보 활용 - 새로운 시스템 사용
  const alertLevel = first?.rating?.alertLevel;
  const alertMessageKey = first?.rating?.alertMessageKey as AlertMessageKey;
  const alertDetails = first?.rating?.alertDetails;

  // Alert 메시지 생성
  const getAlertInfo = () => {
    if (alertMessageKey && ALERT_MESSAGES[alertMessageKey]) {
      const alertMessage = ALERT_MESSAGES[alertMessageKey];

      // 변수 준비
      const variables = {
        dogName: dogInfo?.name || '반려견',
        dogAge: dogInfo?.age ? parseInt(dogInfo.age) : undefined,
        feedName: first?.foodInfo ? `${first.foodInfo.brandName} ${first.foodInfo.productName}`.trim() : undefined,
        ...alertDetails
      };

      // 포맷팅된 메시지 생성
      const formattedMessage = formatAlertMessage(alertMessageKey, variables);

      return {
        emoji: alertMessage.icon,
        title: alertMessage.title,
        description: formattedMessage,
        level: alertLevel
      };
    }

    // 기존 fallback 로직 (alertMessageKey가 없는 경우)
    const hasUrgentAlert = overall?.hasUrgentAlert ?? false;
    const hasCautionAlert = overall?.hasCautionAlert ?? false;

    if (hasUrgentAlert) {
      return {
        emoji: '🚨',
        title: '즉시 개선이 필요한 심각한 문제',
        description: null,
        level: 'urgent' as AlertLevel
      };
    } else if (hasCautionAlert) {
      return {
        emoji: '⚠️',
        title: '장기적으로 문제가 될 수 있는 잠재적 위험',
        description: null,
        level: 'caution' as AlertLevel
      };
    } else {
      return {
        emoji: '🤔',
        title: '최적화를 위한 개선 포인트 발견',
        description: null,
        level: 'checkup' as AlertLevel
      };
    }
  };

  const alertInfo = getAlertInfo();

  // 플로팅 버튼 토글 함수
  const toggleExpanded = () => {
    if (isExpanded) {
      // 닫기 애니메이션
      setIsAnimating(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsAnimating(false);
      }, 300);
    } else {
      // 열기
      setIsExpanded(true);
    }
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
      {!isExpanded ? (
        // 닫혀있을 때: 파란 버튼 (이전 스타일)
        <div
          className="flex justify-center"
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <button
            onClick={toggleExpanded}
            className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center relative overflow-hidden"
            style={{
              animation: 'gentlePulse 4s ease-in-out infinite'
            }}
          >
            {/* 은은한 반짝이 효과 */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                backgroundSize: '300% 100%',
                animation: 'shimmer 6s linear infinite'
              }}
            />
            <span className="text-2xl relative z-10">{alertInfo.emoji}</span>
            <span className="font-semibold text-sm relative z-10">{alertInfo.title}</span>
            <span className="text-lg transition-transform duration-300 relative z-10" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </button>
        </div>
      ) : (
        // 열렸을 때: 현재 UI (토스 스타일) - 애니메이션 포함
        <div
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          style={{
            animation: isAnimating ? 'fadeOut 0.3s ease-in-out' : 'slideUp 0.4s ease-out'
          }}
        >
          {/* 카드 헤더 */}
          <div className="p-2 pt-8 text-center">
            <div className="text-2xl mb-2">{alertInfo.emoji}</div>
            <h3 className="text-red-600 font-bold text-lg mb-2">
              {alertInfo.title}
            </h3>

            {/* 더 자세히 보기 버튼 */}
            <button
              onClick={toggleExpanded}
              className="text-gray-600 text-sm hover:text-gray-800 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              요약보기
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* 확장된 내용 - 애니메이션 */}
          <div className="bg-white py-6 px-8 space-y-3">
            {/* 새로운 Alert 메시지 시스템 사용 */}
            {alertInfo.description ? (
              // 새로운 Alert 메시지가 있는 경우
              <div
                className="flex items-start gap-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out 0.2s both`
                }}
              >
                <span className="text-transparent text-sm mt-0.5 w-4 flex-shrink-0">•</span>
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {alertInfo.description}
                </div>
              </div>
            ) : (
              // 기존 fallback 로직 (recommendations, improvements 등)
              <>
                {(() => {
                  const recommendations = first?.rating?.overallRating?.recommendations ?? [];
                  const improvements = first?.rating?.overallRating?.improvements ?? [];
                  const summary = overall?.summary;

                  const fallbackTexts = recommendations.length > 0
                    ? recommendations
                    : improvements.length > 0
                      ? improvements
                      : summary ? [summary] : [];

                  return fallbackTexts.map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${idx * 0.1 + 0.2}s both`
                      }}
                    >
                      <Check className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ));
                })()}
              </>
            )}

            {/* 면책 조항 - 애니메이션 */}
            <div
              className="flex items-start gap-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${(() => {
                  if (alertInfo.description) return 0.4;
                  const recommendations = first?.rating?.overallRating?.recommendations ?? [];
                  const improvements = first?.rating?.overallRating?.improvements ?? [];
                  const summary = overall?.summary;
                  const fallbackTexts = recommendations.length > 0
                    ? recommendations
                    : improvements.length > 0
                      ? improvements
                      : summary ? [summary] : [];
                  return fallbackTexts.length * 0.1 + 0.4;
                })()}s both`
              }}
            >
              <span className="text-transparent text-sm mt-0.5 w-4 flex-shrink-0">*</span>
              <p className="text-gray-500 text-xs leading-relaxed">
                *위 결과는 추가적인 반려동물 정보에 따라 달라질 수 있습니다.
              </p>
            </div>

            {/* 액션 버튼 - 애니메이션 */}
            <div
              className="pt-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${(() => {
                  if (alertInfo.description) return 0.6;
                  const recommendations = first?.rating?.overallRating?.recommendations ?? [];
                  const improvements = first?.rating?.overallRating?.improvements ?? [];
                  const summary = overall?.summary;
                  const fallbackTexts = recommendations.length > 0
                    ? recommendations
                    : improvements.length > 0
                      ? improvements
                      : summary ? [summary] : [];
                  return fallbackTexts.length * 0.1 + 0.6;
                })()}s both`
              }}
            >
              <button
                onClick={handleLearnMore}
                className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white py-4 rounded-[50px] font-semibold text-base transition-colors"
              >
                내 아이 식단 분석하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetSuitabilitySection;
