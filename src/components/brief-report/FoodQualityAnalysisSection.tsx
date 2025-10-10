'use client';

import { Check } from 'lucide-react';

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
        {/* 상단 네비게이션은 플로팅 탭으로 대체됨 */}

        {/* 메인 제목 */}
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

        {/* 사료 정보 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-[20px] px-6 py-4 shadow-sm">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[#003DA5]">
              ZIWIPEAK 에어드라이 소고기
            </h2>
            <Check className="text-green-500" size={24} />
            <span className="text-[16px] font-medium text-gray-600">
              사료 품질 종합 평가
            </span>
          </div>
        </div>

        {/* 종합 평가 카드들 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {overallGrades.map((item, index) => (
            <div key={index} className="bg-white rounded-[20px] p-6 text-center shadow-sm">
              <p className="text-[14px] text-gray-500 mb-2">{item.label}</p>
              <div className="text-[48px] font-bold text-[#003DA5] mb-2">
                {item.grade}
              </div>
            </div>
          ))}
        </div>

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
    </section>
  );
};

export default FoodQualityAnalysisSection;
