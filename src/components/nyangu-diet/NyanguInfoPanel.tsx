'use client';

import { useState } from 'react';
import AccordionItem from './AccordionItem';

export default function NyanguInfoPanel() {
  const [isOwnerCommentExpanded, setIsOwnerCommentExpanded] = useState(false);

  const ownerCommentFull = (
    <>
      냥구의 식단을 설계할 때, 저는 &apos;20년 장수&apos;를 목표로 잡았어요. 좋은 사료는 많지만, 냥구의 나이, 활동량, 체질에 정확히 맞는 사료를 찾기까지 6개월이 걸렸습니다.
      <br />
      <br />
      그 과정에서 배운 게 있어요. &apos;좋은 사료&apos;보다 중요한 건 &apos;적합한 사료&apos;라는 것.
    </>
  );

  const ownerCommentShort = '냥구의 식단을 설계할 때, 저는 &apos;20년 장수&apos;를 목표로 잡았어요. 좋은 사료는 많지만, 냥구의 나이, 활동량, 체질에 정확히 맞는 사료를 찾기까지 6개월이 걸렸습니다.';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-7 lg:sticky lg:top-24">
      {/* 프로필 카드 - Sticky */}
      <div className="mb-6">
        {/* 메인 프로필 이미지 */}
        <div className="mb-6">
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden bg-gray-50">
            <img
              src="/img/nyangu-profile.png"
              alt="냥구 프로필"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-[22px] md:text-[24px] font-bold text-gray-900 mb-1">냥구</h3>
            <p className="text-[15px] md:text-[16px] text-gray-600">셔틀랜드 쉽독</p>
          </div>
        </div>

        {/* 기본 정보 카드 - 통합 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">기본 정보</h4>
          <p className="text-[13px] md:text-[14px] text-gray-700 mb-2">
            2024년 1월 17일 생
          </p>
          <p className="text-[13px] md:text-[14px] text-gray-700">
            12kg / 남아 / 중성화 완료
          </p>
        </div>

        {/* 성과 배지 - 강조 */}
        <div className="mb-4">
          <div className="bg-[#003DA5] text-white px-5 py-3 rounded-lg text-center">
            <p className="text-[16px] md:text-[18px] font-bold mb-1">🏆 407마리 중 4마리</p>
            <p className="text-[12px] md:text-[13px] opacity-90">상위 1% 장 건강 인증</p>
          </div>
        </div>

        {/* 불균형 지수 카드 */}
        <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-lg p-4 mb-4">
          <p className="text-[12px] text-gray-600 mb-1">냥구 불균형 지수</p>
          <p className="text-[32px] font-extrabold text-[#003DA5] mb-1">-5.58</p>
          <p className="text-[11px] text-gray-500">(458% 더 좋은 수치)</p>
        </div>

        {/* 급여 요약 카드 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-3">급여 요약</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-[11px] text-gray-600 mb-1">하루 급여량</p>
              <p className="text-[16px] font-bold text-gray-900">120g</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-600 mb-1">목표 칼로리</p>
              <p className="text-[16px] font-bold text-gray-900">451~632kcal</p>
            </div>
          </div>
        </div>

        {/* 주인 코멘트 - 줄임 처리 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-sm flex-shrink-0">
              😊
            </div>
            <div className="flex-1">
              <p className="text-[12px] md:text-[13px] font-semibold text-gray-900 mb-1">냥구 보호자 박해주</p>
              <p className="text-[11px] md:text-[12px] text-gray-500 mb-2">젤리대학교 Founder</p>
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                {isOwnerCommentExpanded ? (
                  ownerCommentFull
                ) : (
                  <>
                    <span dangerouslySetInnerHTML={{ __html: ownerCommentShort }} />
                    <button
                      onClick={() => setIsOwnerCommentExpanded(true)}
                      className="text-[#003DA5] font-semibold ml-1 hover:underline"
                    >
                      더보기
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 공여건 선정 소개 - 기본 노출 (자랑 요소) */}
        <div className="mb-4">
          <h4 className="text-[16px] md:text-[17px] font-semibold text-gray-900 mb-3">상위 1% 장 건강으로 인증받은 냥구</h4>
          <div className="space-y-3 text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
            <p>
              젤리대학교 1호 입학생 냥구는 10월 청담장튼튼내과 동물병원에서 진행한 분변 미생물 공여건 선발에서 407마리의 지원자 중 단 4마리에 선정됐어요.
            </p>
            <p>
              장 건강은 단순히 &quot;배탈이 없다&quot;가 아니라, 미생물 생태계의 다양성과 균형이 과학적 기준을 충족해야 합니다.
            </p>
            <p className="font-semibold text-gray-900 text-[14px] md:text-[15px]">
              그리고 이 결과는 우연이 아니었습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 상세 정보 토글들 */}
      <div className="space-y-2">
        {/* 기타 정보 */}
        <AccordionItem title="기타 정보">
          <ul className="space-y-2 text-[13px] md:text-[14px] text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>유리 장이라고 불리올 만큼 어렸을 땐 장이 약했음</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>현재까지 특정 알러지원 없음</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>활동 수준이 높은 편이고 바깥 활동을 즐김</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>뭐든 잘 먹고 단단한 식감을 좋아해 씹는 것을 즐김</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>쉽게 살이 찌는 편이라 늘 체중관리를 하는 편</span>
            </li>
          </ul>
        </AccordionItem>

        {/* 상세 검사 결과 */}
        <AccordionItem title="상세 검사 결과 보기">
          {/* 공여건 선정 과정 */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-gray-600 text-lg">✓</span>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900">공여건 선정 과정</h4>
            </div>
            <p className="text-[14px] md:text-[15px] text-gray-700 leading-relaxed">
              1차 서류 심사 〉 2차 DI 검사 〉 3차 PCR 검사 〉 4차 건강검진
            </p>
          </div>

          {/* 유익균 수치 */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-gray-600 text-lg">🦠</span>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900">핵심 유익균 수치</h4>
            </div>
            <div>
              <div className="flex gap-3 md:gap-4 mb-3 items-end overflow-x-auto">
                <div className="flex-shrink-0 flex flex-col min-w-[80px]">
                  <p className="text-[11px] md:text-[12px] text-gray-600 mb-2 text-center whitespace-nowrap">Faecalibacterium</p>
                  <div className="flex items-end gap-2 h-24 justify-center">
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[72.5%] bg-gray-300 rounded-t"></div>
                    </div>
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[85%] bg-[#003DA5] rounded-t"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col min-w-[80px]">
                  <p className="text-[11px] md:text-[12px] text-gray-600 mb-2 text-center whitespace-nowrap">Fusobacteria</p>
                  <div className="flex items-end gap-2 h-24 justify-center">
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[77.5%] bg-gray-300 rounded-t"></div>
                    </div>
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[87.5%] bg-[#003DA5] rounded-t"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col min-w-[100px]">
                  <p className="text-[11px] md:text-[12px] text-gray-600 mb-2 text-center whitespace-nowrap">Clostridium hiranonis</p>
                  <div className="flex items-end gap-2 h-24 justify-center">
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[56.25%] bg-gray-300 rounded-t"></div>
                    </div>
                    <div className="w-8 md:w-10 h-full flex flex-col justify-end">
                      <div className="h-[77.5%] bg-[#003DA5] rounded-t"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-gray-600 mt-3 leading-relaxed">
                만성 장질환 회복의 핵심 균주 <span className="text-[#003DA5] font-semibold">Clostridium hiranonis</span> 5.98(4.25 초과 시 충족)
              </p>
            </div>
          </div>

          {/* 유해균 수치 */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-gray-600 text-lg">🧫</span>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900">유해균 수치</h4>
            </div>
            <div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[14px] text-gray-700 mb-3">유해균 수치: 정상 범위</p>
                <div className="border border-gray-200 rounded overflow-x-auto">
                  <table className="w-full text-[13px] md:text-[14px] min-w-[300px]">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-3 py-2 text-left font-semibold text-gray-900"></th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900">기준</th>
                        <th className="px-3 py-2 text-center font-semibold text-gray-900 bg-gray-50 border-l border-gray-200">냥구</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-2 text-gray-700 italic">Streptococcus</td>
                        <td className="px-3 py-2 text-center text-gray-600">&lt; 3.52</td>
                        <td className="px-3 py-2 text-center text-gray-900 font-semibold bg-gray-50 border-l border-gray-200">2.74</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-700 italic">Escherichia coli</td>
                        <td className="px-3 py-2 text-center text-gray-600">&lt; 6.15</td>
                        <td className="px-3 py-2 text-center text-gray-900 font-semibold bg-gray-50 border-l border-gray-200">2.93</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 병원성 대장균 불검출 */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-gray-600 text-lg">🧪</span>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900">병원성 대장균 불검출</h4>
            </div>
            <div>
              <img
                src="/img/nyangu-page/병원성 대장균 불검출.png"
                alt="병원성 대장균 불검출 검사 결과"
                className="w-full rounded-lg mb-3"
              />
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-[13px] text-gray-800 font-semibold">병원성 대장균 불검출, 23종 병원체 검사 전부 음성</p>
              </div>
            </div>
          </div>

          {/* 결론 및 체크리스트 */}
          <div className="mt-6 pt-5 border-t border-gray-200">
            <p className="text-[15px] md:text-[16px] text-gray-900 font-semibold mb-4">
              냥구의 장 건강은 단순히 &apos;프리미엄 사료&apos; 만으로 만들어진 게 아니에요.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-gray-600 text-sm mt-0.5">✓</span>
                <span className="text-[14px] md:text-[15px] text-gray-700">국제 표준 영양 기준 준수 여부</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 text-sm mt-0.5">✓</span>
                <span className="text-[14px] md:text-[15px] text-gray-700">개체별 에너지 요구량 정밀 계산</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 text-sm mt-0.5">✓</span>
                <span className="text-[14px] md:text-[15px] text-gray-700">적절한 주식, 보조식 그리고 영양제 급여</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 text-sm mt-0.5">✓</span>
                <span className="text-[14px] md:text-[15px] text-gray-700">실생활 적용 가능한 급여 플랜</span>
              </div>
            </div>
            <p className="text-[14px] md:text-[15px] text-gray-700 leading-relaxed">
              젤리대학교는 이 모든 과정을 과학적 근거를 바탕으로 설계합니다.
            </p>
          </div>
        </AccordionItem>

        {/* 상세 급여 레시피 */}
        <AccordionItem title="상세 급여 레시피 보기">
          {/* 아침 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌞</span>
              <h4 className="text-[16px] md:text-[17px] font-semibold text-gray-900">아침 08:00</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 space-y-4">
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">주식</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">아카나 라이트 앤 피트 레시피 50g</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">디어니스트키친 탈수건조 그레인프리 피쉬 11g</p>
              </div>
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">보조식</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">쥬쥬그린 저스트 그린 블랜드 1 테이블스푼(약 2.5g) 또는 습식 사료(디어니스트키친/테라카니스/지위픽/포틀랜드 제품 중) 약 10g</p>
              </div>
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">영양제</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">프로바이오틱스 1알, 오메가3 2알</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-[13px] md:text-[14px] font-semibold text-gray-900 mb-3">📍급여 방법</p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                  디어니스트키친 탈수 건조 제품과 쥬쥬그린 저스트 그린 블랜드를 약 40ml의 약온수 물을 부어 불린다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                  아카나 라이트 앤 피트 제품 50g을 그 위에 넣어 섞는다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                  쥬쥬그린 저스트 그린 블랜드를 첨가할 경우, 약 10ml의 물을 더 추가한다. 습식 보조식을 넣을 경우에는 별도의 물을 추가하지 않는다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                  마지막으로 영양제를 넣어 급여한다.
                </p>
                <p className="text-[12px] text-gray-500 mt-3 italic">
                  *기재된 위 내용은 정기적으로 주요하게 급여하는 항목들이며, 보조식의 경우 때에 따라 변경하기도 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 저녁 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌚</span>
              <h4 className="text-[16px] md:text-[17px] font-semibold text-gray-900">저녁 19:00</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 space-y-4">
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">주식</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">아카나 라이트 앤 피트 레시피 50g</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">디어니스트키친 탈수건조 그레인프리 피쉬 11g</p>
              </div>
              <div>
                <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">보조식</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">습식 사료 또는 락토프리 요거트 약 10g</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-[13px] md:text-[14px] font-semibold text-gray-900 mb-3">📍급여 방법</p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                  슬로우 피더 한 섹션에 디어니스트키친 탈수건조 제품을 넣고, 약 40ml의 물을 약온수로 불린다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                  슬로우 피더의 또 다른 섹션에 습식 보조식을 펴서 바른다.
                </p>
                <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                  그리고 그 위에 아카나 라이트 앤 피트 50g을 추가하여 급여한다.
                </p>
                <p className="text-[12px] text-gray-500 mt-3 italic">
                  *기재된 위 내용은 정기적으로 주요하게 급여하는 항목들이며, 보조식의 경우 때에 따라 변경하기도 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 간식 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🥨</span>
              <h4 className="text-[16px] md:text-[17px] font-semibold text-gray-900">간식</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-3">
                냥구는 &apos;아카나 라이트 앤 피트&apos; 사료를 산책과 노즈워크 진행 시 간식으로 급여하고 있어요. 하루 총 120g 중, 약 100g을 아침과 저녁에 제공하고 나머지는 간식으로 주는 형태예요.
              </p>
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-3">
                하루에 약 10~20% 미만의 간식을 급여하고 있어요. 물론 활동량이 유독 많은 날이나 여행을 갔을 땐 평소보다 많이 주기도 하지만 그래도 20%를 넘기지는 않는 편이에요.
              </p>
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                간식 중에 완제품도 있지만 사과, 파프리카, 당근, 오이 등의 과일과 야채 등이 더 많은 비중을 차지해요.
              </p>
            </div>
          </div>
        </AccordionItem>

        {/* 하루 목표 급여량 산정 - 토글로 숨김 */}
        <AccordionItem title="하루 목표 급여량 산정 및 계산 과정">
          <div className="bg-gray-50 rounded-lg p-5 space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-[14px] md:text-[15px] text-gray-700">냥구 하루 급여량:</span>
              <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">120g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px] md:text-[15px] text-gray-700">하루 목표 칼로리:</span>
              <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">451 ~ 632kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px] md:text-[15px] text-gray-700">주식 기준 총 섭취 칼로리:</span>
              <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">452kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px] md:text-[15px] text-gray-700">주식 기준 총 섭취 단백질:</span>
              <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">49g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px] md:text-[15px] text-gray-700">주식 기준 총 섭취 지방:</span>
              <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">15.1g</span>
            </div>
          </div>
          <p className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-6">어떻게 계산했을까요?</p>

          {/* 냥구의 하루 목표 급여량 산정 과정 */}
          <div className="space-y-6 mb-6">
            <div>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-4">냥구의 하루 목표 급여량 산정 과정</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">1단계: 휴식 에너지 요구량(RER)</p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                    12kg의 BCS 5점을 가진 냥구가 숨만 쉬어도 소비되는 휴식 에너지 요구량은 451kcal입니다.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">2단계: 일일 에너지 요구량 (MER)</p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                    중성화를 완료했고, 보통 활동, BCS 5점인 냥구의 하루 에너지 요구량은 632kcal입니다.
                  </p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                    일반적으로 MER은 RER에 활동계수를 곱하여 계산합니다. 하지만 임상학적으로 이를 적용하는 기준은 조금씩 다르며, 젤리대학교는 수의영양학 전문 자문위원과 함께 설계한 기준을 적용하고 있습니다.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-2">3단계: 단백질/지방 요구량</p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-2">
                    단백질 최소 27.1g 이상
                  </p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-3">
                    지방 11.3 ~ 20.3g
                  </p>
                  <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                    젤리대학교는 &apos;실생활 적용 가능한 급여 플랜&apos;을 제공하기 위해 자체 프레임워크인 &apos;뉴트리맵&apos;을 통해 아이들의 섭취 영양소 목표를 설정하여 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 같은 식단, 다른 개체라면? */}
          <div className="mb-6">
            <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-4">🔄 같은 식단, 다른 개체라면?</h4>
            <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
              만약 냥구가 3.2kg의 포메라니안이었다면? (성견, 중성화 완료, BCS 5, 활동수준 보통)
            </p>
            <div className="bg-gray-50 rounded-lg p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-[13px] md:text-[14px] text-gray-700">RER</span>
                <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">167kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] md:text-[14px] text-gray-700">MER</span>
                <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">268kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] md:text-[14px] text-gray-700">단백질 최소</span>
                <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">11.1g 이상</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] md:text-[14px] text-gray-700">지방</span>
                <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">4.6 ~ 8.3g</span>
              </div>
            </div>
          </div>
        </AccordionItem>

        {/* 급여 사료 급여량 계산 과정 - 토글로 숨김 */}
        <AccordionItem title="급여 사료 급여량 계산 과정">
          <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-6">
            여기서 끝이 아니에요!<br />
            급여 사료 급여량 계산 과정
          </h3>
          <img
            src="/img/nyangu-page/급여량_계산_과정.png"
            alt="급여 사료 급여량 계산 과정"
            className="w-full rounded-lg mb-6"
          />

          {/* 목표 kcal에 맞춤 영양소 산정하기 */}
          <div className="mb-6">
            <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-4">목표 kcal에 맞춤 영양소 산정하기</h4>
            <div className="bg-gray-50 rounded-lg p-5 mb-4">
              <p className="text-[14px] md:text-[15px] font-semibold text-gray-900 mb-3">냥구의 하루 목표 영양소</p>
              <div className="space-y-2">
                <p className="text-[13px] md:text-[14px] text-gray-700">단백질 최소 27.1g 이상</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">지방 11.3 ~ 20.3g</p>
              </div>
            </div>
            <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-3">
              주식 사료로 하루 필요량의 80~90%를 충족하고, 체중 관리를 위해 지방은 목표량보다 낮게 조절하고 있어요.
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-300 rounded p-4">
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                💡 지방은 g당 칼로리가 높아서 체중 관리 시 조절이 중요합니다.
              </p>
            </div>
          </div>

          {/* 목표 kcal에 맞춘 섭취량(g) 산정하기 */}
          <div className="mb-6">
            <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-4">목표 kcal에 맞춘 섭취량(g) 산정하기</h4>
            <div className="bg-gray-50 rounded-lg p-5 mb-4">
              <p className="text-[14px] md:text-[15px] font-semibold text-gray-900">냥구의 하루 목표 칼로리: 451~632kcal</p>
            </div>
            <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-3">
              현재는 체중 관리를 위해 기본 필요 칼로리(RER) 451kcal를 주식 사료로 채우고 있어요.
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-300 rounded p-4">
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                💡 약 40가지 필수 영양소를 모두 충족하려면 주식 사료로 최소 칼로리를 꼭 채워야 해요.
              </p>
            </div>
          </div>

          {/* 전체 급여 사료의 영양소 분석 */}
          <div>
            <h4 className="text-[15px] md:text-[16px] font-semibold text-gray-900 mb-4">전체 급여 사료의 영양소 분석</h4>
            <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed mb-4">
              사료마다 같은 무게라도 칼로리가 다릅니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-5 space-y-3 mb-4">
              <div>
                <p className="text-[13px] md:text-[14px] font-semibold text-gray-900">아카나 라이트 앤 피트</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">100g = 307kcal</p>
              </div>
              <div>
                <p className="text-[13px] md:text-[14px] font-semibold text-gray-900">디어니스트키친 탈수건조 피쉬</p>
                <p className="text-[13px] md:text-[14px] text-gray-700">100g = 380kcal</p>
              </div>
              <p className="text-[13px] md:text-[14px] font-semibold text-gray-900 pt-3 border-t border-gray-200">
                → 같은 100g인데 73kcal 차이!
              </p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-300 rounded p-4">
              <p className="text-[13px] md:text-[14px] text-gray-700 leading-relaxed">
                💡 그래서 g(그램)이 아닌 kcal(칼로리)로 재서 급여해야 정확한 영양 관리가 가능해요.
              </p>
            </div>
          </div>
        </AccordionItem>
      </div>
    </div>
  );
}

