'use client';

import { AlertTriangle, Clipboard } from 'lucide-react';
import Image from 'next/image';
import ReportCard from '@/components/common/ReportCard';
import ReportCardHeader from '@/components/common/ReportCardHeader';
import ReportCardContent from '@/components/common/ReportCardContent';
import NutrientAnalysisPanel from '@/components/common/NutrientAnalysisPanel';
import NutrientItem from '@/components/common/NutrientItem';

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

interface ComparisonData {
  name: string;
  percentage: number;
  status: 'critical' | 'warning' | 'good';
  description: string;
  detail: string;
}

interface Supplement {
  name: string;
  status: 'maintenance' | 'conditional';
  description: string;
}

interface DetailedDietReportProps {
  petInfo: PetInfo;
  targetMetrics: TargetMetrics;
  currentFoods: NutrientData[];
  recommendedIntake: RecommendedIntake;
  comparisonData: ComparisonData[];
  supplements: Supplement[];
}

const DetailedDietReport = ({
  petInfo,
  targetMetrics,
  currentFoods,
  recommendedIntake,
  comparisonData,
  supplements
}: DetailedDietReportProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'good': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
      <div className="max-w-[1280px] mx-auto space-y-6">

        {/* 헤더 섹션 - 좌측 정렬 */}
        <div className="text-left mb-44">
          <p className="text-[#848484] font-medium text-[18px] sm:text-[22px] md:text-[28px] mb-0">Current Diet Report</p>
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-[#000000] mb-6">
            {petInfo.name}를 위한 현재 식단 분석 리포트
          </h1>
        </div>

        {/* 6개 카드 그리드: 가로80px, 왼쪽세로24px, 오른쪽세로35px, md:order로 순서조정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-[80px] mb-8">
          {/* 행복한 미식가 카드 */}
          <div className="bg-[#003DA5] rounded-[20px] pt-[46px] pb-[36px] px-[18px] text-white relative md:order-1">
            {/* 반려동물 일러스트 - 카드 위에 떠있는 위치 */}
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

              {/* 하단 보더 */}
              <div className="border-t border-[#E3E3E3] my-3"></div>

              <p className="text-[22px] font-medium text-white leading-snug px-[4px] break-words">
                맛있는 것 앞에서는 절대 양보할 수 없는 진정한 푸디 산책보다는 간식 시간이 더 설레고, 통통한 볼살이 트레이드마크인 사랑스러운 식도락가
              </p>
            </div>
          </div>

          {/* 냥구는요 카드 */}
          <ReportCard className="md:order-2">
            <ReportCardHeader emoji="🐾" title="냥구는요" />
            <div className="mt-[35px]">
              <ReportCardContent>
                넘치는 에너지와 좋은 골격을 가졌지만, 현재는 몸이 조금 무거운 유망주. 전문적인 관리를 통해 최고의 컨디션을 되찾을 준비가 되어 있으며, 체중 감량과 동시에 근육량 유지가 가능한 타입입니다.
              </ReportCardContent>
            </div>
          </ReportCard>

          {/* 체중 및 신체충실도 진단 */}
          <ReportCard className="md:order-5 md:mt-[24px]">
            <ReportCardHeader emoji="📐" title="체중 및 신체충실도(BCS) 진단" />
            <div className="mt-[35px]">
              <ReportCardContent>
                <p className="mb-3">
                  {petInfo.name}는 현재 {petInfo.weight}입니다. 포메라니안 남아의 표준 체중(1.8~3.5kg) 범위 내에 있으며,
                  보호자께서 직접 촉진(RAWSOME)하신 결과에 따르면 &apos;손을 편 손등&apos;과 유사하여 BCS 5/9의 &apos;이상적인(Ideal)&apos; 상태에 해당합니다.
                </p>
                <p>
                  현재 체중과 신체 상태는 매우 이상적입니다. 특히 슬개골 탈구가 있는 {petInfo.name}에게 이상적인 체중 유지는 관절에 가해지는 물리적 부담을 줄여주는 가장 중요한 관리법이므로, 앞으로도 꾸준히 현재 상태를 유지하는 것이 매우 중요합니다.
                </p>
              </ReportCardContent>
            </div>
          </ReportCard>

          {/* 생애주기 평가 */}
          <ReportCard className="md:order-6 md:mt-[35px]">
            <ReportCardHeader emoji="👧🏻" title="생애주기 평가" />
            <div className="mt-[35px]">
              <ReportCardContent>
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
          <ReportCard className="md:order-3 md:mt-[24px]">
            <ReportCardHeader emoji="🐶" title={`${petInfo.breed} · ${petInfo.gender}`} />
            <div className="mt-[35px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-[18px]">
                <div className="bg-[#003DA5] rounded-lg px-[15px] sm:px-[17px] lg:px-[19px] py-[12px] sm:py-[13px] lg:py-[15px] text-left space-y-[15px] sm:space-y-[17px] lg:space-y-[20px]">
                  <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">나이</p>
                  <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">{petInfo.age}</p>
                </div>
                <div className="bg-[#003DA5] rounded-lg px-[15px] sm:px-[17px] lg:px-[19px] py-[12px] sm:py-[13px] lg:py-[15px] text-left space-y-[15px] sm:space-y-[17px] lg:space-y-[20px]">
                  <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">몸무게</p>
                  <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">{petInfo.weight}</p>
                </div>
                <div className="bg-[#003DA5] rounded-lg px-[15px] sm:px-[17px] lg:px-[19px] py-[12px] sm:py-[13px] lg:py-[15px] text-left space-y-[15px] sm:space-y-[17px] lg:space-y-[20px] sm:col-span-2 lg:col-span-1">
                  <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white font-medium leading-none">중성화</p>
                  <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-white font-semibold leading-none">{petInfo.neutered}</p>
                </div>
              </div>
            </div>
          </ReportCard>

          {/* BCS & RWASOME 카드 */}
          <ReportCard className="md:order-4 md:mt-[35px]">
            <div className="space-y-6">
              {/* BCS */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="flex flex-col">
                  <span className="text-[20px] sm:text-[22px] md:text-[25px] font-semibold text-[#1E1E1E]">BCS</span>
                  <abbr className="text-[12px] sm:text-[13px] md:text-sm text-[#1E1E1E] -mt-[6px] no-underline" title="Body Condition Score">(Body Condition Score)</abbr>
                </div>
                <div className="flex flex-col items-end">
                  {/* Progress Bar */}
                  <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[57px] bg-[#F2F2F2] rounded-[60px] overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFB800] rounded-[60px] flex items-center justify-center"
                      style={{ width: `${(petInfo.bcs / 9) * 100}%` }}
                    >
                      <span className="text-[#010A6B] font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px]">
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
                <div className="flex flex-col">
                  <span className="text-[20px] sm:text-[22px] md:text-[25px] font-semibold text-[#1E1E1E]">RWASOME</span>
                </div>
                <div className="flex flex-col items-end">
                  {/* Progress Bar */}
                  <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[329px] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[57px] bg-[#F2F2F2] rounded-[60px] overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFB800] rounded-[60px] flex items-center justify-center"
                      style={{ width: `${(petInfo.rwacome / 9) * 100}%` }}
                    >
                      <span className="text-[#010A6B] font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px]">
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
          </ReportCard>
        </div>

        {/* 목표 체중과 하루 권장 칼로리 */}
        <ReportCard>
          <ReportCardHeader
            emoji="🎯"
            title={`${petInfo.name}의 목표 체중과 하루 권장 칼로리`}
            subtitle="현재 신체 상태를 과학적으로 분석하여, 수의영양학 기준 목표 체중과 하루 목표 섭취 칼로리를 제시해드려요!"
          />
          <div className="mt-[35px]">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[37px]">
              <div className="bg-[#FFB800] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] px-[20px] sm:px-[22px] lg:px-[25px] text-left">
                <ReportCardHeader
                  emoji="😴"
                  title="휴식 대사량(RER)"
                  subtitle="Resting Energy Requirement"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="18px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px]">
                  <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">{targetMetrics.rer}</p>
                </div>
              </div>
              <div className="bg-[#FFB800] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] px-[20px] sm:px-[22px] lg:px-[25px] text-left">
                <ReportCardHeader
                  emoji="⚓️"
                  title="목표 체중"
                  subtitle="현재의 이상적인 체중을 유지"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="18px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px]">
                  <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">{targetMetrics.targetWeight}</p>
                </div>
              </div>
              <div className="bg-[#FFB800] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] py-[20px] sm:py-[23px] lg:py-[26px] px-[20px] sm:px-[22px] lg:px-[25px] text-left sm:col-span-2 lg:col-span-1">
                <ReportCardHeader
                  emoji="🔥️"
                  title="1일 권장 칼로리(MER)"
                  subtitle="Recommeded Daily Enegy Requirement"
                  titleColor="#1E1E1E"
                  subtitleColor="#525252"
                  titleSize="18px"
                  subtitleSize="13px"
                  titleSubtitleGap="0px"
                />
                <div className="mt-[25px] sm:mt-[30px] lg:mt-[37px] ml-[28px] sm:ml-[30px] lg:ml-[32px]">
                  <p className="text-[#1E1E1E] font-semibold text-[28px] sm:text-[32px] lg:text-[38px]">{targetMetrics.mer}</p>
                </div>
              </div>
            </div>
          </div>
        </ReportCard>

        {/* 현재 식단의 주요 영양소 함량 분석 */}
        <ReportCard backgroundColor="#F4F4F4">
          <ReportCardHeader
            emoji="⚖️"
            title="현재 식단의 주요 영양소 함량 분석"
            subtitle="제품 라벨에서는 알려주지 않는 각 제품의 섭취량과 칼로리에 따른 단백질, 지방 그리고 탄수화물의 함량을 자세히 파악해요! (AS FED 기준)"
            subtitleColor="#525252"
          />
          <div className="mt-[35px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 섭취량(g) 패널 */}
              <NutrientAnalysisPanel
                title="섭취량(g)"
                backgroundColor="#FFB800"
                textColor="#343434"
              >
                <div className="space-y-[10px]">
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
                <div className="space-y-[10px]">
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
                <div className="space-y-[10px]">
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
                <div className="space-y-[10px]">
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
                className="lg:col-span-2"
              >
                <div className="space-y-[10px]">
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
          />
          <div className="mt-[35px] text-white">

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border-2 border-blue-300 rounded-lg p-4 text-left">
                <div className="text-2xl mb-2 text-[#003DA5]">🥚</div>
                <p className="text-xs text-[#003DA5] mb-1">단백질(Protein)</p>
                <p className="text-sm font-bold text-[#003DA5]">{recommendedIntake.protein}</p>
              </div>
              <div className="bg-white border-2 border-blue-300 rounded-lg p-4 text-left">
                <div className="text-2xl mb-2 text-[#003DA5]">🥩</div>
                <p className="text-xs text-[#003DA5] mb-1">지방(Fat)</p>
                <p className="text-sm font-bold text-[#003DA5]">{recommendedIntake.fat}</p>
              </div>
              <div className="bg-white border-2 border-blue-300 rounded-lg p-4 text-left">
                <div className="text-2xl mb-2 text-[#003DA5]">🌾</div>
                <p className="text-xs text-[#003DA5] mb-1">탄수화물(Carbs)</p>
                <p className="text-sm font-bold text-[#003DA5]">{recommendedIntake.carbs}</p>
              </div>
              <div className="bg-white border-2 border-blue-300 rounded-lg p-4 text-left">
                <div className="text-2xl mb-2 text-[#003DA5]">💧</div>
                <p className="text-xs text-[#003DA5] mb-1">음수량</p>
                <p className="text-sm font-bold text-[#003DA5]">{recommendedIntake.water}</p>
              </div>
            </div>
          </div>
        </ReportCard>

        {/* 현재 vs 권장 섭취량 비교 분석 */}
        <ReportCard>
          <ReportCardHeader
            emoji="📊"
            title="현재 vs 권장 섭취량 비교 분석"
            subtitle="위에서 분석한 현재와 권장 칼로리 및 주요 영양소를 비교 분석해 현재 식단이 어떤 상태인지 더 자세히 파악해요!"
          />
          <div className="mt-[35px]">

            <div className="space-y-4 mb-6">
              {comparisonData.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[#1E1E1E]">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                      <span className="text-sm font-semibold text-[#1E1E1E]">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className={`h-3 rounded-full ${getStatusColor(item.status)}`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-[#525252] font-medium">{item.description}</p>
                    <p className="text-xs text-[#8B8B8B]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 긴급 알림 박스 - 비교 분석 카드 안에 포함 */}
            <div className="bg-[#FFB800] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    현재 {petInfo.name}의 식단! 심각한 &apos;저칼로리 & 저단백&apos; 상태로, 변화가 시급해요!
                  </h3>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• 심각한 칼로리 및 단백질 부족으로 인한 근손실 위험, 현재 섭취량(111kcal)이 RER(168kcal)보다 낮아 &apos;굶주림 식단&apos; 수준</li>
                    <li>• 지속될 경우: 근육 분해 → 슬개골 탈구 악화 → 기초대사량 저하 및 활력 저하</li>
                    <li>• 프리미엄 사료를 사용하고 있지만, 절대적 부족으로 인한 급여 방식이 {petInfo.name}의 건강을 위협하고 있으며, 특히 슬개골 탈구가 있는 {petInfo.name}에게는 치명적</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ReportCard>

        {/* 주식과 영양제의 상호작용 평가 */}
        <ReportCard backgroundColor="#F4F4F4">
          <ReportCardHeader
            emoji="⚖️"
            title="주식과 영양제의 상호작용 평가"
            subtitle="주식과 영양제가 서로 보완관계에 있는지 또는 과유불급은 아닐지 등을 평가해요!"
            subtitleColor="#525252"
          />
          <div className="mt-[35px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supplements.map((supplement, index) => (
                <div key={index} className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${supplement.status === 'maintenance' ? 'bg-green-500' : 'bg-yellow-500'
                      } mt-2 flex-shrink-0`}></div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1E1E1E] mb-2">{supplement.name}</h4>
                      <p className="text-xs text-[#525252] leading-relaxed whitespace-pre-line">{supplement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ReportCard>

        {/* 종합 결론 및 솔루션 */}
        <ReportCard>
          <ReportCardHeader
            emoji="✅"
            title="종합 결론 및 솔루션"
            subtitle="현재 급여 식단에 대한 종합적인 진단과 그에 따른 실행 계획을 알려드려요!"
            subtitleColor="#1E1E1E"
          />
          <div className="mt-[35px]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 왼쪽: 현재 식단의 최종 평가 */}
              <div className="bg-[#003DA5] rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">현재 식단의 최종 평가</h4>
                    <p className="text-xs text-white leading-relaxed">
                      현재 식단은 &apos;좋은 사료를 잘못된 양으로 사용&apos;하고 있는 대표적인 사례입니다.
                      이는 영양 불균형과 지속적인 허기를 유발하여, 장기적으로는 {petInfo.name}의 건강을 심각하게 해칠 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 실행 계획 */}
              <div className="bg-[#003DA5] rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Clipboard className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">실행 계획</h4>
                    <ul className="space-y-3 text-xs text-white">
                      <li><strong>권장 사항:</strong> 현재 사료의 장점은 살리되, 지방 함량이 훨씬 낮은 새로운 &apos;저지방 주식(베이스)&apos;을 도입하여 전체 식단의 지방은 낮추고 부족한 칼로리와 단백질을 채우는 &apos;베이스 + 솔버&apos; 전략으로 전환을 추천합니다.</li>
                      <li><strong>급여 방법:</strong> 현재 급여 중인 3가지 사료의 조합과 품질이 매우 훌륭하므로, 제품을 바꾸기보다는 각 사료의 양을 비례적으로 늘려 총량을 맞추는 방법을 추천합니다.</li>
                      <li><strong>제한사항:</strong> 정확한 칼로리 관리를 위해, 새로운 식단에 적응하는 동안에는 별도의 간식 급여를 제한하거나, 급여 시 하루 목표 칼로리의 10%를 넘지 않도록 엄격히 관리해야 합니다.</li>
                      <li><strong>장기 모니터링:</strong> 식단 변경 후 2~4주 간격으로 체중을 측정하고, BCS를 다시 확인하여 체중이 급격히 늘지 않고 3.2kg을 잘 유지하는지 모니터링해야 합니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReportCard>

      </div >
    </div >
  );
};

export default DetailedDietReport;
