'use client';

import { Check } from 'lucide-react';
import Pill from '@/components/common/Pill';
import EvalCard from '@/components/common/EvalCard';
import InfoBar from '@/components/common/InfoBar';

const FoodQualityAnalysisSection = () => {
  const scrollTo = (targetId: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const overallGrades = [
    { label: '영양 정보 신뢰도', grade: 'A+' },
    { label: '원료 품질', grade: 'A+' },
    { label: '제조 품질', grade: 'A+' },
    { label: '안전성', grade: 'A+' },
  ];

  const detailedAssessments = [
    {
      id: '01',
      title: '영양 정보 신뢰도',
      items: [
        { label: '영양소 구성', grade: 'A' },
        { label: '원료 신선도', grade: 'A+' },
        { label: '제조 공정', grade: 'A' },
      ]
    },
    {
      id: '02',
      title: '원료 품질',
      items: [
        { label: '원료 신선도', grade: 'A+' },
        { label: '원료 품질', grade: 'A' },
        { label: '원료 안전성', grade: 'A+' },
      ]
    },
    {
      id: '03',
      title: '제조 품질',
      items: [
        { label: '제조 공정', grade: 'A' },
        { label: '품질 관리', grade: 'A+' },
        { label: '포장 품질', grade: 'A' },
      ]
    },
    {
      id: '04',
      title: '안전성',
      items: [
        { label: '안전성 검증', grade: 'A+' },
        { label: '위생 관리', grade: 'A' },
        { label: '품질 보증', grade: 'A+' },
      ]
    },
  ];

  return (
    <section id="food-analysis" className="bg-gray-50 pb-12 pt-30 md:pb-20 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 제목 - 상자 밖 */}
        <div className="text-center mb-[30px] md:mb-[60px]">
          <p className="text-[#000000] font-medium text-[20px] mb-2">
            현재 급여 사료 분석 요약
          </p>
          <h1 className="text-[#003DA5] font-semibold text-[28px] md:text-[45px] mb-4">
            이 사료, 믿고 먹일 수 있을까?
          </h1>
          <p className="text-[#525252] font-normal text-[18px] md:text-[28px] max-w-4xl mx-auto">
            현재 급여 제품이 하이와는 별개로 신뢰할 수 있는 제품인지 평가해요!
          </p>
        </div>

        <div className="bg-[#F2F2F2] rounded-[40px] px-6 py-8 md:px-[136px] md:py-[74px]">
          {/* 상단 네비게이션은 플로팅 탭으로 대체됨 */}

          {/* 사료 정보 */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Pill>NON-GMO</Pill>
              <Pill>
                <span className="mr-1">🏆</span> HACCP/SQF 인증
              </Pill>
            </div>

            <h2 className="text-[30px] md:text-[35px] font-semibold text-[#003DA5] mb-6">
              ZIWIPEAK 에어드라이 소고기
            </h2>

            {/* 종합 평가 타이틀 */}
            <p className="text-[25px] font-semibold text-[#1E1E1E] mb-4">
              <span className="mr-2">✔️</span>사료 품질 종합 평가
            </p>

            {/* 종합 평가 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7 mb-8">
              {overallGrades.map((item, idx) => (
                <EvalCard key={idx} title={item.label} grade={item.grade} />
              ))}
            </div>

            {/* 요약 박스들 */}
            <div className="space-y-3 mb-10">
              <InfoBar>
                <span className="font-semibold mr-2">한 줄 평</span>
                사람이 먹을 수 있는 최상급 원료와 엄격한 영양 기준을 모두 만족시킨, 신뢰도 높은 '인간 등급(Human Grade)' 탈수 건조 식품입니다.
              </InfoBar>
              <InfoBar>
                <span className="font-semibold mr-2">사료의 주요 장점</span>
                '주식' 자격 공식 보증, 인간 등급(Human Grade) 원료, 영양소 보존율이 높은 제조 공법
              </InfoBar>
              <InfoBar>
                <span className="font-semibold mr-2">사료의 주요 단점 및 주의사항</span>
                상대적으로 높은 탄수화물 의존도, 물을 부어 불리는 과정 필수
              </InfoBar>
            </div>
          </div>

          {/* 세부 평가로 이어짐 */}

          {/* 요약 텍스트 */}
          <div className="text-center mb-12">
            <p className="text-[16px] text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ZIWIPEAK 에어드라이 소고기는 전반적으로 우수한 품질을 보여주는 사료입니다.
              영양소 구성이 균형잡혀 있고, 원료의 신선도와 제조 품질이 뛰어나며,
              안전성 검증도 철저히 이루어진 것으로 평가됩니다.
            </p>
          </div>

          {/* 세부 평가 제목 */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Check className="text-green-500" size={24} />
            <h3 className="text-[24px] md:text-[32px] font-bold text-[#003DA5]">
              사료 품질 세부 평가
            </h3>
          </div>

          {/* 세부 평가 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-[20px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[14px] font-bold text-[#003DA5] bg-blue-50 px-3 py-1 rounded-full">
                    {assessment.id}
                  </span>
                  <h4 className="text-[18px] font-bold text-[#003DA5]">
                    {assessment.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {assessment.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[14px] text-gray-600">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {['A+', 'A', 'B+', 'B'].map((grade) => (
                            <span
                              key={grade}
                              className={`px-3 py-1 rounded-full text-[12px] font-medium ${grade === item.grade
                                ? 'bg-[#003DA5] text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                              {grade}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodQualityAnalysisSection;
