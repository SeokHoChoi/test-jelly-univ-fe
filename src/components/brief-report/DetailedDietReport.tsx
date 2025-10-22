'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReportCard from '@/components/common/ReportCard';
import ReportCardHeader from '@/components/common/ReportCardHeader';
import ReportCardContent from '@/components/common/ReportCardContent';
import NutrientAnalysisPanel from '@/components/common/NutrientAnalysisPanel';
import NutrientItem from '@/components/common/NutrientItem';
import StatusIndicator from '@/components/common/StatusIndicator';

// 모바일 버튼 컴포넌트
const MobileButton = ({
  text,
  variant = 'blue'
}: {
  text: string;
  variant?: 'blue' | 'white' | 'yellow';
}) => {
  const router = useRouter();

  const getButtonStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#003DA5] text-white';
      case 'white':
        return 'bg-white text-[#003DA5]';
      case 'yellow':
        return 'bg-[#FFC466] text-[#343434]';
      default:
        return 'bg-[#003DA5] text-white';
    }
  };

  const handleClick = () => {
    router.push('/survey');
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-[20px] rounded-[50px] font-medium text-[15px] ${getButtonStyles()} md:hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
    >
      {text}
    </button>
  );
};

// 데스크탑 플로팅 버튼 컴포넌트
const DesktopFloatingButton = ({
  text,
  variant = 'blue',
  className = ''
}: {
  text: string;
  variant?: 'blue' | 'white' | 'yellow';
  className?: string;
}) => {
  const router = useRouter();

  const getButtonStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#003DA5] text-white';
      case 'white':
        return 'bg-white text-[#003DA5]';
      case 'yellow':
        return 'bg-[#FFC466] text-[#343434]';
      default:
        return 'bg-[#003DA5] text-white';
    }
  };

  const handleClick = () => {
    router.push('/survey');
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-[50px] font-medium text-[15px] ${getButtonStyles()} hidden md:block shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center ${className}`}
    >
      {text}
    </button>
  );
};

// 조건부 버튼 컴포넌트 (정보가 없을 때만 표시)
const ConditionalButton = ({
  text,
  variant = 'blue',
  className = '',
  show = true
}: {
  text: string;
  variant?: 'blue' | 'white' | 'yellow';
  className?: string;
  show?: boolean;
}) => {
  const router = useRouter();

  const getButtonStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#003DA5] text-white';
      case 'white':
        return 'bg-white text-[#003DA5]';
      case 'yellow':
        return 'bg-[#FFC466] text-[#343434]';
      default:
        return 'bg-[#003DA5] text-white';
    }
  };

  const handleClick = () => {
    router.push('/survey');
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className={`w-full py-[20px] rounded-[50px] font-medium text-[15px] ${getButtonStyles()} shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center ${className}`}
    >
      {text}
    </button>
  );
};

interface PetInfo {
  name: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  neutered: string;
  bcs: number;
  rwacome: number;
  personality: string;
  description: string;
}

interface TargetMetrics {
  rer: string;
  targetWeight: string;
  mer: string;
}

interface NutrientData {
  name: string;
  intake: string;
  protein: string;
  proteinPercent: string;
  fat: string;
  fatPercent: string;
  carbs: string;
  carbsPercent: string;
  calories: string;
  caloriesPercent: string;
}

interface RecommendedIntake {
  protein: string;
  fat: string;
  carbs: string;
  water: string;
}


interface DetailedDietReportProps {
  petInfo: PetInfo;
  targetMetrics: TargetMetrics;
  currentFoods: NutrientData[];
  recommendedIntake: RecommendedIntake;
}

const DetailedDietReport = ({
  petInfo,
  targetMetrics,
  currentFoods,
  recommendedIntake
}: DetailedDietReportProps) => {
  // RER 계산 함수: RER = 70 × (체중(kg))^0.75
  const calculateRER = (weight: string): string => {
    // "3.2kg" 형태에서 숫자만 추출
    const weightNumber = parseFloat(weight.replace('kg', ''));
    if (isNaN(weightNumber)) return '168kcal';

    const rer = 70 * Math.pow(weightNumber, 0.75);
    return `${Math.round(rer)}kcal`;
  };
  const router = useRouter();

  // Survey 상태 관리 - 개발용 토글 가능
  // TODO: 나중에 실제 survey API 응답으로 교체
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  // 개발용 토글 함수 - 나중에 제거
  const toggleSurveyStatus = () => {
    setIsSurveyCompleted(prev => !prev);
  };

  // const getStatusText = (status: string) => {
  //   switch (status) {
  //     case 'critical': return '심각';
  //     case 'warning': return '주의';
  //     case 'good': return '양호';
  //     default: return '알 수 없음';
  //   }
  // };

  return (
    <div className="bg-[#F2F2F2] min-h-screen py-6 px-4 md:py-[58px] md:px-[64px]">
      <div className="max-w-[1152px] mx-auto space-y-6">

        {/* 개발용 Survey 상태 토글 버튼 - 개발 환경에서만 표시 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
            <div className="text-sm font-medium mb-2">개발용 Survey 상태</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">Survey 완료:</span>
              <span className={`text-xs font-bold ${isSurveyCompleted ? 'text-green-600' : 'text-red-600'}`}>
                {isSurveyCompleted ? '완료' : '미완료'}
              </span>
            </div>
            <button
              onClick={toggleSurveyStatus}
              className={`w-full px-3 py-1 text-xs rounded transition-colors ${isSurveyCompleted
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
            >
              {isSurveyCompleted ? '미완료로 변경' : '완료로 변경'}
            </button>
          </div>
        )}

        {/* 헤더 섹션 - 좌측 정렬 */}
        <div className="text-left mb-8">
          {/* 맞춤 식단 분석 리포트 배지 */}
          <div className="inline-flex items-center px-4 py-3.5 bg-[#003DA5] rounded-full mb-4">
            <span className="text-white font-medium text-[15px]">맞춤 식단 분석 리포트</span>
          </div>
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-[#003DA5] mb-6">
            {petInfo.name}를 위한 현재 식단 분석 리포트
          </h1>
        </div>

        {/* 6개 카드 그리드: 가로80px, 왼쪽세로24px, 오른쪽세로35px, md:order로 순서조정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-[80px] mb-8">
          {/* 행복한 미식가 카드 - 주석처리 */}
          {/* <div className="bg-[#003DA5] rounded-[20px] pt-[46px] pb-[36px] px-[18px] text-white relative md:order-1">
            <div className="absolute -top-39 left-1/2 transform -translate-x-1/2">
              <div className="w-50 h-50 relative">
                <Image
                  src="/img/report/report-result-dog.png"
                  alt="반려동물 일러스트"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center justify-center gap-0 mb-3">
                <span className="text-2xl">🍕</span>
                <h2 className="text-[27px] font-semibold text-white ml-0">행복한 미식가</h2>
              </div>

              <div className="border-t border-[#E3E3E3] my-3"></div>

              <p className="text-[22px] font-medium text-white leading-snug px-[4px] text-center">
                맛있는 것 앞에서는 절대 양보할 수 없는 진정한 푸디<br />
                산책보다는 간식 시간이 더 설레고, 통통한 볼살이<br />
                트레이드마크인 사랑스러운 식도락가
              </p>
            </div>
          </div> */}

          {/* 냥구는요 카드 */}
          <ReportCard className="relative mt-[20px] md:mt-0 md:order-2">
            <ReportCardHeader emoji="🐾" title={`${petInfo.name}는요`} titleSize="24px" />
            <div className="mt-[35px]">
              <ReportCardContent className={!isSurveyCompleted ? 'blur-sm' : ''}>
                넘치는 에너지와 좋은 골격을 가졌지만, 현재는 몸이 조금 무거운 유망주. 전문적인 관리를 통해 최고의 컨디션을 되찾을 준비가 되어 있으며, 체중 감량과 동시에 근육량 유지가 가능한 타입입니다.
              </ReportCardContent>
              {!isSurveyCompleted && (
                <div className="mt-[28.5px] md:hidden">
                  <MobileButton text={`${petInfo.name}의 활동 수준을 알려주세요`} variant="blue" />
                </div>
              )}
            </div>
            {!isSurveyCompleted && (
              <DesktopFloatingButton
                text={`${petInfo.name}의 활동 수준을 알려주세요`}
                variant="blue"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[278px] h-[59px]"
              />
            )}
          </ReportCard>

          {/* 체중 및 신체충실도 진단 */}
          <ReportCard className="relative mt-[20px] md:mt-[24px] md:order-4">
            <ReportCardHeader emoji="📐" title="체중 및 신체충실도(BCS) 진단" titleSize="24px" />
            <div className="mt-[35px]">
              <ReportCardContent className="relative">
                <p className="mb-3 relative">
                  {petInfo.name}는 현재 {petInfo.weight}입니다. {petInfo.breed} <span className={!isSurveyCompleted ? 'blur-sm' : ''}>남아</span>의 <span className={!isSurveyCompleted ? 'blur-sm' : ''}>표준 체중(1.8~3.5kg)</span> 범위 내에 있으며,
                  보호자께서 직접 촉진(RAWSOME)하신 결과에 따르면 &apos;손을 편 손등&apos;과 유사하여 BCS <span className={!isSurveyCompleted ? 'blur-sm' : ''}>5/9</span>의 &apos;이상적인(Ideal)&apos; 상태에 해당합니다.
                  {/* 첫 번째 문단 그라데이션 블러 오버레이 - "보호자께서 직접 촉진" 이후부터 블러 */}
                  {!isSurveyCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% via-white/20 to-white/80 backdrop-blur-[1px] pointer-events-none"></div>
                  )}
                </p>
                <p className="relative">
                  현재 체중과 신체 상태는 매우 이상적입니다. 특히 슬개골 탈구가 있는 {petInfo.name}에게 이상적인 체중 유지는 관절에 가해지는 물리적 부담을 줄여주는 가장 중요한 관리법이므로, 앞으로도 꾸준히 현재 상태를 유지하는 것이 매우 중요합니다.
                  {/* 두 번째 문단 그라데이션 블러 오버레이 */}
                  {!isSurveyCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white/98 backdrop-blur-[3px] pointer-events-none"></div>
                  )}
                </p>
              </ReportCardContent>
              {!isSurveyCompleted && (
                <div className="mt-[28.5px] md:hidden">
                  <MobileButton text={`${petInfo.name}의 BCS 점수를 알려주세요`} variant="blue" />
                </div>
              )}
            </div>
            {!isSurveyCompleted && (
              <DesktopFloatingButton
                text={`${petInfo.name}의 활동 수준을 알려주세요`}
                variant="blue"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[278px] h-[59px]"
              />
            )}
          </ReportCard>

          {/* 생애주기 평가 */}
          <ReportCard className="mt-[20px] md:mt-[24px] md:order-5">
            <ReportCardHeader emoji="👧🏻" title="생애주기 평가" titleSize="24px" />
            <div className="mt-[35px]">
              <ReportCardContent className={!isSurveyCompleted ? 'blur-sm' : ''}>
                <p className="mb-3">
                  2023년 8월생으로 현재 약 1년 11개월령인 {petInfo.name}는 &apos;어린 성견(Young Adult)&apos; 단계에 있습니다.
                </p>
                <p>
                  골격 성장은 완료되어 &apos;성견&apos;의 영양 요구량을 따르지만, 활동 수준이 높은 청년기입니다. {petInfo.name}의 경우, 충분한 활력을 지원하면서도 슬개골에 부담을 주지 않도록 칼로리를 정밀하게 관리해야 하는 시기입니다.
                </p>
              </ReportCardContent>
            </div>
          </ReportCard>

          {/* 셔틀랜드 쉽독 카드 */}
          <ReportCard className="mt-[20px] md:mt-[24px] md:order-3">
            <ReportCardHeader emoji="🐶" title={`${petInfo.breed} · ${petInfo.gender}`} titleSize="24px" />
            <div className="mt-[35px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-[18px]">
                <div className="bg-[#003DA5] rounded-[20px] px-[15px] sm:px-[17px] lg:px-[19px] py-[15px] text-left sm:col-span-2 lg:col-span-1 relative h-[94px] md:h-[94px] flex flex-col justify-center">
                  <div className="space-y-[15px] sm:space-y-[17px] lg:space-y-[20px]">
                    <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">나이</p>
                    <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">
                      <span className={!isSurveyCompleted ? 'blur-sm' : ''}>
                        {petInfo.age}
                      </span>
                    </p>
                  </div>
                  {!isSurveyCompleted && (
                    <DesktopFloatingButton
                      text="생년월일 정보 필요"
                      variant="white"
                      className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-[124px] h-[36px] py-0 flex items-center justify-center text-[12px]"
                    />
                  )}
                </div>
                <div className="bg-[#003DA5] rounded-[20px] px-[15px] sm:px-[17px] lg:px-[19px] py-[15px] text-left space-y-[15px] sm:space-y-[17px] lg:space-y-[20px] h-[94px] md:h-[94px] flex flex-col justify-center">
                  <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">몸무게</p>
                  <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">{petInfo.weight}</p>
                </div>
                <div className="bg-[#003DA5] rounded-[20px] px-[15px] sm:px-[17px] lg:px-[19px] py-[15px] text-left sm:col-span-2 lg:col-span-1 relative h-[94px] md:h-[94px] flex flex-col justify-center">
                  <div className="space-y-[15px] sm:space-y-[17px] lg:space-y-[20px]">
                    <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">중성화</p>
                    <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">
                      <span className={!isSurveyCompleted ? 'blur-sm' : ''}>
                        {petInfo.neutered}
                      </span>
                    </p>
                  </div>
                  {!isSurveyCompleted && (
                    <DesktopFloatingButton
                      text="중성화 정보 필요"
                      variant="white"
                      className="absolute -bottom-[18px] left-1/2 transform -translate-x-1/2 w-[124px] h-[36px] py-0 flex items-center justify-center text-[12px]"
                    />
                  )}
                </div>
              </div>
            </div>
            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text={`${petInfo.name}의 생년월일과 중성화 정보를 알려주세요`} variant="white" />
              </div>
            )}
          </ReportCard>

          {/* BCS & RWASOME 카드 */}
          <ReportCard className="relative mt-[20px] md:mt-[24px] md:order-5 w-full md:w-[600px] h-auto md:h-[280px]">
            <div className="space-y-4">
              {/* BCS */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="flex flex-col w-[180px] flex-shrink-0">
                  <span className="text-[20px] sm:text-[22px] md:text-[25px] font-semibold text-[#1E1E1E]">BCS</span>
                  <abbr className="text-[12px] sm:text-[13px] md:text-sm text-[#1E1E1E] -mt-[6px] no-underline" title="Body Condition Score">(Body Condition Score)</abbr>
                </div>
                <div className="flex flex-col items-end">
                  {/* Progress Bar */}
                  <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[57px] bg-[#F2F2F2] rounded-[60px] overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFC466] rounded-[60px] flex items-center justify-center"
                      style={{ width: `${(petInfo.bcs / 9) * 100}%` }}
                    >
                      <span className={`text-[#010A6B] font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        {petInfo.bcs} Ideal
                      </span>
                    </div>
                  </div>
                  {/* Scale Numbers */}
                  <div className="flex justify-between w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] mt-[8px] sm:mt-[9px] md:mt-[10px] lg:mt-[11px]">
                    {[0, 2, 4, 6, 8, 9].map((num) => (
                      <span key={num} className="text-[#1E1E1E] text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] font-normal">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RWASOME */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="flex flex-col w-[180px] flex-shrink-0">
                  <span className="text-[20px] sm:text-[22px] md:text-[25px] font-semibold text-[#1E1E1E]">RWASOME</span>
                </div>
                <div className="flex flex-col items-end">
                  {/* Progress Bar */}
                  <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[57px] bg-[#F2F2F2] rounded-[60px] overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFC466] rounded-[60px] flex items-center justify-center"
                      style={{ width: `${(petInfo.rwacome / 9) * 100}%` }}
                    >
                      <span className={`text-[#010A6B] font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        {petInfo.rwacome} Ideal
                      </span>
                    </div>
                  </div>
                  {/* Scale Numbers */}
                  <div className="flex justify-between w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] mt-[8px] sm:mt-[9px] md:mt-[10px] lg:mt-[11px]">
                    {[0, 2, 4, 6, 8, 9].map((num) => (
                      <span key={num} className="text-[#1E1E1E] text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] font-normal">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text={`${petInfo.name}의 BCS 점수를 알려주세요`} variant="white" />
              </div>
            )}
            {!isSurveyCompleted && (
              <DesktopFloatingButton
                text={`${petInfo.name}의 활동 수준을 알려주세요`}
                variant="blue"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[278px] h-[59px]"
              />
            )}
          </ReportCard>
        </div>

        {/* 목표 체중과 하루 권장 칼로리 */}
        <ReportCard>
          <ReportCardHeader
            emoji="🎯"
            title={`${petInfo.name}의 목표 체중과 하루 권장 칼로리`}
            subtitle="현재 신체 상태를 과학적으로 분석하여, 수의영양학 기준 목표 체중과 하루 목표 섭취 칼로리를 제시해드려요!"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[35px]">

            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-[37px]">
              <div className="bg-[#FFC466] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] pl-[20px] sm:pl-[22px] lg:pl-[25px] pr-[66px] text-left flex-shrink-0 w-full sm:w-[325px]">
                <ReportCardHeader
                  emoji="😴"
                  title="휴식 대사량(RER)"
                  subtitle="Resting Energy Requirement"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="16px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px]">
                  <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">{calculateRER(petInfo.weight)}</p>
                </div>
              </div>
              <div className="bg-[#FFC466] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] px-[20px] sm:px-[22px] lg:px-[25px] text-left flex-shrink-0 w-full sm:w-[284px] flex flex-col">
                <ReportCardHeader
                  emoji="⚓️"
                  title="목표 체중"
                  subtitle="현재의 이상적인 체중을 유지"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="16px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                {/* 모바일에서는 수치 표시, 데스크탑에서는 survey 완료 상태에 따라 조건부 표시 */}
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px] md:hidden">
                  <p className={`text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    {targetMetrics.targetWeight}
                  </p>
                </div>
                {/* TODO: 데스크탑에서 survey 완료 상태에 따라 조건부 표시 */}
                {isSurveyCompleted && (
                  <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px] hidden md:block">
                    <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">
                      {targetMetrics.targetWeight}
                    </p>
                  </div>
                )}
                <div className="mt-auto hidden md:block">
                  <ConditionalButton
                    text="BCS 점수가 필요해요"
                    variant="blue"
                    show={!isSurveyCompleted} // TODO: survey 완료 상태에 따라 조건부 표시
                  />
                </div>
              </div>
              <div className="bg-[#FFC466] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] px-[20px] sm:px-[22px] lg:px-[25px] text-left flex-shrink-0 w-full sm:w-[397px] flex flex-col">
                <ReportCardHeader
                  emoji="🔥️"
                  title="1일 권장 칼로리(MER)"
                  subtitle="Recommeded Daily Enegy Requirement"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="16px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                {/* 모바일에서는 수치 표시, 데스크탑에서는 survey 완료 상태에 따라 조건부 표시 */}
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px] md:hidden">
                  <p className={`text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    {targetMetrics.mer}
                  </p>
                </div>
                {/* TODO: 데스크탑에서 survey 완료 상태에 따라 조건부 표시 */}
                {isSurveyCompleted && (
                  <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px] hidden md:block">
                    <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">
                      {targetMetrics.mer}
                    </p>
                  </div>
                )}
                <div className="mt-auto hidden md:block">
                  <ConditionalButton
                    text={`${petInfo.name}의 중성화 여부와 활동 수준 정보가 필요해요`}
                    variant="blue"
                    show={!isSurveyCompleted} // TODO: survey 완료 상태에 따라 조건부 표시
                  />
                </div>
              </div>
            </div>
            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text={`${petInfo.name}의 BCS ∙ 중성화 ∙ 활동수준 정보를 알려주세요`} variant="white" />
              </div>
            )}
          </div>
        </ReportCard>

        {/* 현재 식단의 주요 영양소 함량 분석 */}
        <ReportCard backgroundColor="#F4F4F4">
          <ReportCardHeader
            emoji="⚖️"
            title="현재 식단의 주요 영양소 함량 분석"
            subtitle="제품 라벨에서는 알려주지 않는 각 제품의 섭취량과 칼로리에 따른 단백질, 지방 그리고 탄수화물의 함량을 자세히 파악해요! (AS FED 기준)"
            subtitleColor="#525252"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[30px] sm:mt-[45px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-start">
              {/* 섭취량(g) 패널 */}
              <NutrientAnalysisPanel
                title="섭취량(g)"
                backgroundColor="#FFB800"
                textColor="#343434"
              >
                <div className="space-y-[8px] sm:space-y-[10px]">
                  {currentFoods.map((food, index) => (
                    <NutrientItem
                      key={index}
                      name={food.name}
                      value={food.intake}
                      type="simple"
                    />
                  ))}
                </div>
              </NutrientAnalysisPanel>

              {/* 칼로리(kcal) 패널 */}
              <NutrientAnalysisPanel
                title="칼로리(kcal)"
                backgroundColor="#FFB800"
                textColor="#343434"
              >
                <div className="space-y-[8px] sm:space-y-[10px]">
                  {currentFoods.map((food, index) => (
                    <NutrientItem
                      key={index}
                      name={food.name}
                      value={food.calories}
                      type="simple"
                    />
                  ))}
                </div>
              </NutrientAnalysisPanel>

              {/* 단백질 함량(g) 패널 */}
              <NutrientAnalysisPanel
                title="단백질 함량(g)"
                backgroundColor="#F7623E"
                textColor="#FFFFFF"
              >
                <div className="space-y-[8px] sm:space-y-[10px]">
                  {currentFoods.map((food, index) => (
                    <NutrientItem
                      key={index}
                      name={food.name}
                      value={food.protein}
                      percentage={food.proteinPercent}
                      type="complex"
                    />
                  ))}
                </div>
              </NutrientAnalysisPanel>

              {/* 지방 함량(g) 패널 */}
              <NutrientAnalysisPanel
                title="지방 함량(g)"
                backgroundColor="#F7623E"
                textColor="#FFFFFF"
              >
                <div className="space-y-[8px] sm:space-y-[10px]">
                  {currentFoods.map((food, index) => (
                    <NutrientItem
                      key={index}
                      name={food.name}
                      value={food.fat}
                      percentage={food.fatPercent}
                      type="complex"
                    />
                  ))}
                </div>
              </NutrientAnalysisPanel>

              {/* 탄수화물 함량(g) 패널 */}
              <NutrientAnalysisPanel
                title="탄수화물 함량(g)"
                backgroundColor="#F7623E"
                textColor="#FFFFFF"
              >
                <div className="space-y-[8px] sm:space-y-[10px]">
                  {currentFoods.map((food, index) => (
                    <NutrientItem
                      key={index}
                      name={food.name}
                      value={food.carbs}
                      percentage={food.carbsPercent}
                      type="complex"
                    />
                  ))}
                </div>
              </NutrientAnalysisPanel>
            </div>
          </div>
        </ReportCard>

        {/* 주요 영양소의 1일 권장 섭취량 */}
        <ReportCard backgroundColor="#003DA5">
          <ReportCardHeader
            emoji="🍚"
            title="주요 영양소의 1일 권장 섭취량"
            subtitle="1일 권장 칼로리(DER) 기준 단백질, 지방, 탄수화물의 섭취량과 음수량을 제시해드려요!"
            titleColor="#FFFFFF"
            subtitleColor="#F2F2F2"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[35px] text-white">

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[31px] justify-center sm:justify-start">
              <div className="bg-white rounded-[25px] w-full h-[100px] sm:w-[245px] sm:h-[163px] py-[12px] px-3 sm:py-[25.5px] sm:px-6 text-left flex-shrink-0">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-lg">🥚</span>
                  <h3 className="text-[#1E1E1E] font-medium text-[16px] truncate">단백질(Protein)</h3>
                </div>
                <p className={`text-[#1E1E1E] font-semibold text-[20px] sm:text-[35px] mt-[15px] sm:mt-[40px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>{recommendedIntake.protein}</p>
              </div>
              <div className="bg-white rounded-[25px] w-full h-[100px] sm:w-[245px] sm:h-[163px] py-[12px] px-3 sm:py-[25.5px] sm:px-6 text-left flex-shrink-0">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-lg">🥩</span>
                  <h3 className="text-[#1E1E1E] font-medium text-[16px] truncate">지방(Fat)</h3>
                </div>
                <p className={`text-[#1E1E1E] font-semibold text-[20px] sm:text-[35px] mt-[15px] sm:mt-[40px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>{recommendedIntake.fat}</p>
              </div>
              <div className="bg-white rounded-[25px] w-full h-[100px] sm:w-[245px] sm:h-[163px] py-[12px] px-3 sm:py-[25.5px] sm:px-6 text-left flex-shrink-0">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-lg">🌾</span>
                  <h3 className="text-[#1E1E1E] font-medium text-[16px] truncate">탄수화물(Carbs)</h3>
                </div>
                <p className={`text-[#1E1E1E] font-semibold text-[20px] sm:text-[35px] mt-[15px] sm:mt-[40px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>{recommendedIntake.carbs}</p>
              </div>
              <div className="bg-white rounded-[25px] w-full h-[100px] sm:w-[245px] sm:h-[163px] py-[12px] px-3 sm:py-[25.5px] sm:px-6 text-left flex-shrink-0">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-lg">💧</span>
                  <h3 className="text-[#1E1E1E] font-medium text-[16px] truncate">음수량</h3>
                </div>
                <p className={`text-[#1E1E1E] font-semibold text-[20px] sm:text-[35px] mt-[15px] sm:mt-[40px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>{recommendedIntake.water}</p>
              </div>
            </div>

            {/* 데스크탑용 노란 버튼 - 하얀 카드들 아래 보더보다 19px 위에 배치 */}
            {!isSurveyCompleted && (
              <div className="relative hidden md:block">
                <div className="absolute bottom-[19px] left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => router.push('/survey')}
                    className="w-[1033px] h-[59px] bg-[#FFC466] text-[#343434] rounded-[50px] font-semibold text-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
                  >
                    1일 권장 칼로리(DER)의 정보가 필요해요!
                  </button>
                </div>
              </div>
            )}

            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text="하루 권장 칼로리 정보가 필요해요" variant="yellow" />
              </div>
            )}
          </div>
        </ReportCard>

        {/* 현재 vs 권장 섭취량 비교 분석 */}
        <ReportCard>
          <ReportCardHeader
            emoji="📊"
            title="현재 vs 권장 섭취량 비교 분석"
            subtitle="위에서 분석한 현재와 권장 칼로리 및 주요 영양소를 비교 분석해 현재 식단이 어떤 상태인지 더 자세히 파악해요!"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[42px]">
            {/* 데스크탑용 파란 버튼 - 칼로리 배지 위에 배치 */}
            {!isSurveyCompleted && (
              <div className="relative hidden md:block mb-[20px]">
                <div className="absolute top-[-4px] left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => router.push('/survey')}
                    className="w-[839px] h-[97px] bg-[#003DA5] text-white rounded-[50px] font-medium text-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div>주요 영양소의 1일 권장섭취량의 정보가 필요해요.</div>
                      <div>활동 수준, BCS 등의 정보를 기입하고 확인해보세요!</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 주요 영양소 섭취량 비교 섹션 */}
            <div className="flex flex-col gap-[30px] mb-[42px]">
              {/* 칼로리 */}
              <div className="md:bg-[#F2F2F2] md:rounded-[20px] md:py-[16.5px] md:px-[34.5px]">
                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:flex items-start gap-[6px]">
                  {/* 왼쪽: 제목 + 백분율 */}
                  <div className="w-[70px] flex-shrink-0">
                    <h3 className="text-[#525252] font-medium text-[15px]">칼로리</h3>
                    <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                  </div>

                  {/* 중앙: 수치 + 그래프 */}
                  <div className="w-[461px] mr-[35px]">
                    <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[461px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <span>10.0</span>
                      <span className="mx-1">/</span>
                      <span>11.1</span>
                      <span className="ml-1">kcal</span>
                    </div>
                    <div className="w-[461px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                      <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                    </div>
                  </div>

                  {/* 오른쪽: 상태 */}
                  <div className="flex-shrink-0 flex gap-4">
                    <div className="w-[82px] flex flex-col gap-[6px] items-center">
                      <span className="text-[#525252] text-[15px] font-medium">칼로리 상태</span>
                      <StatusIndicator status="critical" size="lg" />
                    </div>
                    <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <p>・74kcal 부족</p>
                      <p>・목표치의 60% 수준으로 심각하게 부족</p>
                    </div>
                  </div>
                </div>

                {/* 모바일 레이아웃 */}
                <div className="md:hidden space-y-4">
                  {/* 첫 번째 배지: 영양소명 + 수치 + 퍼센티지 + 그래프 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex items-start gap-[6px]">
                      <div className="w-[70px] flex-shrink-0">
                        <h3 className="text-[#525252] font-medium text-[15px]">칼로리</h3>
                        <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                      </div>
                      <div className="w-[193px]">
                        <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[193px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                          <span>10.0</span>
                          <span className="mx-1">/</span>
                          <span>11.1</span>
                          <span className="ml-1">kcal</span>
                        </div>
                        <div className="w-[193px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                          <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 두 번째 배지: 상태명 + 배지 + 텍스트 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex gap-4">
                      <div className="w-[100px] flex flex-col gap-[6px] items-center justify-center">
                        <span className="text-[#525252] text-[15px] font-medium">칼로리 상태</span>
                        <StatusIndicator status="critical" size="lg" />
                      </div>
                      <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        <p className="pl-[1em] indent-[-1em]">・74kcal 부족</p>
                        <p className="pl-[1em] indent-[-1em]">・목표치의 60% 수준으로 심각하게 부족</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 단백질 */}
              <div className="md:bg-[#F2F2F2] md:rounded-[20px] md:py-[16.5px] md:px-[34.5px]">
                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:flex items-start gap-[6px]">
                  {/* 왼쪽: 제목 + 백분율 */}
                  <div className="w-[70px] flex-shrink-0">
                    <h3 className="text-[#525252] font-medium text-[15px]">단백질</h3>
                    <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                  </div>

                  {/* 중앙: 수치 + 그래프 */}
                  <div className="w-[461px] mr-[35px]">
                    <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[461px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <span>10.0</span>
                      <span className="mx-1">/</span>
                      <span>11.1</span>
                      <span className="ml-1">g</span>
                    </div>
                    <div className="w-[461px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                      <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                    </div>
                  </div>

                  {/* 오른쪽: 상태 */}
                  <div className="flex-shrink-0 flex gap-4">
                    <div className="w-[82px] flex flex-col gap-[6px] items-center">
                      <span className="text-[#525252] text-[15px] font-medium">단백질 상태</span>
                      <StatusIndicator status="warning" size="lg" />
                    </div>
                    <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <p>・1.1g 부족</p>
                      <p>・근육 보존에 필요한 최소량보다 부족</p>
                    </div>
                  </div>
                </div>

                {/* 모바일 레이아웃 */}
                <div className="md:hidden space-y-4">
                  {/* 첫 번째 배지: 영양소명 + 수치 + 퍼센티지 + 그래프 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex items-start gap-[6px]">
                      <div className="w-[70px] flex-shrink-0">
                        <h3 className="text-[#525252] font-medium text-[15px]">단백질</h3>
                        <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                      </div>
                      <div className="w-[193px]">
                        <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[193px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                          <span>10.0</span>
                          <span className="mx-1">/</span>
                          <span>11.1</span>
                          <span className="ml-1">g</span>
                        </div>
                        <div className="w-[193px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                          <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 두 번째 배지: 상태명 + 배지 + 텍스트 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex gap-4">
                      <div className="w-[100px] flex flex-col gap-[6px] items-center justify-center">
                        <span className="text-[#525252] text-[15px] font-medium">단백질 상태</span>
                        <StatusIndicator status="warning" size="lg" />
                      </div>
                      <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        <p className="pl-[1em] indent-[-1em]">・1.1g 부족</p>
                        <p className="pl-[1em] indent-[-1em]">・근육 보존에 필요한 최소량보다 부족</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 지방 */}
              <div className="md:bg-[#F2F2F2] md:rounded-[20px] md:py-[16.5px] md:px-[34.5px]">
                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:flex items-start gap-[6px]">
                  {/* 왼쪽: 제목 + 백분율 */}
                  <div className="w-[70px] flex-shrink-0">
                    <h3 className="text-[#525252] font-medium text-[15px]">지방</h3>
                    <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                  </div>

                  {/* 중앙: 수치 + 그래프 */}
                  <div className="w-[461px] mr-[35px]">
                    <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[461px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <span>10.0</span>
                      <span className="mx-1">/</span>
                      <span>11.1</span>
                      <span className="ml-1">g</span>
                    </div>
                    <div className="w-[461px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                      <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                    </div>
                  </div>

                  {/* 오른쪽: 상태 */}
                  <div className="flex-shrink-0 flex gap-4">
                    <div className="w-[82px] flex flex-col gap-[6px] items-center">
                      <span className="text-[#525252] text-[15px] font-medium">지방 상태</span>
                      <StatusIndicator status="good" size="lg" />
                    </div>
                    <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <p>・목표 범위 내로 잘 관리되고 있음</p>
                    </div>
                  </div>
                </div>

                {/* 모바일 레이아웃 */}
                <div className="md:hidden space-y-4">
                  {/* 첫 번째 배지: 영양소명 + 수치 + 퍼센티지 + 그래프 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex items-start gap-[6px]">
                      <div className="w-[70px] flex-shrink-0">
                        <h3 className="text-[#525252] font-medium text-[15px]">지방</h3>
                        <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>90.1%</span>
                      </div>
                      <div className="w-[193px]">
                        <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[193px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                          <span>10.0</span>
                          <span className="mx-1">/</span>
                          <span>11.1</span>
                          <span className="ml-1">g</span>
                        </div>
                        <div className="w-[193px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                          <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '90.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 두 번째 배지: 상태명 + 배지 + 텍스트 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex gap-4">
                      <div className="w-[100px] flex flex-col gap-[6px] items-center justify-center">
                        <span className="text-[#525252] text-[15px] font-medium">지방 상태</span>
                        <StatusIndicator status="good" size="lg" />
                      </div>
                      <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        <p className="pl-[1em] indent-[-1em]">・목표 범위 내로 잘 관리되고 있음</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 탄수화물 */}
              <div className="md:bg-[#F2F2F2] md:rounded-[20px] md:py-[16.5px] md:px-[34.5px]">
                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:flex items-start gap-[6px]">
                  {/* 왼쪽: 제목 + 백분율 */}
                  <div className="w-[70px] flex-shrink-0">
                    <h3 className="text-[#525252] font-medium text-[15px]">탄수화물</h3>
                    <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>106.5%</span>
                  </div>

                  {/* 중앙: 수치 + 그래프 */}
                  <div className="w-[461px] mr-[35px]">
                    <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[461px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <span>9</span>
                      <span className="mx-1">~</span>
                      <span>17</span>
                      <span className="ml-1">g</span>
                    </div>
                    <div className="w-[461px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                      <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* 오른쪽: 상태 */}
                  <div className="flex-shrink-0 flex gap-4">
                    <div className="w-[82px] flex flex-col gap-[6px] items-center">
                      <span className="text-[#525252] text-[15px] font-medium">탄수화물 상태</span>
                      <StatusIndicator status="warning" size="lg" />
                    </div>
                    <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                      <p>・권장 범위 내로 적절하게 섭취 중</p>
                    </div>
                  </div>
                </div>

                {/* 모바일 레이아웃 */}
                <div className="md:hidden space-y-4">
                  {/* 첫 번째 배지: 영양소명 + 수치 + 퍼센티지 + 그래프 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex items-start gap-[6px]">
                      <div className="w-[70px] flex-shrink-0">
                        <h3 className="text-[#525252] font-medium text-[15px]">탄수화물</h3>
                        <span className={`text-[#1E1E1E] font-semibold text-[20px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>106.5%</span>
                      </div>
                      <div className="w-[193px]">
                        <div className={`text-[#525252] text-[15px] font-medium mb-[6px] text-right w-[193px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                          <span>9</span>
                          <span className="mx-1">~</span>
                          <span>17</span>
                          <span className="ml-1">g</span>
                        </div>
                        <div className="w-[193px] h-[20px] bg-[#C1C1C1] rounded-full overflow-hidden">
                          <div className="bg-[#010A6B] h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 두 번째 배지: 상태명 + 배지 + 텍스트 */}
                  <div className="bg-[#F2F2F2] rounded-[20px] py-[16.5px] px-[15px]">
                    <div className="flex gap-4">
                      <div className="w-[100px] flex flex-col gap-[6px] items-center justify-center">
                        <span className="text-[#525252] text-[15px] font-medium">탄수화물 상태</span>
                        <StatusIndicator status="warning" size="lg" />
                      </div>
                      <div className={`text-[#1E1E1E] text-[18px] font-medium ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                        <p className="pl-[1em] indent-[-1em]">・권장 범위 내로 적절하게 섭취 중</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 식단 평가 및 개선 권고 섹션 */}
            <div className="bg-[#FFC466] rounded-[15px] py-[39.5px] px-[24.5px]">
              <div className="flex flex-col items-center">
                <div className="space-y-4 text-[#343434] text-[15px] md:text-[19px] w-full max-w-none">
                  <div className="flex items-start gap-3">
                    <span className="text-[#1E1E1E] text-[20px] hidden md:block">✔️</span>
                    <h3 className={`text-[#000000] font-semibold text-[18px] md:text-[22px] text-center md:text-left w-full ${!isSurveyCompleted ? 'blur-[2px]' : ''}`}>
                      <span className="md:hidden">
                        현재 하이의 식단!<br />
                        심각한 &apos;저칼로리 & 저단백&apos;<br />
                        상태로, 변화가 시급해요!
                      </span>
                      <span className="hidden md:block">
                        현재 하이의 식단! 심각한 &apos;저칼로리 & 저단백&apos; 상태로, 변화가 시급해요!
                      </span>
                    </h3>
                  </div>
                  <div className={`w-full md:ml-[32px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <p className="font-semibold mb-2">• 심각한 칼로리 및 단백질 부족으로 인한 &apos;근손실&apos; 위험</p>
                    <p>현재 섭취 칼로리(111 kcal)가 기초대사량(RER, 168kcal)에 미치지 못하는 &apos;기아 상태&apos;에 가깝고, 이로 인해 체지방뿐만 아니라 근육이 분해될 수 있으며, 슬개골 지지 근육 약화 및 관절 문제 악화, 기초대사량 및 활력 저하를 유발할 수 있습니다.</p>
                  </div>
                  <div className={`w-full md:ml-[32px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <p>
                      <StatusIndicator status="critical" size="md" />
                      <span className="ml-1.5">결론적으로, 현재 급여 방식은 &apos;최고급 사료&apos;를 급여함에도 불구하고, 절대적인 양 부족으로 인해 결과적으로는 하이의 건강을 위협하고 있는 상태입니다. 특히 슬개골 탈구가 있는 하이에게 근손실은 치명적일 수 있으므로 즉각적인 개선이 필요합니다.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text="주요 영양소 권장 섭취량 정보가 필요해요" variant="blue" />
              </div>
            )}
          </div>
        </ReportCard>

        {/* 주식과 영양제의 상호작용 평가 */}
        <ReportCard backgroundColor="#F4F4F4">
          <ReportCardHeader
            emoji="⚖️"
            title="주식과 영양제의 상호작용 평가"
            subtitle="주식과 영양제가 서로 보완관계에 있는지 또는 과유불급은 아닐지 등을 평가해요!"
            subtitleColor="#525252"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[35px]">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
              {/* 페퍼테일 참 유산균 */}
              <div className="flex-1 flex flex-col">
                <div className="bg-[#003DA5] rounded-t-[15px] py-[37px] px-[38px]">
                  <div className={`text-white ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <div className="flex items-center gap-2">
                      <StatusIndicator status="good" size="sm" />
                      <span className="font-normal text-[18px] md:text-[20px]">유지 권장</span>
                    </div>
                    <div className="font-semibold text-[20px] md:text-[22px]">페퍼테일 참 유산균</div>
                  </div>
                </div>
                <div className="bg-white rounded-b-[15px] py-[32px] px-[35px] flex-1">
                  <ul className={`space-y-3 text-[#000000] text-[16px] md:text-[18px] font-normal ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <li className="pl-[1em] indent-[-1em]">• 주식에 포함되지 않은 &apos;프로바이오틱스&apos;를 공급하여 고유의 기능을 수행합니다.</li>
                    <li className="pl-[1em] indent-[-1em]">• 장내 환경 개선은 피부 문제 및 전반적인 면역력과 직결되므로, 꾸준한 급여를 권장합니다.</li>
                  </ul>
                </div>
              </div>

              {/* 페피테일 참 오메가 */}
              <div className="flex-1 flex flex-col">
                <div className="bg-[#003DA5] rounded-t-[15px] py-[37px] px-[38px]">
                  <div className={`text-white ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <div className="flex items-center gap-2">
                      <StatusIndicator status="warning" size="sm" />
                      <span className="font-normal text-[18px] md:text-[20px]">조건부 권장</span>
                    </div>
                    <div className="font-semibold text-[20px] md:text-[22px]">페피테일 참 오메가</div>
                  </div>
                </div>
                <div className="bg-white rounded-b-[15px] py-[32px] px-[35px] flex-1">
                  <ul className={`space-y-3 text-[#000000] text-[16px] md:text-[18px] font-normal ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <li className="pl-[1em] indent-[-1em]">• 주식(워프)과 간식(쏘울메이트) 모두 피쉬 오일을 함유하고 있으나, 염증 완화 및 피부 개선을 위한 치료적 용량의 EPA/DHA를 보충해준다는 점에서 유효합니다.</li>
                    <li className="pl-[1em] indent-[-1em]">• 현재 카쿠의 피부 상태와 관절 건강 예방을 위해 긍정적인 역할이 더 큽니다. 단, 향후 구리 제한 처방식 등 오메가-3가 강화된 특정 사료로 변경시 중복 가능성이 있으므로 &apos;조건부&apos;로 권장합니다.</li>
                  </ul>
                </div>
              </div>

              {/* Neprofin Pet® */}
              <div className="flex-1 flex flex-col">
                <div className="bg-[#003DA5] rounded-t-[15px] py-[37px] px-[38px]">
                  <div className={`text-white ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <div className="flex items-center gap-2">
                      <StatusIndicator status="good" size="sm" />
                      <span className="font-normal text-[18px] md:text-[20px]">유지 권장</span>
                    </div>
                    <div className="font-semibold text-[20px] md:text-[22px]">Neprofin Pet®</div>
                  </div>
                </div>
                <div className="bg-white rounded-b-[15px] py-[32px] px-[35px] flex-1">
                  <ul className={`space-y-3 text-[#000000] text-[16px] md:text-[18px] font-normal ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                    <li className="pl-[1em] indent-[-1em]">• 소화 효소 및 항염 효소는 일반 사료에 포함되지 않는 고유의 기능성 성분입니다.</li>
                    <li className="pl-[1em] indent-[-1em]">• 카쿠의 과거 두드러기, 점액변 등 염증성 반응 관리와 관절 건강 예방이라는 목표에 부합하므로 유지를 권장합니다.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 데스크탑용 파란 버튼 - 절대 위치로 배치 */}
            {!isSurveyCompleted && (
              <div className="relative hidden md:block">
                <div className="absolute bottom-[242px] left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => router.push('/survey')}
                    className="w-[839px] h-[97px] bg-[#003DA5] text-white rounded-[50px] font-medium text-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div>어떤 영양제를 급여하고 계신가요?</div>
                      <div>지금 정보를 기입하고 혹시 과하게 급하고 있는건 아닐지 체크해보세요!</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text="급여 중인 영양제 정보를 알려주세요" variant="yellow" />
              </div>
            )}
          </div>
        </ReportCard>

        {/* 종합 결론 및 솔루션 */}
        <ReportCard>
          <ReportCardHeader
            emoji="✅"
            title="종합 결론 및 솔루션"
            subtitle="현재 급여 식단에 대한 종합적인 진단과 그에 따른 실행 계획을 알려드려요!"
            subtitleColor="#1E1E1E"
            titleSize="24px"
            subtitleSize="16px"
          />
          <div className="mt-[35px]">
            <div className="space-y-6">
              {/* 현재 식단의 최종 평가 */}
              <div className="bg-[#003DA5] rounded-[15px] py-[28.5px] px-[30px]">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-white text-[20px]">🖍️</span>
                  <h3 className="text-white font-semibold text-[18px] md:text-[22px]">현재 식단의 최종 평가</h3>
                </div>
                <p className={`text-white text-[15px] md:text-[20px] leading-relaxed ml-[32px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                  현재 식단은 &apos;좋은 사료를 잘못된 양으로 사용&apos;하고 있는 대표적인 사례입니다. 이는 영양 불균형과 지속적인 허기를 유발하여, 장기적으로는 하이의 건강을 심각하게 해칠 수 있습니다.
                </p>
              </div>

              {/* 데스크탑용 하얀 버튼 - 파란 카드 두 개 사이에 배치 */}
              {!isSurveyCompleted && (
                <div className="relative hidden md:block">
                  <div className="absolute top-[-48px] left-1/2 transform -translate-x-1/2">
                    <button
                      onClick={() => router.push('/survey')}
                      className="w-[839px] h-[97px] bg-[#FFFFFF] text-[#1E1E1E] rounded-[50px] font-medium text-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div>수의영양학 데이터로 분석하고 수의사가 검증한</div>
                        <div>종합 진단과 솔루션을 바로 확인해보세요!</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* 실행 계획 */}
              <div className="bg-[#003DA5] rounded-[15px] py-[28.5px] px-[30px]">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-white text-[20px]">📝</span>
                  <h3 className="text-white font-semibold text-[18px] md:text-[22px]">실행 계획</h3>
                </div>
                <ul className={`space-y-4 text-white text-[15px] md:text-[20px] ml-[32px] ${!isSurveyCompleted ? 'blur-sm' : ''}`}>
                  <li>
                    <span className="font-bold">• 권장 사항:</span> 현재 사료의 장점은 살리되, 지방 함량이 훨씬 낮은 새로운 &apos;저지방 주식(베이스)&apos;을 도입하여 전체 식단의 지방은 낮추고 부족한 칼로리와 단백질을 채우는 &apos;베이스 + 솔버&apos; 전략으로 전환을 추천합니다.
                  </li>
                  <li>
                    <span className="font-bold">• 급여 방법:</span> 현재 급여 중인 3가지 사료의 조합과 품질이 매우 훌륭하므로, 제품을 바꾸기보다는 각 사료의 양을 비례적으로 늘려 총량을 맞추는 방법을 추천합니다.
                  </li>
                  <li>
                    <span className="font-bold">• 제한사항:</span> 정확한 칼로리 관리를 위해, 새로운 식단에 적응하는 동안에는 별도의 간식 급여를 제한하거나, 급여 시 하루 목표 칼로리의 10%를 넘지 않도록 엄격히 관리해야 합니다.
                  </li>
                  <li>
                    <span className="font-bold">• 장기 모니터링:</span> 식단 변경 후 2~4주 간격으로 체중을 측정하고, BCS를 다시 확인하여 체중이 급격히 늘지 않고 3.2kg을 잘 유지하는지 모니터링해야 합니다.
                  </li>
                </ul>
              </div>
            </div>
            {!isSurveyCompleted && (
              <div className="mt-[28.5px] md:hidden">
                <MobileButton text="주요 영양소 권장 섭취량 정보가 필요해요" variant="white" />
              </div>
            )}
          </div>
        </ReportCard>

      </div >
    </div >
  );
};

export default DetailedDietReport;
