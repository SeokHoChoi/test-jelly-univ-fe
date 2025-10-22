'use client';

import { useState } from 'react';
import ReportTabs from '@/components/brief-report/ReportTabs';
import DietReportExample from '@/components/brief-report/DietReportExample';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';

const DietReportPage = () => {
  const [petInfo, setPetInfo] = useState({ name: '반려견' });
  return (
    <div className="min-h-screen">
      {/* 상단 고정 탭 */}
      <div className="bg-white/80 backdrop-blur pt-18 pb-1">
        <div className="max-full mx-auto px-4 sm:px-6 lg:px-8">
          <ReportTabs />
        </div>
      </div>

      {/* 상세 식단 분석 리포트 */}
      <section id="diet-report" className="bg-white pb-12 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 메인 제목 - 상자 밖 */}
          <div className="text-center mb-[30px] md:mb-[60px]">
            <p className="text-[#000000] font-medium text-[20px] mb-2">
              {petInfo?.name || '반려견'}의 맞춤 식단 분석
            </p>
            <h1 className="text-[#003DA5] font-semibold text-[28px] md:text-[45px] mb-4">
              그래서 이 사료,<br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              {petInfo?.name || '반려견'}에게 잘 맞을까?
            </h1>

            {/* 데스크탑 텍스트 */}
            <p className="hidden md:block text-[#525252] font-normal text-[28px] max-w-4xl mx-auto">
              급여 중인 사료가 {petInfo?.name || '반려견'}의 현재 건강 상태와 필요 영양에 부합하는지,
              현재 급여 방식이 적절한지 최종적으로 진단하고 해결책을 제시해 드려요!
            </p>

            {/* 모바일 텍스트 */}
            <p className="md:hidden text-[#525252] font-normal text-[18px] max-w-4xl mx-auto">
              현재 급여 제품이 {petInfo?.name || '반려견'}와는 별개로<br />
              신뢰할 수 있는 제품인지 평가해요!
            </p>
          </div>
        </div>
        <DietReportExample onPetInfoChange={setPetInfo} />
      </section>

      {/* 플로팅 PetSuitabilitySection */}
      <PetSuitabilitySection />
    </div>
  );
};

export default DietReportPage;


