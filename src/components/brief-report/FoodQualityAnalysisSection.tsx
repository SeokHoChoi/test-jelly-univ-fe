"use client";

// import { Check } from 'lucide-react';
import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import Pill from '@/components/common/Pill';
import EvalCard from '@/components/common/EvalCard';
import InfoBar from '@/components/common/InfoBar';
import RatingBar from '@/components/common/RatingBar';
import { useRatingStore, type RatingData } from '@/contexts/RatingStore';
import ReportTabs from '@/components/brief-report/ReportTabs';

const FoodQualityAnalysisSection = () => {
  const scrollTo = (targetId: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // 무한 루프 방지: 스토어에서 파생값을 직접 구독하지 말고 원본 응답만 구독
  const response = useRatingStore((s) => s.response);
  const foods = useMemo(() => {
    if (!response?.foodRatings) return [] as Array<{
      key: string;
      title: string;
      amount: string;
      overall: {
        grade: string;
        score: number;
        badge: string;
        summary: string;
        strengths?: string[];
        improvements?: string[];
        recommendations?: string[];
      };
    }>;
    return response.foodRatings.map((fr, idx) => ({
      key: `${fr.foodInfo.id ?? idx}`,
      title: `${fr.foodInfo.brandName} ${fr.foodInfo.productName}`.trim(),
      amount: fr.foodInfo.dailyAmount,
      overall: {
        grade: fr.rating?.overallRating?.grade ?? 'N/A',
        score: fr.rating?.overallRating?.score ?? 0,
        badge: fr.rating?.overallRating?.badge ?? '표준',
        summary: fr.rating?.overallRating?.summary ?? '',
        strengths: fr.rating?.overallRating?.strengths,
        improvements: fr.rating?.overallRating?.improvements,
        recommendations: fr.rating?.overallRating?.recommendations,
      },
    }));
  }, [response]);
  const first = foods[0];
  const dog = response?.dogInfo;

  // 카테고리별 등급/설명 소스 (정적 타입 사용)
  type NutritionReliability = RatingData['foodRatings'][number]['rating']['nutritionReliability'];
  type NutritionBalance = RatingData['foodRatings'][number]['rating']['nutritionBalance'];
  type IngredientQuality = RatingData['foodRatings'][number]['rating']['ingredientQuality'];
  type ManufacturingQuality = RatingData['foodRatings'][number]['rating']['manufacturingQuality'];

  const rel: NutritionReliability | undefined = response?.foodRatings?.[0]?.rating?.nutritionReliability;
  const bal: NutritionBalance | undefined = response?.foodRatings?.[0]?.rating?.nutritionBalance;
  const ing: IngredientQuality | undefined = response?.foodRatings?.[0]?.rating?.ingredientQuality;
  const mfg: ManufacturingQuality | undefined = response?.foodRatings?.[0]?.rating?.manufacturingQuality;

  const reliabilityGrade = rel?.overallGrade ?? 'N/A';
  const balanceGrade = bal?.overallGrade ?? 'N/A';
  const ingredientGrade = ing?.overallGrade ?? 'N/A';
  const manufacturingGrade = mfg?.overallGrade ?? 'N/A';

  const reliabilityText =
    (() => {
      const g1 = rel?.standardCompliance?.grade;
      const g2 = rel?.transparencyLevel?.grade;
      const part1 = (() => {
        switch (g1) {
          case 'A+':
            return 'AAFCO/FEDIAF의 5가지 핵심 영양 기준을 모두 충족하여 영양 설계의 신뢰도가 매우 높습니다.';
          case 'A':
            return '4가지 영양 기준과 핵심인 칼슘:인 비율을 충족하여 영양 설계의 신뢰도가 높습니다.';
          case 'B+':
            return '3가지 영양 기준과 최소한의 칼슘/인 요구량을 충족하여 양호한 신뢰도를 보여줍니다.';
          case 'B':
            return '2가지 영양 기준과 최소한의 칼슘/인 요구량을 충족하여 기본적인 신뢰도를 갖추었습니다.';
          default:
            return rel?.standardCompliance?.detail || '기준 충족 수준을 확인할 수 있습니다.';
        }
      })();
      const part2 = (() => {
        switch (g2) {
          case 'A+':
            return '필수 영양 성분 7가지를 모두 투명하게 공개했습니다.';
          case 'A':
            return '조섬유 또는 조회분 중 하나의 정보가 빠졌지만 대부분의 정보를 공개했습니다.';
          case 'B+':
            return '조섬유와 조회분 정보가 모두 빠졌지만 핵심 정보는 공개했습니다.';
          case 'B':
            return 'DM 환산에 필요한 수분 정보가 없어 정보의 객관성이 다소 떨어집니다.';
          default:
            return rel?.transparencyLevel?.detail || '영양 성분 공개 수준을 확인할 수 있습니다.';
        }
      })();
      return `${part1} 또한, ${part2}`;
    })();
  const balanceText =
    (() => {
      // 2-1
      const mGrade = bal?.macronutrientRatio?.grade;
      const mText = (() => {
        switch (mGrade) {
          case 'A+':
            return '원재료 최상위권이 고품질/고농축 동물성 단백질로 구성되어 영양 밀도가 매우 뛰어납니다.';
          case 'A':
            return '사료의 명확한 주축이 동물성 단백질로, 영양 밀도가 우수합니다.';
          case 'B+':
            return '동물성 단백질과 함께 식물성 농축 단백질에 다소 의존하여 양호한 영양 밀도를 가집니다.';
          case 'B':
            return '사료의 주된 기반이 식물성 원료로, 영양 밀도가 다소 아쉽습니다.';
          default:
            return bal?.macronutrientRatio?.detail || '';
        }
      })();
      // 2-2
      const minGrade = bal?.mineralBalance?.grade;
      const minText = (() => {
        switch (minGrade) {
          case 'A+':
            return '미네랄의 함량과 비율이 모든 생애주기에 가장 이상적으로 설계되었습니다.';
          case 'A':
            return '미네랄의 함량은 안전하지만 비율이 성견에게만 허용되는 수준입니다.';
          case 'B+':
            return '미네랄 함량은 넉넉하지만 비율이 성견에게만 허용되는 수준입니다.';
          case 'B':
            return '함량과 비율 모두 성견에게 허용되는 최소한의 기준만 충족했습니다.';
          default:
            return bal?.mineralBalance?.detail || '';
        }
      })();
      // 2-3
      const fGrade = bal?.fattyAcidBalance?.grade;
      const fText = (() => {
        switch (fGrade) {
          case 'A+':
            return '필수 지방산의 모든 정보를 투명하게 공개하고 최적의 비율까지 고려한 최상급 설계입니다.';
          case 'A':
            return '이상적인 오메가 6:3 비율을 맞춰 염증 조절 등 건강 효과를 기대할 수 있습니다.';
          case 'B+':
            return '필수 지방산의 최소량은 채웠으나 비율이 다소 불균형하여 기능적인 측면은 아쉽습니다.';
          case 'B':
            return '필수 지방산에 대한 정보가 불충분하여 품질을 신뢰하기 어렵습니다.';
          default:
            return bal?.fattyAcidBalance?.detail || '';
        }
      })();
      const parts = [mText, minText, fText].filter(Boolean);
      return parts.length ? parts.join(' ') : '주요 영양소 비율과 미네랄/지방산 균형을 확인할 수 있습니다.';
    })();
  const ingredientText =
    (() => {
      const pGrade = ing?.primaryIngredients?.grade;
      const sGrade = ing?.ingredientSafety?.grade;
      const pText = (() => {
        switch (pGrade) {
          case 'A+':
            return '최상위권이 압도적인 수의 고품질/고농축 동물성 단백질로 구성되어 있으며, 어떤 눈속임도 없어 원료 구성에 대한 신뢰도가 완벽합니다.';
          case 'A':
            return '사료의 명확한 주축이 동물성 단백질임이 확실한, 의심의 여지 없이 우수한 원료 구성입니다.';
          case 'B+':
            return '식물성 농축 단백질에 상당히 의존하거나 원재료 쪼개기 등으로 실제 육류 함량 오인의 여지가 있습니다.';
          case 'B':
            return '사료의 주된 기반이 식물성이거나 의미 있는 동물성 단백질이 없어 영양 밀도가 떨어지는 원료 구성입니다.';
          default:
            return ing?.primaryIngredients?.detail || '';
        }
      })();
      const sText = (() => {
        switch (sGrade) {
          case 'A+':
            return '어떤 논란의 여지도 없는 가장 깨끗하고 이상적인 원료를 사용했습니다.';
          case 'A':
            return '인공 첨가물은 없지만, 최근 이슈가 되는 콩류/감자류 원료를 포함하고 있습니다.';
          // 참고: A는 Tier3 포함 가능
          case 'B+':
            return 'Tier 2(카라기난, 메나디온) 등 논란의 소지가 있는 원료를 사용했습니다.';
          case 'B':
            return 'BHA, BHT, 육류 부산물 등 안전성이 낮은 원료 사용이 확인되었습니다.';
          default:
            return ing?.ingredientSafety?.detail || '';
        }
      })();
      const parts = [pText, sText].filter(Boolean);
      return parts.length ? parts.join(' ') : '주원료의 구성과 안전성을 검토했습니다.';
    })();
  const manufacturingText =
    (() => {
      const g = mfg?.countryReliability?.grade;
      switch (g) {
        case 'A+':
          return '세계 최대 반려동물 시장이자 강력한 규제 기관을 보유한 북미에서 제조되어 신뢰도가 매우 높습니다.';
        case 'A':
          return '엄격한 식품 안전 및 동물 복지 규정을 가진 유럽(EU)/호주/뉴질랜드에서 제조되어 신뢰도가 높습니다.';
        case 'B+':
          return '현대적인 제조 시설과 자체 사료관리법을 통해 안정적인 품질을 유지하는 대한민국/일본에서 제조되었습니다.';
        case 'B':
          return '전반적인 규제나 정보 투명성이 상대적으로 낮을 수 있는 국가에서 제조되어 주의 깊은 판단이 필요합니다.';
        default:
          return mfg?.countryReliability?.detail || '제조국과 제조 품질 관련 신뢰도를 확인했습니다.';
      }
    })();

  const overallGrades = [
    { label: '영양 정보 신뢰도', grade: reliabilityGrade },
    { label: '영양 설계 균형도', grade: balanceGrade },
    { label: '원료 품질', grade: ingredientGrade },
    { label: '제조 품질', grade: manufacturingGrade },
  ];

  const detailedAssessments = [
    {
      id: '01',
      title: '영양 정보 신뢰도',
      items: [
        { label: '기준 충족\n(표기 기준/범위)', grade: rel?.standardCompliance?.grade ?? 'N/A' },
        { label: '영양 정보\n공개 수준', grade: rel?.transparencyLevel?.grade ?? 'N/A' },
        { label: '종합 신뢰도\n(요약)', grade: rel?.overallGrade ?? 'N/A' },
      ]
    },
    {
      id: '02',
      title: '영양 설계 균형도',
      items: [
        { label: '주요 영양소\n비율 및 적정성', grade: bal?.macronutrientRatio?.grade ?? 'N/A' },
        { label: '핵심 미네랄\n균형도', grade: bal?.mineralBalance?.grade ?? 'N/A' },
        { label: '필수 지방산\n충족도', grade: bal?.fattyAcidBalance?.grade ?? 'N/A' },
      ]
    },
    {
      id: '03',
      title: '원료 품질',
      items: [
        { label: '주원료의 구성\n및 영양 밀도', grade: ing?.primaryIngredients?.grade ?? 'N/A' },
        { label: '원료의 안전성\n및 위해요소', grade: ing?.ingredientSafety?.grade ?? 'N/A' },
        { label: '종합 원료 품질\n(요약)', grade: ing?.overallGrade ?? 'N/A' },
      ]
    },
    {
      id: '04',
      title: '제조 품질',
      items: [
        { label: '제조국/제조사\n신뢰도', grade: mfg?.countryReliability?.grade ?? 'N/A' },
        { label: '제조 품질\n종합', grade: mfg?.overallGrade ?? 'N/A' },
      ]
    },
  ];

  return (
    <section id="food-analysis" className="bg-gray-50 pb-12 pt-10 md:pb-20 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 탭 - 메인 제목 바로 위, 아래로 40px 간격 */}
        <div className="mb-[40px]">
          <ReportTabs />
        </div>
        {/* 메인 제목 - 상자 밖 */}
        <div className="text-center mb-[30px] md:mb-[60px]">
          <p className="text-[#000000] font-medium text-[20px] mb-2">
            현재 급여 사료 분석 요약
          </p>
          <h1 className="text-[#003DA5] font-semibold text-[28px] md:text-[45px] mb-4">
            이 사료, 믿고 먹일 수 있을까?
          </h1>

          <p className="text-[#525252] font-normal text-[18px] md:text-[28px] max-w-4xl mx-auto">
            {(() => {
              const name = dog?.name || '반려견';
              // 한글 받침 유무로 와/과 선택
              const last = name.charCodeAt(name.length - 1);
              const isHangul = last >= 0xac00 && last <= 0xd7a3;
              const hasJong = isHangul ? ((last - 0xac00) % 28 !== 0) : false;
              const josa = hasJong ? '과' : '와';
              return `현재 급여 제품이 ${name}${josa}는 별개로 신뢰할 수 있는 제품인지 평가해요!`;
            })()}
          </p>
        </div>

        <div className="bg-[#F2F2F2] rounded-[40px] px-6 py-8 md:px-[138px] md:py-[74px]">
          {/* 상단 네비게이션은 플로팅 탭으로 대체됨 */}

          {/* 사료 정보 */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Pill>주식 분석 요약</Pill>
              {/* <Pill>
                <span className="mr-1">🏆</span> HACCP/SQF 인증
              </Pill> */}
            </div>

            <h2 className="text-[30px] md:text-[35px] font-semibold text-[#003DA5] mb-6">
              {first ? first.title : '사료명'}
            </h2>

            {/* 종합 평가 타이틀 */}
            <p className="text-[25px] font-semibold text-[#1E1E1E] mb-4">
              <span className="mr-2">✔️</span>사료 품질 종합 평가
            </p>

            {/* 종합 평가 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mb-8">
              {overallGrades.map((item, idx) => (
                <EvalCard
                  key={idx}
                  title={item.label}
                  grade={item.grade}
                  onArrowClick={() => scrollTo('detailed-assessment')}
                />
              ))}
            </div>

            {/* 요약 박스들 (요청한 4개 섹션으로 교체) */}
            <div className="space-y-3 mb-10">
              <InfoBar>
                <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">🔍 영양 정보 신뢰도</div>
                <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">{reliabilityText}</div>
              </InfoBar>
              <InfoBar>
                <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">⚖️ 영양 설계 균형도</div>
                <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">{balanceText}</div>
              </InfoBar>
              <InfoBar>
                <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">🥗 원료 품질</div>
                <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">{ingredientText}</div>
              </InfoBar>
              <InfoBar>
                <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">⚙️ 제조 품질</div>
                <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">{manufacturingText}</div>
              </InfoBar>
            </div>
          </div>

          {/* 세부 평가 제목 */}
          <div id="detailed-assessment" className="flex items-center gap-2 mb-8">
            <span className="text-[25px]">✔️</span>
            <h3 className="text-[25px] font-semibold text-[#1E1E1E]">
              사료 품질 세부 평가
            </h3>
          </div>

          {/* 세부 평가 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[14px] font-bold text-[#003DA5] bg-blue-50 px-3 py-1 rounded-full">
                    {assessment.id}
                  </span>
                  <h4 className="text-[25px] font-semibold text-[#003DA5]">
                    {assessment.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {assessment.items.map((item, index) => (
                    <RatingBar
                      key={index}
                      label={item.label}
                      selectedGrade={item.grade}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 참고 배너 */}
          <div className="mt-6 md:mt-8">
            <div className="bg-[#FFB800] text-[#1E1E1E] rounded-[12px] md:rounded-[14px] px-[21px] py-[15px]">
              <div className="text-[#000000] font-semibold text-[18px] md:text-[20px] mb-2">📍 참고해주세요!</div>
              <p className="text-[#1E1E1E] text-[15px] md:text-[18px] leading-[22px] md:leading-[26px]">
                실제 식단 분석 리포트 제공 시 추가적인 정밀 검증 절차를 거치므로 본 사료의 종합 및 세부 평가 등급은 일부 변동될 수 있으며, 세부 평가 항목 또한 보다 다양하고 상세하게 제공됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodQualityAnalysisSection;
