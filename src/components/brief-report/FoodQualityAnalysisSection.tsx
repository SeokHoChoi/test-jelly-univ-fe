"use client";

// import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
// import { ChevronRight } from 'lucide-react';
import Pill from '@/components/common/Pill';
import EvalCard from '@/components/common/EvalCard';
import InfoBar from '@/components/common/InfoBar';
import RatingBar from '@/components/common/RatingBar';
import { useRatingStore, type RatingData } from '@/contexts/RatingStore';
import ReportTabs from '@/components/brief-report/ReportTabs';

const FoodQualityAnalysisSection = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const scrollTo = (targetId: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const flipCard = (cardId: string) => {
    setFlippedCards(prev => new Set(prev).add(cardId));
  };

  const unflipCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
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
      overallWeighted?: {
        grade: string;
        score: number;
        badge: string;
      };
      // Alert 필드들 (rating 객체 내부에 직접 위치)
      alertLevel?: 'urgent' | 'caution' | 'checkup' | null;
      alertMessageKey?: string;
      alertSeverity?: 'urgent' | 'caution' | 'checkup';
      alertCategory?: string;
      alertDetails?: Record<string, unknown>;
    }>;
    return response.foodRatings.map((fr, idx) => ({
      key: `${fr.foodInfo.id ?? idx}`,
      title: `${fr.foodInfo.productName}`.trim(),
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
      overallWeighted: fr.rating?.overallRatingWeighted ? {
        grade: fr.rating.overallRatingWeighted.grade,
        score: fr.rating.overallRatingWeighted.score,
        badge: fr.rating.overallRatingWeighted.badge,
      } : undefined,
      // Alert 필드들 (rating 객체 내부에 직접 위치)
      alertLevel: fr.rating?.alertLevel,
      alertMessageKey: fr.rating?.alertMessageKey,
      alertSeverity: fr.rating?.alertSeverity,
      alertCategory: fr.rating?.alertCategory,
      alertDetails: fr.rating?.alertDetails,
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
      const base = `${part1} 또한, ${part2}`;
      const hasFatal = Boolean((rel?.fatalFlaws && rel.fatalFlaws.length > 0) || (rel?.fatalFlawConditions && rel.fatalFlawConditions.length > 0));
      return hasFatal ? `${base} ⛔️ 핵심 영양 정보 누락 또는 기준 미달이 확인되었습니다.` : base;
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
      const base = parts.length ? parts.join(' ') : '주요 영양소 비율과 미네랄/지방산 균형을 확인할 수 있습니다.';
      const hasFatal = Boolean((bal?.fatalFlaws && bal.fatalFlaws.length > 0) || (bal?.fatalFlawConditions && bal.fatalFlawConditions.length > 0));
      return hasFatal ? `${base} ⛔️ 필수 영양소 또는 미네랄/지방산 기준 미달이 확인되었습니다.` : base;
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
      const base = parts.length ? parts.join(' ') : '주원료의 구성과 안전성을 검토했습니다.';
      const hasFatal = Boolean((ing?.fatalFlaws && ing.fatalFlaws.length > 0) || (ing?.fatalFlawConditions && ing.fatalFlawConditions.length > 0));
      return hasFatal ? `${base} ⛔️ 저품질/위험 신호 원료가 확인되었습니다.` : base;
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

  // 긴급 경고 배너 노출 판단 및 문구 매핑
  const firstRating = response?.foodRatings?.[0]?.rating;
  const hasUrgent = firstRating?.alertSeverity === 'urgent' || response?.overallSummary?.hasUrgentAlert === true;
  const urgentTitle = (() => {
    switch (firstRating?.alertMessageKey) {
      case 'low_reliability_feed':
        return '주요 영양소 최소 권장량 미달 의심';
      default:
        return firstRating?.alertCategory || '긴급 점검 필요';
    }
  })();
  const urgentDesc = (() => {
    switch (firstRating?.alertMessageKey) {
      case 'low_reliability_feed':
        return 'AAFCO/FEDIAF에서 제시하는 주요 영양소 최소 권장량에 부합하지 않음';
      default:
        return '해당 사료는 중요한 안전/영양 이슈가 발견되어 즉시 점검이 필요합니다.';
    }
  })();

  const overallGrades = [
    { label: '영양 정보 신뢰도', grade: reliabilityGrade },
    { label: '영양 설계 균형도', grade: balanceGrade },
    { label: '원료 품질', grade: ingredientGrade },
    { label: '제조 품질', grade: manufacturingGrade },
  ];

  // 뒤집힌 카드에 들어갈 표준 데이터 구조 생성기
  const buildBackSideContent = (sectionId: string): {
    summaryLine: string;
    strengths: string[];
    weaknesses: string[];
    fatalFlaws: string[];
  } => {
    const overallImprovements = response?.foodRatings?.[0]?.rating?.overallRating?.improvements ?? [];
    if (sectionId === '1') {
      const fatal = rel?.fatalFlaws ?? [];
      const summaryParts = [
        rel?.overallGrade ? `${rel.overallGrade} 등급` : undefined,
        typeof rel?.overallScore === 'number' ? `(${rel.overallScore}점)` : undefined,
        rel?.standardCompliance?.detail,
        rel?.transparencyLevel?.detail,
      ].filter(Boolean) as string[];
      const summaryLine = summaryParts.join(' ').trim();
      const strengthsArr = [rel?.standardCompliance?.detail, rel?.transparencyLevel?.detail].filter(Boolean) as string[];
      const weaknessesArr = overallImprovements.length > 0 ? overallImprovements.slice(0, 3).map(String) : ['특별한 결함 없음'];
      return { summaryLine, strengths: strengthsArr, weaknesses: weaknessesArr, fatalFlaws: fatal };
    }
    if (sectionId === '2') {
      const fatal = bal?.fatalFlaws ?? [];
      const summaryParts = [
        bal?.overallGrade ? `${bal.overallGrade} 등급` : undefined,
        typeof bal?.overallScore === 'number' ? `(${bal.overallScore}점)` : undefined,
        bal?.macronutrientRatio?.detail,
        bal?.mineralBalance?.detail,
        bal?.fattyAcidBalance?.detail,
      ].filter(Boolean) as string[];
      const summaryLine = summaryParts.join(' ').trim();
      const strengthsArr = [bal?.macronutrientRatio?.detail, bal?.mineralBalance?.detail, bal?.fattyAcidBalance?.detail].filter(Boolean) as string[];
      const weaknessesArr = overallImprovements.length > 0 ? overallImprovements.slice(0, 3).map(String) : ['특별한 결함 없음'];
      return { summaryLine, strengths: strengthsArr, weaknesses: weaknessesArr, fatalFlaws: fatal };
    }
    if (sectionId === '3') {
      const fatal = ing?.fatalFlaws ?? [];
      const summaryParts = [
        ing?.overallGrade ? `${ing.overallGrade} 등급` : undefined,
        typeof ing?.overallScore === 'number' ? `(${ing.overallScore}점)` : undefined,
        ing?.primaryIngredients?.detail,
        ing?.ingredientSafety?.detail,
      ].filter(Boolean) as string[];
      const summaryLine = summaryParts.join(' ').trim();
      const strengthsArr = [ing?.primaryIngredients?.detail, ing?.ingredientSafety?.detail].filter(Boolean) as string[];
      const weaknessesArr = overallImprovements.length > 0 ? overallImprovements.slice(0, 3).map(String) : ['특별한 결함 없음'];
      return { summaryLine, strengths: strengthsArr, weaknesses: weaknessesArr, fatalFlaws: fatal };
    }
    // sectionId === '4' (제조 품질)
    const fatal = mfg?.fatalFlaws ?? [];
    const summaryParts = [
      mfg?.overallGrade ? `${mfg.overallGrade} 등급` : undefined,
      typeof mfg?.overallScore === 'number' ? `(${mfg.overallScore}점)` : undefined,
      mfg?.countryReliability?.detail,
    ].filter(Boolean) as string[];
    const summaryLine = summaryParts.join(' ').trim();
    const strengthsArr = [mfg?.countryReliability?.detail].filter(Boolean) as string[];
    const weaknessesArr = overallImprovements.length > 0 ? overallImprovements.slice(0, 3).map(String) : ['특별한 결함 없음'];
    return { summaryLine, strengths: strengthsArr, weaknesses: weaknessesArr, fatalFlaws: fatal };
  };

  const detailedAssessments = [
    {
      id: '1',
      title: '영양 정보 신뢰도',
      items: [
        { label: '국제 표준\n기준 충족도', grade: rel?.standardCompliance?.grade ?? 'N/A' },
        { label: '영양 정보\n공개 수준', grade: rel?.transparencyLevel?.grade ?? 'N/A' },
        // { label: '종합 신뢰도\n(요약)', grade: rel?.overallGrade ?? 'N/A' },
      ]
    },
    {
      id: '2',
      title: '영양 설계 균형도',
      items: [
        { label: '주요 영양소\n비율 및 적정성', grade: bal?.macronutrientRatio?.grade ?? 'N/A' },
        { label: '핵심 미네랄\n균형도', grade: bal?.mineralBalance?.grade ?? 'N/A' },
        { label: '필수 지방산\n충족도', grade: bal?.fattyAcidBalance?.grade ?? 'N/A' },
      ]
    },
    {
      id: '3',
      title: '원료 품질',
      items: [
        { label: '주원료의 구성\n및 영양 밀도', grade: ing?.primaryIngredients?.grade ?? 'N/A' },
        { label: '원료의 안전성\n및 기능성', grade: ing?.ingredientSafety?.grade ?? 'N/A' },
        // { label: '종합 원료 품질\n(요약)', grade: ing?.overallGrade ?? 'N/A' },
      ]
    },
    {
      id: '4',
      title: '제조 품질',
      items: [
        { label: '제조국의\n신뢰도', grade: mfg?.countryReliability?.grade ?? 'N/A' },
        // { label: '제조 품질\n종합', grade: mfg?.overallGrade ?? 'N/A' },
      ]
    },
  ];

  return (
    <section id="food-analysis" className="pt-10 md:pt-20">
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
            {detailedAssessments.map((assessment) => {
              // const isFlipped = flippedCards.has(assessment.id); // 카드 뒤집기 애니메이션 비활성화
              const isFlipped = false; // 항상 앞면만 표시
              const back = buildBackSideContent(assessment.id);
              return (
                <div
                  key={assessment.id}
                  className="relative h-[500px] md:h-[400px] cursor-pointer md:cursor-default"
                // onClick={() => {
                //   // 모바일에서만 클릭으로 토글
                //   if (window.innerWidth < 768) {
                //     toggleCard(assessment.id);
                //   }
                // }}
                // onMouseEnter={() => {
                //   // 데스크탑에서만 호버로 뒤집기
                //   if (window.innerWidth >= 768) {
                //     flipCard(assessment.id);
                //   }
                // }}
                // onMouseLeave={() => {
                //   // 데스크탑에서만 호버 아웃으로 원복
                //   if (window.innerWidth >= 768) {
                //     unflipCard(assessment.id);
                //   }
                // }}
                >
                  {/* 카드 컨테이너 */}
                  <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'
                      }`}
                  >
                    {/* 앞면 */}
                    <div className="absolute inset-0 w-full h-full bg-white rounded-[20px] p-6 backface-hidden flex flex-col">
                      <div className="flex items-center gap-3 mb-6 md:mb-6">
                        <span className="text-[14px] font-bold text-[#003DA5] bg-blue-50 px-3 py-1 rounded-full">
                          {assessment.id}
                        </span>
                        <h4 className="text-[18px] md:text-[25px] font-semibold text-[#003DA5]">
                          {assessment.title}
                        </h4>
                      </div>

                      <div className="flex-1 space-y-4 md:space-y-5">
                        {assessment.items.map((item, index) => (
                          <RatingBar
                            key={index}
                            label={item.label}
                            selectedGrade={item.grade}
                            orderNumber={`${assessment.id}-${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 뒷면 */}
                    <div className="absolute inset-0 w-full h-full bg-white rounded-[20px] px-6 pt-6 pb-2 backface-hidden rotate-y-180 flex">
                      <div className="flex flex-col w-full h-full">
                        {/* 헤더 */}
                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-[14px] font-bold text-[#003DA5] bg-blue-50 px-3 py-1 rounded-full">
                            {assessment.id}
                          </span>
                          <h4 className="text-[18px] md:text-[22px] font-semibold text-[#003DA5]">
                            {assessment.title}
                          </h4>
                        </div>

                        {/* 스크롤 가능한 콘텐츠 영역 */}
                        <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                          <div className="space-y-3">
                            {/* 한 줄 평 카드 */}
                            <div className="bg-[#F5F5F5] rounded-[14px] px-4 py-3">
                              <div className="text-[14px] md:text-[16px] font-semibold text-[#1E1E1E] mb-2">📝 한 줄 평</div>
                              <p className="text-[13px] md:text-[15px] leading-[20px] md:leading-[22px] text-[#1E1E1E]">{back.summaryLine}</p>
                            </div>

                            {/* 장점 카드 */}
                            <div className="bg-[#F5F5F5] rounded-[14px] px-4 py-3">
                              <div className="text-[14px] md:text-[16px] font-semibold text-[#1E1E1E] mb-2">👍 사료의 주요 장점</div>
                              {back.strengths.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {back.strengths.slice(0, 3).map((s, i) => (
                                    <li key={i} className="text-[13px] md:text-[15px] text-[#1E1E1E]">{s}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[13px] md:text-[15px] text-[#6B7280]">제공된 장점 정보가 없습니다.</p>
                              )}
                            </div>

                            {/* 단점 및 주의사항 카드 */}
                            <div className="bg-[#F5F5F5] rounded-[14px] px-4 py-3">
                              <div className="text-[14px] md:text-[16px] font-semibold text-[#1E1E1E] mb-2">👀 사료의 주요 단점 및 주의사항</div>
                              {back.weaknesses.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {back.weaknesses.slice(0, 3).map((w, i) => (
                                    <li key={i} className="text-[13px] md:text-[15px] text-[#1E1E1E]">{w}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[13px] md:text-[15px] text-[#6B7280]">주의사항 정보가 없습니다.</p>
                              )}
                            </div>

                            {/* 치명적 결함(섹션별) */}
                            {Array.isArray(back.fatalFlaws) && back.fatalFlaws.length > 0 && (
                              <div className="bg-[#FFF1F0] border border-[#FF6A3D]/40 text-[#B42318] rounded-[14px] px-4 py-3">
                                <div className="text-[14px] md:text-[16px] font-semibold mb-1">⛔ 치명적 결함</div>
                                <ul className="list-disc pl-5 space-y-1">
                                  {back.fatalFlaws.slice(0, 3).map((f, i) => (
                                    <li key={i} className="text-[13px] md:text-[15px]">{f}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* 긴급 경고 배너 */}
                            {hasUrgent && (
                              <div className="bg-[#FF6A3D] text-white rounded-[16px] px-5 py-4">
                                <div className="text-[15px] md:text-[16px] font-semibold mb-2">🚫 {urgentTitle}</div>
                                <div className="text-[13px] md:text-[15px] leading-[20px] md:leading-[22px]">
                                  {urgentDesc}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 하단 링크 */}
                        {/* <div className="mt-3 text-center pt-1">
                          <button type="button" className="text-[#003DA5] text-[14px] md:text-[15px] font-medium hover:underline">
                            해당 사료 전체 프로필 확인하기 →
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
