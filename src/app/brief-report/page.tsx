'use client';

import { useState } from 'react';
import SignupPromptModal from '@/components/brief-report/SignupPromptModal';
import FoodQualityAnalysisSection from '@/components/brief-report/FoodQualityAnalysisSection';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';
import ReportFloatingTabs from '@/components/brief-report/ReportFloatingTabs';
import DietReportExample from '@/components/brief-report/DietReportExample';

const BriefReportPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen">
      <ReportFloatingTabs />
      <FoodQualityAnalysisSection />
      <PetSuitabilitySection />

      {/* 상세 식단 분석 리포트 */}
      <DietReportExample />

      {/* 회원가입 유도 버튼 */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowSignupModal(true)}
          className="bg-brand-blue text-white px-4 py-3 rounded-lg shadow-lg hover:bg-brand-blue-dark transition-colors text-sm md:text-base md:px-6"
        >
          <span className="hidden sm:inline">회원가입하고 전체 내용 보기</span>
          <span className="sm:hidden">전체 보기</span>
        </button>
      </div>

      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default BriefReportPage;
