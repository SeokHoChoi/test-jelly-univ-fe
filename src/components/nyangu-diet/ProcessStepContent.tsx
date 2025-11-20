'use client';

import AccordionItem from './AccordionItem';

interface ProcessStepContentProps {
  stepId: number;
}

export default function ProcessStepContent({ stepId }: ProcessStepContentProps) {
  if (stepId === 1) {
    // 01 사료 품질 심층 분석
    return (
      <div>
        <p className="text-[14px] md:text-[16px] text-gray-700 mb-6 leading-relaxed">
          현재 급여 중인 사료(주식)가 우리 아이와는 별개로, 객관적으로 얼마나 잘 만들어진 &apos;신뢰할 수 있는 제품&apos;인지 평가합니다.
        </p>
        <div className="space-y-0">
          <AccordionItem title="사료 품질 종합 평가">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                현재 급여 중인 사료(주식)가 우리 아이와는 별개로, 객관적으로 얼마나 잘 만들어진 &apos;신뢰할 수 있는 제품&apos;인지 평가합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                영양 정보 신뢰도, 설계 균형도, 원료 및 제조 품질까지 총 4가지 항목을 젤리대학교의 사료 등급 기준에 맞춰 분석하고 주요 장단점과 함께 알려드립니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="주식 자격 검증">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                이 제품이 단독으로 급여 가능한 &apos;완전 균형식&apos;인지, 국제 표준 기준을 제시하는 AAFCO와 FEDIAF의 보증서가 있는지 평가합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                냥구의 현재 주식인 &apos;아카나 라이트 앤 피트 레시피&apos;와 &apos;디어니스트 키친 탈수건조 그레인프리 피쉬&apos;의 경우 제조사가 소비자에게 보내는 법적인 약속 &apos;영양 적절성 선언(Nutritional Adequacy Statement)&apos;이라는 공식적인 보증 문구가 기재되어 있습니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                꼭 기억해야 할 점은 &apos;영양 적절성 선언문&apos;과 &apos;AAFCO 기준 설계&apos;라고 판매 페이지에 적은 것과는 다릅니다. 실제 많은 사료가 &apos;AAFCO 기준 설계&apos;라고 하지만 실제 분석시 기준을 충족하지 못하는 경우가 꽤 많습니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="핵심 에너지원 구성의 적정성">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                사료의 핵심 에너지원인 단백질, 지방이 국제 표준을 충족하는지, 그리고 실제로는 어떤 영양소가 주된 에너지원으로 사용되도록 설계되었는지 심층적으로 분석합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                해당 항목의 경우, 제조사에서 제공하는 AS FED(급여 기준)이 아닌, 수분을 제외한 DM(Dry Matter, 건물 기준)으로 수치를 전환하여 평가합니다.
              </p>
              <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-lg p-4 mt-4">
                <p className="text-[13px] md:text-[15px] font-semibold text-[#003DA5] mb-2">국제 표준 기준에서 제시하는 &apos;성견 사료&apos; 최소 요구량(DM 기준)</p>
                <ul className="space-y-1 text-[12px] md:text-[14px] text-gray-700">
                  <li>• 단백질: AAFCO 최소 18%, FEDIAF 최소 20%</li>
                  <li>• 지방: AAFCO & FEDIAF 최소 5.5%</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-[13px] md:text-[15px] font-semibold text-gray-900 mb-2">냥구의 주식 사례</p>
                <p className="text-[12px] md:text-[14px] text-gray-700 mb-2">아카나 라이트 앤 피트 레시피</p>
                <p className="text-[12px] md:text-[14px] text-gray-700 leading-relaxed">
                  조단백 39.8%, 조지방 12.5%으로 국제 표준 기준에서 제시하는 최소 요구량을 모두 충족합니다. 또한 탄수화물의 경우, 30.7%로 일반적으로 추천되는 20~40%로 적절합니다.
                </p>
                <p className="text-[12px] md:text-[14px] text-gray-700 leading-relaxed mt-2">
                  기본 요구량을 충족했다고 해서 모든 사료가 같은 방식으로 에너지를 내는 것은 아닙니다. &apos;실제 에너지 기여도(%ME)&apos; 분석을 통해 이 사료의 진짜 &apos;에너지 설계 컨셉&apos;을 꿰뚫어 볼 수 있습니다.
                </p>
                <p className="text-[12px] md:text-[14px] text-gray-700 leading-relaxed mt-2">
                  아카나의 경우 단백질이 39.5%로 주된 에너지원이며 지방과 탄수화물까지 &apos;균형 잡힌 에너지&apos; 사료로 설계되었습니다. 세 영양소가 고르게 에너지를 공급하는 표준적인 설계 컨셉을 가집니다.
                </p>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="주요 영양소 비율의 적정성">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                사료에 포함된 개별 영양소의 양을 넘어, 영양소들 간의 &apos;균형&apos;과 &apos;상호작용&apos;이 잘 설계되었는지 심층적으로 분석합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                평가는 제품이 표방하는 생애주기의 일반적인 권장 범위를 기준으로 이루어집니다. 단백질:에너지(P:E Ratio), 칼슘:인, 오메가6:오메가3 총 3가지 주요 영양소 비율을 국제 표준 기준에 적절하게 설계되었는지 알려드립니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="필수 영양소 포함 여부">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                이 사료가 단독으로만 급여해도 생명 유지와 기본적인 건강에 필요한 모든 영양소를 공급하는 &apos;완전 균형식(주식)&apos;으로서의 자격을 갖추었는지를 평가합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                반려견은 하루에 약 40가지의 필수 영양소를 섭취해야 합니다. AAFCO/FEDIAF가 요구하는 필수 아미노산, 필수 지방산, 비타민, 미네랄의 포함 여부를, 소비자가 가장 확실하게 확인할 수 있는 방법인 &apos;AAFCO/FEDIAF 영양 적절성 선언&apos; 문구의 유무를 통해 최종적으로 판단합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                만약 영양 적절성 선언 문구가 없을 경우, 제조사에서 제공하는 영양 분석표와 원재료를 바탕으로 준공식 보증, 전문가적 추정, 보증 불가로 나누어 정보를 제공합니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="기능성 영양소 포함 여부">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                생명 유지에 필수적이지는 않지만, 특정 건강 문제 예방이나 기능 개선에 도움을 줄 수 있는 &apos;기능성 원료(옵션)&apos;의 함유 현황을 분석합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                관절 건강(글루코사민 등), 장 건강(유산균 등), 두뇌 및 피부 건강(DHA/EPA) 등, 제조사가 우리 아이의 더 건강한 삶을 위해 어떤 특별한 성분들을 추가했는지 살펴봅니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                이를 통해 이 사료가 우리 아이의 개별적인 건강 고민에 도움을 줄 수 있는 잠재력을 가졌는지 평가합니다.
              </p>
            </div>
          </AccordionItem>
        </div>
      </div>
    );
  }

  if (stepId === 2) {
    // 02 현재 식단 분석
    return (
      <div>
        <p className="text-[14px] md:text-[16px] text-gray-700 mb-6 leading-relaxed">
          현재 급여 중인 제품이 현재 건강 상태와 필요한 영양소에 맞는지, 그리고 현재 급여 방법이 적절한지 진단하고 솔루션을 제공합니다. 우리 아이 맞춤 데이터를 확인해보세요!
        </p>
        <div className="space-y-0">
          <AccordionItem title="현재 상태 진단">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                보호자가 제출한 응답을 바탕으로 체중 및 신체충실도(BCS)와 생애주기 평가를 진행합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                주요하게는 아이의 종 특성과 나이 그리고 비만도 등을 바탕으로 식단 설계의 가장 기본이 되는 방향성을 설정합니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="목표 체중 및 하루 권장 칼로리 설정">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                현재 신체 상태를 과학적으로 분석하여, 건강을 위한 현실적인 &apos;목표 체중&apos;과 &apos;하루 목표 섭취 칼로리&apos;를 설정합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                기본적으로 NRC(국립연구위원회, National Research Council)에서 제시하는 생애주기와 중성화 여부, 활동 수준 등을 바탕으로 하되, 임상학적으로 권장되는 수준을 고려하여 최대한 과체중과 비만을 예방하는 방향으로 제시합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                만약, 아이가 이미 과체중 또는 비만일 경우 안전하고 효과적인 체중 감량을 고려하여 목표 체중과 하루 권장 칼로리를 설정합니다.
              </p>
              <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-lg p-4 mt-4">
                <p className="text-[12px] md:text-[14px] text-gray-600">
                  *NRC란? 반려견과 반려묘를 비롯한 다양한 동물의 생애주기별, 활동량별 필수 영양소 요구량과 급여권장량을 과학적으로 제시하는 가장 권위 있는 표준 가이드라인을 만드는 기관입니다.
                </p>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="현 식단의 실제 섭취 현황 분석">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                앞서 설정한 목표 체중과 칼로리에 따른 섭취해야 할 단백질(g), 지방(g), 탄수화물(g), 음수량과 비교하기 위해, 현재 식단의 섭취량과 칼로리 그리고 각 영양소의 실제 섭취 함량을 분석합니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="섭취 영양소의 목표 설정">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                현재 우리 아이의 상태에 맞는 하루에 섭취해야 할 목표 영양소를 kcal 기준으로 설정합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                반려견에게 사료를 kcal(칼로리) 기준으로 급여해야 하는 이유는, 각 개체의 체중, 연령 그리고 활동량 등에 따라 필요한 에너지(칼로리) 양이 다르기 때문에 정확한 1일 에너지 요구량을 맞추기 위해서입니다. 이러한 방법은 국제 영양 가이드라인에서도 표준 방법으로 권장되고 있습니다.
              </p>
              <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-lg p-4 mt-4">
                <p className="text-[13px] md:text-[15px] font-semibold text-[#003DA5] mb-2">이유와 중요성</p>
                <ul className="space-y-2 text-[12px] md:text-[14px] text-gray-700">
                  <li>• 반려견의 적정 체중 유지와 비만 예방, 건강한 성장 및 활동 지원을 위해 &quot;하루에 꼭 필요한 에너지(칼로리)&quot;를 먼저 산출합니다.</li>
                  <li>• 사료별로 영양 조성이나 g(그램)당 칼로리가 다르므로, g 단위가 아닌 kcal 단위로 맞춰야 개별 맞춤 급여가 가능합니다.</li>
                  <li>• 동일 무게의 사료라도 제품에 따라 칼로리가 1.5~3배 이상 차이 날 수 있어, kcal 기준 급여가 아니면 과식·영양불균형 위험이 높아집니다.</li>
                </ul>
                <p className="text-[12px] md:text-[14px] text-gray-700 mt-3 leading-relaxed">
                  또한 젤리대학교는 &apos;실생활 적용 가능한 급여 플랜&apos;을 제공하기 위해 자체 프레임워크인 &apos;뉴트리맵&apos;을 통해 아이들의 섭취 영양소 목표를 설정하여 제공합니다.
                </p>
                <div className="bg-white rounded-lg p-3 mt-3">
                  <p className="text-[12px] md:text-[14px] font-semibold text-gray-900 mb-1">*젤리대학교 뉴트리 맵이란?</p>
                  <p className="text-[12px] md:text-[14px] text-gray-700 leading-relaxed">
                    AAFCO, NRC 등 공신력 있는 국제 영양 기준이 제시하는 &apos;과학적 이상&apos;과 실제 시장의 제품으로 달성 가능한 &apos;현실&apos; 사이의 간극을 메우기 위해 만들어졌습니다. 이 맵은 반려견의 생애주기, 중성화 여부, 건강 상태(과체중/비만 등)에 따라, 과학적이면서도 실현 가능한 최적의 영양 목표를 제시하는 독자적인 맞춤형 가이드라인입니다.
                  </p>
                </div>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="현재 vs 목표 영양 섭취량 비교 분석">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                앞서 설정한 목표 체중과 칼로리에 따른 섭취해야 할 단백질(g), 지방(g), 탄수화물(g), 음수량과 비교하기 위해, 현재 식단의 섭취량과 칼로리 그리고 각 영양소의 실제 섭취 함량을 분석합니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                이를 바탕으로 현재 주식의 급여량이 얼마나, 어떻게 조정이 필요할지 파악할 수 있습니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="현재 주식과 영양제의 상호작용 평가">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                &apos;과하면 부족한 것보다 못하다&apos;라는 말이 있습니다. 영양제는 잘 짜여진 &apos;주식+보조식&apos;에 부족함을 보충해주는 목적으로 급여하시는 것을 추천드립니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                이러한 젤리대학교의 철학을 반영하여 영양학적 밸런스를 분석하여 제공해 드립니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem title="현재 식단의 종합 결론 및 솔루션">
            <div className="space-y-3">
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                현재 식단의 최종 평가와 그에 따른 실행 계획을 제시해 드립니다.
              </p>
              <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
                실행 계획에는 권장 사항, 급여 방법, 제한 사항, 장기 모니터링 등의 항목으로 구성되어 있고 현재 주식을 유지한다는 전제하에 결과를 제공해 드립니다.
              </p>
            </div>
          </AccordionItem>
        </div>
      </div>
    );
  }

  if (stepId === 3) {
    // 03 맞춤 식단 설계
    return (
      <div>
        <p className="text-[14px] md:text-[16px] text-gray-700 mb-8 leading-relaxed">
          앞서 분석한 결과를 모두 종합하여, 우리 아이의 영양 목표를 충족하는 2가지 타입의 맞춤 식단을 설계하여 제안합니다. AI로 설계하고 영양학 전문 수의사의 검토를 거쳐요!
        </p>

        {/* Type A 플랜 1: 구리 안심 및 점진적 체중 관리 */}
        <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 shadow-sm">
          {/* 헤더: 카쿠 식단 분석표 */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🐕</span>
            <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900">카쿠 식단 분석표</h3>
          </div>

          {/* 플랜 제목 배너 */}
          <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl p-4 mb-6">
            <h4 className="text-[16px] md:text-[18px] font-bold text-white">
              Type A &apos;구리 안심&apos; 및 점진적 체중 관리 플랜
            </h4>
          </div>

          {/* 신규 추천 주식(사료) 테이블 */}
          <div className="mb-6">
            {/* 모바일: 카드 형태 */}
            <div className="md:hidden border border-gray-200 rounded-xl p-4 bg-white">
              <div className="mb-3">
                <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[12px] font-bold">
                  신규 추천 주식(사료)
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                  <div className="text-[13px] text-gray-900 font-medium">아카나 라이트 앤 피트 레시피</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여량(g)</div>
                    <div className="text-[13px] text-gray-700 font-semibold">100</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">단백질(g)</div>
                    <div className="text-[13px] text-gray-700 font-semibold">35</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">지방(g)</div>
                    <div className="text-[13px] text-gray-700 font-semibold">11</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">탄수화물(g)</div>
                    <div className="text-[13px] text-gray-700 font-semibold">27</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-[11px] text-gray-500 mb-1">열량(kcal)</div>
                  <div className="text-[15px] text-gray-900 font-bold">307</div>
                </div>
              </div>
            </div>

            {/* 데스크톱: 테이블 형태 */}
            <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] md:text-[14px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">구분</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">제품명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">급여 수량</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">급여량(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">단백질(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">지방(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">탄수화물(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">열량(kcal)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[12px] md:text-[13px] font-bold">
                          신규 추천 주식(사료)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">아카나 라이트 앤 피트 레시피</td>
                      <td className="px-4 py-3 text-center text-gray-500">-</td>
                      <td className="px-4 py-3 text-center text-gray-700">100</td>
                      <td className="px-4 py-3 text-center text-gray-700">35</td>
                      <td className="px-4 py-3 text-center text-gray-700">11</td>
                      <td className="px-4 py-3 text-center text-gray-700">27</td>
                      <td className="px-4 py-3 text-center text-gray-900 font-bold">307</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 추가 설명 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
              FEDIAF 인증 저지방/고단백/저칼로리 주식. 1kg당 구리 11mg 함유 (3.58mg/Mcal)로 구리 제한 목표에 부합하며, 지방 11%, 단백질 35% 설계로 체중 관리에 최적화되어 있습니다.
            </p>
          </div>

          {/* 기존 제품 영양제 테이블 */}
          <div className="mb-6">
            {/* 모바일: 카드 형태 */}
            <div className="md:hidden space-y-3">
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="mb-3">
                  <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] font-bold">
                    기존 제품 영양제
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">페티테일 참 유산균</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여 수량</div>
                    <div className="text-[13px] text-gray-700 font-semibold">하루 1포</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">설명</div>
                    <div className="text-[12px] text-gray-700 leading-relaxed">장 건강 및 면역력 유지를 위해 꾸준히 급여하는 것을 권장합니다.</div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="mb-3">
                  <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] font-bold">
                    기존 제품 영양제
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">페피데일 참 오메가3</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여 수량</div>
                    <div className="text-[13px] text-gray-700 font-semibold">하루 1알</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">설명</div>
                    <div className="text-[12px] text-gray-700 leading-relaxed">주식만으로 보충할 수 없는 EPA/DHA를 보충하여 피부 및 항염 관리를 강화합니다.</div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="mb-3">
                  <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] font-bold">
                    기존 제품 영양제
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">Neprofin Pet®</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여 수량</div>
                    <div className="text-[13px] text-gray-700 font-semibold">하루 1스쿱</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">설명</div>
                    <div className="text-[12px] text-gray-700 leading-relaxed">소화 효소 및 항염 효소를 통해 소화기 건강과 관절 건강을 지원합니다. (건강 관리 목적 1일 1회 1스쿱으로 조정)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 데스크톱: 테이블 형태 */}
            <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] md:text-[14px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">구분</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">제품명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">급여 수량</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] md:text-[13px] font-bold">
                          기존 제품 영양제
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">페티테일 참 유산균</td>
                      <td className="px-4 py-3 text-center text-gray-700">하루 1포</td>
                      <td className="px-4 py-3 text-gray-700">장 건강 및 면역력 유지를 위해 꾸준히 급여하는 것을 권장합니다.</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] md:text-[13px] font-bold">
                          기존 제품 영양제
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">페피데일 참 오메가3</td>
                      <td className="px-4 py-3 text-center text-gray-700">하루 1알</td>
                      <td className="px-4 py-3 text-gray-700">주식만으로 보충할 수 없는 EPA/DHA를 보충하여 피부 및 항염 관리를 강화합니다.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-[12px] md:text-[13px] font-bold">
                          기존 제품 영양제
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">Neprofin Pet®</td>
                      <td className="px-4 py-3 text-center text-gray-700">하루 1스쿱</td>
                      <td className="px-4 py-3 text-gray-700">소화 효소 및 항염 효소를 통해 소화기 건강과 관절 건강을 지원합니다. (건강 관리 목적 1일 1회 1스쿱으로 조정)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 요약 행 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-6 text-[13px] md:text-[14px]">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">급여량</span>
                <span className="font-bold text-gray-900">100g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">단백질</span>
                <span className="font-bold text-gray-900">35g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">지방</span>
                <span className="font-bold text-gray-900">11g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">탄수화물</span>
                <span className="font-bold text-gray-900">27g</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">열량</span>
                <span className="font-bold text-gray-900">307kcal</span>
              </div>
            </div>
          </div>

          {/* 설명 텍스트 */}
          <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-xl p-5 md:p-6 mb-6">
            <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed mb-3">
              카쿠의 유전적 특성을 고려하여, 구리 함량이 명확하게 보증된 사료를 통해 선제적인 건강 관리를 최우선으로 하는 플랜입니다.
            </p>
            <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
              동시에, 현재 식단 대비 지방을 55% 이상 대폭 줄여 점진적이지만 확실한 체중 개선을 함께 도모합니다.
            </p>
          </div>

          {/* 수의사 상담 권유 */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 md:p-6">
            <h5 className="text-[14px] md:text-[15px] font-bold text-amber-900 mb-3">
              해당 플랜을 바탕으로 수의사 상담 권유
            </h5>
            <p className="text-[12px] md:text-[13px] text-amber-800 leading-relaxed">
              기본적으로 질환과 질병을 가진 아이의 경우 맞춤 식단 설계 서비스 이용을 권장하고 있지 않으며, 참고용으로만 확인하시는 것을 제안하고 있습니다.
            </p>
          </div>
        </div>

        {/* Type B: 이상적인 저지방 전문 관리 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-300 shadow-sm">
          {/* 헤더: 카쿠 식단 분석표 */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🐕</span>
            <h3 className="text-[16px] md:text-[18px] font-bold text-gray-900">카쿠 식단 분석표</h3>
          </div>

          {/* 플랜 제목 배너 */}
          <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl p-4 mb-6">
            <h4 className="text-[16px] md:text-[18px] font-bold text-white">
              Type B &apos;이상적인 저지방&apos; 목표 달성을 위한 전문 관리 플랜
            </h4>
          </div>

          {/* 통합 테이블 */}
          <div className="mb-6">
            {/* 모바일: 카드 형태 */}
            <div className="md:hidden space-y-4">
              {/* 신규 추천 주식(사료) */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-[11px] font-bold">신규 추천</span>
                  <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold">주식(사료)</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">힐스 프리스크립션 다이어트 r/d</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">급여량(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">70</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">단백질(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">23.7</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">지방(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">6</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">탄수화물(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">2</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">열량(kcal)</div>
                    <div className="text-[15px] text-gray-900 font-bold">206</div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">추가 설명</div>
                    <div className="text-[11px] text-gray-700 leading-relaxed">체중 감량을 위해 과학적으로 설계된 처방식 사료입니다. 낮은 지방과 높은 식이섬유로 포만감을 주어 배고픔을 줄여주고, 필수 비타민과 미네랄을 공급하는 식단의 &apos;베이스&apos; 역할을 합니다.</div>
                  </div>
                </div>
              </div>

              {/* 신규 추천 보조식(토퍼) */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-[11px] font-bold">신규 추천</span>
                  <span className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-[11px] font-bold">보조식(토퍼)</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">하림펫푸드 더리얼 필렛 닭가슴살</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">급여량(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">80</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">단백질(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">20</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">지방(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">0.4</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-1">탄수화물(g)</div>
                      <div className="text-[13px] text-gray-700 font-semibold">0</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">열량(kcal)</div>
                    <div className="text-[15px] text-gray-900 font-bold">102.8</div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">추가 설명</div>
                    <div className="text-[11px] text-gray-700 leading-relaxed">지방이 거의 없는 순수 단백질원으로, 칼로리 제한 증가장 중요한 &apos;근육 손실&apos;을 막아줍니다. 부드러운 식감과 높은 기호성으로 식단의 만족도를 높이는 &apos;솔버&apos; 역할을 합니다.</div>
                  </div>
                </div>
              </div>

              {/* 기존 제품 영양제 1 */}
              <div className="border border-gray-200 rounded-xl p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-bold">기존 제품</span>
                  <span className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-[11px] font-bold">영양제</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">페피테일 참 유산균</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여 수량</div>
                    <div className="text-[13px] text-gray-700 font-semibold">1포</div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">추가 설명</div>
                    <div className="text-[11px] text-gray-700 leading-relaxed">카쿠의 과거 소화기 문제를 고려하여, 장내 환경 개선과 면역력 증진을 위해 꾸준한 급여를 권장합니다.</div>
                  </div>
                </div>
              </div>

              {/* 기존 제품 영양제 2 */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-bold">기존 제품</span>
                  <span className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-[11px] font-bold">영양제</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">제품명</div>
                    <div className="text-[13px] text-gray-900 font-medium">Neprofin Pet®</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">급여 수량</div>
                    <div className="text-[13px] text-gray-700 font-semibold">1스쿱</div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-[11px] text-gray-500 mb-1">추가 설명</div>
                    <div className="text-[11px] text-gray-700 leading-relaxed">새로운 식단의 소화를 돕는 효소와 관절 및 피부의 염증 반응 관리를 돕는 효소를 함께 공급하여, 카쿠의 중합적인 건강 관리를 지원합니다.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 데스크톱: 테이블 형태 */}
            <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] md:text-[14px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[80px]">기존/신규</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 w-[90px]">종류</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">제품명</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[90px]">급여 수량</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[80px]">급여량(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[80px]">단백질(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[70px]">지방(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[90px]">탄수화물(g)</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700 w-[80px]">열량(kcal)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 신규 추천 주식(사료) */}
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          신규
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          주식
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">힐스 프리스크립션 다이어트 r/d</td>
                      <td className="px-4 py-3 text-center text-gray-500">-</td>
                      <td className="px-4 py-3 text-center text-gray-700">70</td>
                      <td className="px-4 py-3 text-center text-gray-700">23.7</td>
                      <td className="px-4 py-3 text-center text-gray-700">6</td>
                      <td className="px-4 py-3 text-center text-gray-700">2</td>
                      <td className="px-4 py-3 text-center text-gray-900 font-bold">206</td>
                    </tr>
                    {/* 신규 추천 보조식(토퍼) */}
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          신규
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          보조식
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">하림펫푸드 더리얼 필렛 닭가슴살</td>
                      <td className="px-4 py-3 text-center text-gray-500">-</td>
                      <td className="px-4 py-3 text-center text-gray-700">80</td>
                      <td className="px-4 py-3 text-center text-gray-700">20</td>
                      <td className="px-4 py-3 text-center text-gray-700">0.4</td>
                      <td className="px-4 py-3 text-center text-gray-700">0</td>
                      <td className="px-4 py-3 text-center text-gray-900 font-bold">102.8</td>
                    </tr>
                    {/* 기존 제품 영양제 1 */}
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          기존
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          영양제
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">페피테일 참 유산균</td>
                      <td className="px-4 py-3 text-center text-gray-700">1포</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                    </tr>
                    {/* 기존 제품 영양제 2 */}
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          기존
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                          영양제
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">Neprofin Pet®</td>
                      <td className="px-4 py-3 text-center text-gray-700">1스쿱</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                    </tr>
                    {/* 요약 행 */}
                    <tr className="bg-gray-100 border-t-2 border-gray-300">
                      <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900">SUM</td>
                      <td className="px-4 py-3 text-center text-gray-400">-</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">150</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">43.7</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">6.4</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">2</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900">308.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 추가 설명 섹션 */}
            <div className="hidden md:block space-y-3 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold">주식</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[13px] font-semibold text-gray-900 mb-1">힐스 프리스크립션 다이어트 r/d</h5>
                    <p className="text-[12px] text-gray-700 leading-relaxed">체중 감량을 위해 과학적으로 설계된 처방식 사료입니다. 낮은 지방과 높은 식이섬유로 포만감을 주어 배고픔을 줄여주고, 필수 비타민과 미네랄을 공급하는 식단의 &apos;베이스&apos; 역할을 합니다.</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-[10px] font-bold">보조식</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[13px] font-semibold text-gray-900 mb-1">하림펫푸드 더리얼 필렛 닭가슴살</h5>
                    <p className="text-[12px] text-gray-700 leading-relaxed">지방이 거의 없는 순수 단백질원으로, 칼로리 제한 증가장 중요한 &apos;근육 손실&apos;을 막아줍니다. 부드러운 식감과 높은 기호성으로 식단의 만족도를 높이는 &apos;솔버&apos; 역할을 합니다.</p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full text-[10px] font-bold">영양제</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[13px] font-semibold text-gray-900 mb-1">페피테일 참 유산균</h5>
                    <p className="text-[12px] text-gray-700 leading-relaxed">카쿠의 과거 소화기 문제를 고려하여, 장내 환경 개선과 면역력 증진을 위해 꾸준한 급여를 권장합니다.</p>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full text-[10px] font-bold">영양제</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[13px] font-semibold text-gray-900 mb-1">Neprofin Pet®</h5>
                    <p className="text-[12px] text-gray-700 leading-relaxed">새로운 식단의 소화를 돕는 효소와 관절 및 피부의 염증 반응 관리를 돕는 효소를 함께 공급하여, 카쿠의 중합적인 건강 관리를 지원합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 설명 텍스트 */}
          <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-xl p-5 md:p-6">
            <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed mb-3">
              가장 이상적인 체중 감량 목표치(지방 6.8g 이하)를 완벽하게 달성하는 데 모든 초점을 맞춘 전문적인 플랜입니다.
            </p>
            <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed">
              최고의 체중 관리 효과를 원할 때 선택하는 가장 정석적인 방법입니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 4) {
    // 04 최종 검증
    return (
      <div>
        <div className="bg-gradient-to-r from-[#003DA5] to-[#0052CC] rounded-2xl p-6 md:p-8 text-white">
          <div className="text-center mb-6">
            <h4 className="text-[18px] md:text-[22px] font-bold mb-2 text-center">젤리대학교 식단 설계 3원칙</h4>
            <p className="text-[14px] md:text-[16px] opacity-90 text-center mb-6">
              이건 단순한 &quot;좋은 사료 추천&quot;이 아니에요.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6">
              <h5 className="text-[15px] md:text-[17px] font-bold mb-3">국제 표준 영양 검증</h5>
              <p className="text-[12px] md:text-[14px] opacity-90 leading-relaxed mb-3">
                AAFCO·FEDIAF·NRC 기준으로 사료 라벨을 전문 분석하고, 주식으로서의 영양 적절성을 검증합니다.
              </p>
              <div className="bg-white/10 rounded-lg p-3 mt-3">
                <p className="text-[11px] md:text-[13px] opacity-90 leading-relaxed">
                  보호자가 해석하기 어려운 사료 라벨을 저희가 해석하여 검증해요.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6">
              <h5 className="text-[15px] md:text-[17px] font-bold mb-3">개체별 맞춤 데이터 설계</h5>
              <p className="text-[12px] md:text-[14px] opacity-90 leading-relaxed mb-3">
                수의영양학과 젤리대학교만의 데이터로 나이·체중·활동량·중성화 여부 등을 반영한 개체 맞춤 급여량을 정밀 산출합니다.
              </p>
              <div className="bg-white/10 rounded-lg p-3 mt-3">
                <p className="text-[11px] md:text-[13px] opacity-90 leading-relaxed">
                  보호자가 직접 계산하기 어려운 수의영양학 데이터를 바탕으로 설계해요.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 md:p-6">
              <h5 className="text-[15px] md:text-[17px] font-bold mb-3">AI + 수의사 이중 검증</h5>
              <p className="text-[12px] md:text-[14px] opacity-90 leading-relaxed mb-3">
                글로벌 영양 데이터 기반 AI 분석 후, 영양학 전문 수의사의 검토를 거쳐 최종 리포트를 발행합니다.
              </p>
              <div className="bg-white/10 rounded-lg p-3 mt-3">
                <p className="text-[11px] md:text-[13px] opacity-90 leading-relaxed">
                  AI가 빠르게 설계하고, 전문가가 꼼꼼하게 검증합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

