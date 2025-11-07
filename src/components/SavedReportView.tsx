'use client';

import { FoodInfo, DogInfo, FoodEvaluation } from '@/types/report';
import Pill from '@/components/common/Pill';
import EvalCard from '@/components/common/EvalCard';
import InfoBar from '@/components/common/InfoBar';
import RatingBar from '@/components/common/RatingBar';

interface SavedReportViewProps {
  foodInfo: FoodInfo;
  dogInfo: DogInfo;
  evaluation: FoodEvaluation;
}

export default function SavedReportView({ foodInfo, dogInfo, evaluation }: SavedReportViewProps) {
  const results = evaluation.categoryResults;

  // 카테고리별 등급 매핑
  const reliabilityGrade = results['1-1_nutrition_reliability'].grade;
  const transparencyGrade = results['1-2_transparency'].grade;
  const macroGrade = results['2-1_macro_balance'].grade;
  const mineralGrade = results['2-2_mineral_balance'].grade;
  const fattyGrade = results['2-3_fatty_acid_balance'].grade;
  const fattyAcidGrade = results['2-3_fatty_acid_balance'].grade;
  const ingredientGrade = results['3-1_ingredient_quality'].grade;
  const safetyGrade = results['4_safety_certification'].grade;
  const manufacturingGrade = results['3-2_manufacturing_quality'].grade;

  // 종합 등급 카드용 데이터 (섹션 등급 사용)
  const overallGrades = [
    { label: '영양 정보 신뢰도', grade: evaluation.sectionResults.nutrition_reliability.grade },
    { label: '영양 설계 균형도', grade: evaluation.sectionResults.nutrition_balance.grade },
    { label: '원료 품질', grade: evaluation.sectionResults.ingredient_quality.grade },
    { label: '제조 품질', grade: evaluation.sectionResults.manufacturing_quality.grade },
  ];

  // 세부 평가 데이터
  const detailedAssessments = [
    {
      id: '1',
      title: '영양 정보 신뢰도',
      items: [
        { label: '국제 표준\n기준 충족도', grade: reliabilityGrade },
        { label: '영양 정보\n공개 수준', grade: transparencyGrade },
      ]
    },
    {
      id: '2',
      title: '영양 설계 균형도',
      items: [
        { label: '주요 영양소\n비율 및 적정성', grade: macroGrade },
        { label: '핵심 미네랄\n균형도', grade: mineralGrade },
        { label: '필수 지방산\n충족도', grade: fattyAcidGrade },
      ]
    },
    {
      id: '3',
      title: '원료 품질',
      items: [
        { label: '주원료의 구성\n및 영양 밀도', grade: ingredientGrade },
        { label: '원료의 안전성\n및 기능성', grade: safetyGrade },
      ]
    },
    {
      id: '4',
      title: '제조 품질',
      items: [
        { label: '제조국의\n신뢰도', grade: manufacturingGrade },
      ]
    },
  ];

  // 설명 텍스트 생성 함수들 - displayText만 사용
  const getReliabilityText = () => {
    const result1 = results['1-1_nutrition_reliability'];
    const result2 = results['1-2_transparency'];
    const parts = [];
    if (result1.displayText) parts.push(result1.displayText);
    if (result2.displayText) parts.push(result2.displayText);
    return parts.join('\n');
  };

  const getBalanceText = () => {
    const macroResult = results['2-1_macro_balance'];
    const mineralResult = results['2-2_mineral_balance'];
    const fattyResult = results['2-3_fatty_acid_balance'];

    const parts = [];
    if (macroResult.displayText) parts.push(macroResult.displayText);
    if (mineralResult.displayText) parts.push(mineralResult.displayText);
    if (fattyResult.displayText) parts.push(fattyResult.displayText);

    return parts.join('\n');
  };

  const getIngredientText = () => {
    const result1 = results['3-1_ingredient_quality'];
    const result2 = results['4_safety_certification'];
    const parts = [];
    if (result1.displayText) parts.push(result1.displayText);
    if (result2.displayText) parts.push(result2.displayText);
    return parts.join('\n');
  };

  const getManufacturingText = () => {
    const result = results['3-2_manufacturing_quality'];
    return result.displayText || '';
  };

  return (
    <section id="food-analysis" className="pt-10 md:pt-20 bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 제목 */}
        <div className="text-center mb-[30px] md:mb-[60px]">
          <p className="text-[#000000] font-medium text-[20px] mb-2">
            사료 분석 요약
          </p>
          <h1 className="text-[#003DA5] font-semibold text-[28px] md:text-[45px] mb-4">
            이 사료, 믿고 먹일 수 있을까?
          </h1>

          <p className="text-[#525252] font-normal text-[18px] md:text-[28px] max-w-4xl mx-auto">
            {(() => {
              const name = dogInfo?.name || '반려견';
              const last = name.charCodeAt(name.length - 1);
              const isHangul = last >= 0xac00 && last <= 0xd7a3;
              const hasJong = isHangul ? ((last - 0xac00) % 28 !== 0) : false;
              const josa = hasJong ? '과' : '와';
              return `${name}${josa}는 별개로 신뢰할 수 있는 제품인지 평가해요!`;
            })()}
          </p>

          <p className="text-[#666666] font-normal text-[14px] md:text-[16px] max-w-4xl mx-auto mt-3">
            무료 버전의 경우 최대 1개, <br className="md:hidden" />
            <span className="hidden md:inline"> </span>유료 버전의 경우 최대 3개와 영양제까지
            <br className="md:hidden" />
            <span className="hidden md:inline"> </span>모두 분석해 드립니다.
          </p>
        </div>

        <div className="bg-[#F2F2F2] rounded-[40px] px-6 py-8 md:px-[138px] md:py-[74px]">
          {/* 사료 정보 */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Pill>주식 분석 요약</Pill>
            </div>

            <h2 className="text-[30px] md:text-[35px] font-semibold text-[#003DA5] mb-6">
              {foodInfo.brand_name} - {foodInfo.product_name}
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
                />
              ))}
            </div>

            {/* 요약 박스들 */}
            <div className="space-y-3 mb-10">
              {(() => {
                const reliabilityText = getReliabilityText();
                return reliabilityText && reliabilityText.trim() !== '' ? (
                  <InfoBar>
                    <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">🔍 영양 정보 신뢰도</div>
                    <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">
                      {reliabilityText.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < reliabilityText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </InfoBar>
                ) : null;
              })()}
              {(() => {
                const balanceText = getBalanceText();
                return balanceText && balanceText.trim() !== '' ? (
                  <InfoBar>
                    <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">⚖️ 영양 설계 균형도</div>
                    <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">
                      {balanceText.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < balanceText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </InfoBar>
                ) : null;
              })()}
              {(() => {
                const ingredientText = getIngredientText();
                return ingredientText && ingredientText.trim() !== '' ? (
                  <InfoBar>
                    <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">🥗 원료 품질</div>
                    <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">
                      {ingredientText.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < ingredientText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </InfoBar>
                ) : null;
              })()}
              {(() => {
                const manufacturingText = getManufacturingText();
                return manufacturingText && manufacturingText.trim() !== '' ? (
                  <InfoBar>
                    <div className="text-[18px] md:text-[20px] font-semibold text-[#000000]">⚙️ 제조 품질</div>
                    <div className="text-[16px] md:text-[18px] font-normal text-[#1E1E1E]">
                      {manufacturingText.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < manufacturingText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </InfoBar>
                ) : null;
              })()}
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
              // 각 항목의 치명적 결함 가져오기
              const getItemFatalFlaws = (assessmentId: string, itemIndex: number): string[] => {
                const itemMapping: Record<string, Record<number, string>> = {
                  '1': {
                    0: '1-1_nutrition_reliability',
                    1: '1-2_transparency',
                  },
                  '2': {
                    0: '2-1_macro_balance',
                    1: '2-2_mineral_balance',
                    2: '2-3_fatty_acid_balance',
                  },
                  '3': {
                    0: '3-1_ingredient_quality',
                    1: '4_safety_certification',
                  },
                  '4': {
                    0: '3-2_manufacturing_quality',
                  }
                };

                const categoryKey = itemMapping[assessmentId]?.[itemIndex];
                if (!categoryKey) return [];

                const category = results[categoryKey as keyof typeof results];
                if (!category) return [];

                // fatalFlaws 배열이 있으면 반환 (빈 문자열 제외)
                if (category.fatalFlaws && category.fatalFlaws.length > 0) {
                  return category.fatalFlaws.filter(f => f.trim() !== '');
                }

                // C등급이면 "치명적 결함" 메시지 반환
                if (category.grade === 'C') {
                  return ['치명적 결함'];
                }

                return [];
              };

              return (
                <div
                  key={assessment.id}
                  className="relative h-auto md:h-[400px]"
                >
                  <div className="w-full bg-white rounded-[20px] p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[14px] font-bold text-[#003DA5] bg-blue-50 px-3 py-1 rounded-full">
                        {assessment.id}
                      </span>
                      <h4 className="text-[18px] md:text-[25px] font-semibold text-[#003DA5]">
                        {assessment.title}
                      </h4>
                    </div>

                    <div className="flex-1 space-y-4 md:space-y-5">
                      {assessment.items.map((item, index) => {
                        const fatalFlaws = getItemFatalFlaws(assessment.id, index);

                        // 치명적 결함이 있는 항목은 주황색 바로 표시
                        if (fatalFlaws.length > 0) {
                          return (
                            <div key={index} className="relative">
                              {/* 모바일 타이틀 */}
                              <div className="md:hidden mb-5">
                                <h5 className="text-[13px] font-medium text-[#003DA5] text-center">
                                  {`${assessment.id}-${index + 1} ${item.label.replace('\n', ' ')}`}
                                </h5>
                              </div>
                              {/* 주황색 바 */}
                              <div
                                className="bg-[#F95C3B] rounded-[40px] md:rounded-[80px] flex flex-col md:flex-row items-center justify-between relative overflow-visible py-[9px] px-[4px] md:py-[10px] md:pl-[20px] md:pr-[39px] min-h-[68px] md:min-h-[80px]"
                                style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)' }}
                              >
                                {/* 데스크톱 라벨 */}
                                <span className="hidden md:block text-[12px] md:text-[17px] font-bold text-white leading-tight whitespace-pre-line text-center w-[90px] md:w-[110px] md:flex-shrink-0">
                                  {item.label}
                                </span>
                                {/* 우측 메시지 */}
                                <div className="flex-1 flex flex-col items-start justify-center w-full md:w-auto px-[12px] md:px-0 md:pl-0 md:ml-7">
                                  {fatalFlaws.map((flaw, fIndex) => (
                                    <div key={fIndex} className="text-white text-[14px] md:text-[16px] font-semibold mb-1 last:mb-0">
                                      ⛔️ {flaw}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // 정상 항목은 일반 RatingBar로 표시
                        return (
                          <RatingBar
                            key={index}
                            label={item.label}
                            selectedGrade={item.grade}
                            orderNumber={`${assessment.id}-${index + 1}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 즉시 개선이 필요한 심각한 문제 섹션 */}
          {(() => {
            const allFatalFlaws: string[] = [];

            // 모든 카테고리의 fatalFlaws 수집 (빈 문자열 제외)
            Object.values(results).forEach((result) => {
              if (result.fatalFlaws && result.fatalFlaws.length > 0) {
                const validFlaws = result.fatalFlaws.filter((f: string) => f.trim() !== '');
                allFatalFlaws.push(...validFlaws);
              }
            });

            if (allFatalFlaws.length === 0) return null;

            return (
              <div className="mt-8 md:mt-10">
                <div className="bg-[#FFF1F0] border-2 border-[#DC2626] rounded-[20px] px-6 py-6 md:px-8 md:py-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[24px]">⛔</span>
                    <h3 className="text-[#DC2626] font-bold text-[20px] md:text-[24px]">
                      즉시 개선이 필요한 심각한 문제
                    </h3>
                  </div>
                  <div className="bg-white rounded-[14px] px-5 py-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {allFatalFlaws.map((flaw, index) => (
                        <li key={index} className="text-[#DC2626] text-[15px] md:text-[17px] leading-[22px] md:leading-[26px]">
                          {flaw}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-[#B91C1C] text-[14px] md:text-[16px] mt-4 leading-relaxed">
                    위 문제들은 반려견의 건강에 직접적인 영향을 미칠 수 있으므로, 사료 교체를 적극 권장합니다.
                  </p>
                </div>
              </div>
            );
          })()}

          {/* 젤리대에서 꼭 전하고 싶은 말 */}
          {evaluation.customMessage && evaluation.customMessage.trim() !== '' && (
            <div className="mt-8 md:mt-10">
              <div className="bg-[#E8F4F8] border-2 border-[#003DA5] rounded-[20px] px-6 py-6 md:px-8 md:py-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[24px]">💬</span>
                  <h3 className="text-[#003DA5] font-bold text-[20px] md:text-[24px]">
                    젤리대에서 꼭 전하고 싶은 말
                  </h3>
                </div>
                <div className="bg-white rounded-[14px] px-5 py-4">
                  <p className="text-[#1E1E1E] text-[15px] md:text-[17px] leading-[22px] md:leading-[26px] whitespace-pre-wrap">
                    {evaluation.customMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

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
}
