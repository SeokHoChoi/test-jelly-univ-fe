'use client';

import { Check, TrendingUp, TrendingDown } from 'lucide-react';

const CurrentDietReportSection = () => {
  const petInfo = {
    name: '하이',
    age: '1년 2개월',
    weight: '10kg',
    neutered: '완료',
    bcs: 3,
    rwacome: 2.5
  };

  const targetIntake = {
    energy: '168kcal',
    weight: '목표 체중',
    dailyIntake: '하루 권장 급여량'
  };

  const currentFoods = [
    { name: 'The Honest Kitchen Chicken', amount: '40g' },
    { name: 'Frontier Pet Kangaroo', amount: '30g' },
    { name: 'Canidae Chicken', amount: '20g' }
  ];

  const nutrientAnalysis = [
    { name: '단백질', color: 'bg-yellow-400', foods: currentFoods },
    { name: '지방', color: 'bg-red-400', foods: currentFoods },
    { name: '탄수화물', color: 'bg-green-400', foods: currentFoods },
    { name: '수분', color: 'bg-blue-400', foods: currentFoods }
  ];

  const dietComparison = [
    { name: '단백질', current: 75, recommended: 85, status: 'low' },
    { name: '지방', current: 90, recommended: 80, status: 'high' },
    { name: '탄수화물', current: 60, recommended: 65, status: 'low' }
  ];

  return (
    <section id="diet-report" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-800 mb-2">
            Current Diet Report
          </h2>
          <p className="text-[18px] md:text-[24px] font-semibold text-[#003DA5]">
            하이를 위한 현재 식단 분석 리포트
          </p>
        </div>

        {/* 반려동물 정보 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 사료 정보 카드 */}
          <div className="bg-[#003DA5] rounded-[20px] p-6 text-white">
            <h3 className="text-[18px] font-semibold mb-4">
              하이는 어떤 사료를 먹고 있나요?
            </h3>
            <div className="space-y-2">
              {currentFoods.map((food, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-[14px]">{food.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-[12px]">
                    {food.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 반려동물 정보 카드 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border">
            <h3 className="text-[18px] font-semibold text-[#003DA5] mb-4">
              반려동물 정보: 하이
            </h3>
            <div className="space-y-3">
              <div className="bg-[#003DA5] text-white px-4 py-2 rounded-full text-[14px] font-medium">
                나이: {petInfo.age}
              </div>
              <div className="bg-[#003DA5] text-white px-4 py-2 rounded-full text-[14px] font-medium">
                체중: {petInfo.weight}
              </div>
              <div className="bg-[#003DA5] text-white px-4 py-2 rounded-full text-[14px] font-medium">
                중성화: {petInfo.neutered}
              </div>
            </div>
          </div>

          {/* BCS 정보 카드 */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border">
            <h3 className="text-[18px] font-semibold text-[#003DA5] mb-4">
              BCS
            </h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] text-gray-600">체형 점수</span>
                <span className="text-[16px] font-semibold">{petInfo.bcs}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${(petInfo.bcs / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-[#003DA5] text-white py-2 rounded-lg text-[14px] font-medium">
              BCS 정보 수정하기
            </button>
          </div>
        </div>

        {/* 목표 체중과 하루 권장 급여량 */}
        <div className="mb-12">
          <h3 className="text-[20px] font-bold text-[#003DA5] mb-6 text-center">
            하이의 목표 체중과 하루 권장 급여량
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-100 rounded-[20px] p-6 text-center">
              <h4 className="text-[16px] font-semibold text-gray-800 mb-2">
                목표 에너지 요구량
              </h4>
              <p className="text-[32px] font-bold text-[#003DA5]">
                {targetIntake.energy}
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-6 shadow-sm border text-center">
              <h4 className="text-[16px] font-semibold text-gray-800 mb-4">
                목표 체중
              </h4>
              <button className="bg-[#003DA5] text-white px-6 py-3 rounded-lg text-[14px] font-medium">
                목표 체중 설정하기
              </button>
            </div>
            <div className="bg-white rounded-[20px] p-6 shadow-sm border text-center">
              <h4 className="text-[16px] font-semibold text-gray-800 mb-4">
                하루 권장 급여량
              </h4>
              <button className="bg-[#003DA5] text-white px-6 py-3 rounded-lg text-[14px] font-medium">
                권장 급여량 확인하기
              </button>
            </div>
          </div>
        </div>

        {/* 현재 식단의 주요 영양소 함량 분석 */}
        <div className="mb-12">
          <h3 className="text-[20px] font-bold text-[#003DA5] mb-6 text-center">
            현재 식단의 주요 영양소 함량 분석
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nutrientAnalysis.map((nutrient, index) => (
              <div key={index} className="bg-white rounded-[20px] shadow-sm border overflow-hidden">
                <div className={`${nutrient.color} p-3 text-center`}>
                  <h4 className="text-white font-semibold text-[16px]">
                    {nutrient.name}
                  </h4>
                </div>
                <div className="p-4 space-y-2">
                  {nutrient.foods.map((food, foodIndex) => (
                    <div key={foodIndex} className="flex justify-between items-center">
                      <span className="text-[12px] text-gray-600 truncate">
                        {food.name}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-[10px] font-medium">
                        {food.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 현재 식단 vs 권장 식단 영양소 비교 */}
        <div className="mb-12">
          <h3 className="text-[20px] font-bold text-[#003DA5] mb-6 text-center">
            현재 식단 vs 권장 식단 영양소 비교
          </h3>

          {/* 비교 요약 */}
          <div className="bg-[#003DA5] text-white p-4 rounded-lg mb-6">
            <p className="text-center font-medium">
              현재 식단은 권장 식단에 비해 단백질 함량이 낮아요
            </p>
          </div>

          {/* 비교 차트 */}
          <div className="space-y-4">
            {dietComparison.map((item, index) => (
              <div key={index} className="bg-white rounded-[20px] p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[16px] font-semibold text-gray-800">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.status === 'high' ? (
                      <TrendingUp className="text-red-500" size={20} />
                    ) : (
                      <TrendingDown className="text-blue-500" size={20} />
                    )}
                    <span className="text-[14px] font-medium">
                      {item.status === 'high' ? '높음' : '낮음'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#003DA5] h-3 rounded-full"
                        style={{ width: `${item.current}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-[12px] text-gray-600">권장</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'high' ? (
                      <span className="text-red-500 text-[14px] font-medium">
                        +{Math.abs(item.current - item.recommended)}%
                      </span>
                    ) : (
                      <span className="text-blue-500 text-[14px] font-medium">
                        -{Math.abs(item.current - item.recommended)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 사료 및 간식 */}
        <div>
          <h3 className="text-[20px] font-bold text-[#003DA5] mb-6 text-center">
            추천 사료 및 간식
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#003DA5] rounded-[20px] p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦴</span>
              </div>
              <h4 className="text-[16px] font-semibold mb-2">단백질 보충 사료</h4>
              <p className="text-[14px] text-blue-100">
                현재 식단의 단백질 부족을 보완할 수 있는 고단백 사료
              </p>
            </div>
            <div className="bg-[#003DA5] rounded-[20px] p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐾</span>
              </div>
              <h4 className="text-[16px] font-semibold mb-2">체중 관리 사료</h4>
              <p className="text-[14px] text-blue-100">
                적정 체중 유지를 위한 저칼로리 사료
              </p>
            </div>
            <div className="bg-[#003DA5] rounded-[20px] p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥣</span>
              </div>
              <h4 className="text-[16px] font-semibold mb-2">영양 간식</h4>
              <p className="text-[14px] text-blue-100">
                균형잡힌 영양소를 제공하는 건강한 간식
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentDietReportSection;
