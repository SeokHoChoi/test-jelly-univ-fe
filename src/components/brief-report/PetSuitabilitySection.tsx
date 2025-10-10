'use client';

import { Shield, Check } from 'lucide-react';

const PetSuitabilitySection = () => {
  return (
    <section id="pet-suitability" className="bg-[#003DA5] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-4">
            그래서 이 사료, 냥구에게 잘 맞을까?
          </h2>
          <p className="text-[16px] md:text-[20px] text-blue-100 max-w-3xl mx-auto">
            반려동물의 개별적인 특성을 고려한 맞춤형 분석을 통해
            더 정확한 사료 추천을 받아보세요.
          </p>
        </div>

        {/* 맞춤 분석 시작하기 박스 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* 왼쪽: 맞춤 분석 시작하기 */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Shield className="text-yellow-600" size={32} />
                </div>
                <p className="text-red-500 font-medium text-[16px] mb-4">
                  맞춤 분석이 필요한 정보가 있다면
                </p>
                <button className="bg-[#003DA5] hover:bg-[#002A7A] text-white px-8 py-4 rounded-[50px] font-semibold text-[18px] transition-colors shadow-lg">
                  맞춤 분석 시작하기
                </button>
              </div>

              {/* 오른쪽: 체크리스트 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-600 text-[14px]">
                    반려동물의 나이, 체중, 건강 상태를 정확히 파악
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-600 text-[14px]">
                    현재 급여 중인 사료와 간식 정보 분석
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-600 text-[14px]">
                    개별 맞춤형 영양소 권장량 계산
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-600 text-[14px]">
                    건강 상태별 특별 관리 사항 제안
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-600 text-[14px]">
                    전문 수의사 상담 서비스 제공
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetSuitabilitySection;
