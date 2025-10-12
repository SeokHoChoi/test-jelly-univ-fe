'use client';

import { useState } from 'react';
import ReportContentSection from '@/components/brief-report/ReportContentSection';
import SignupPromptModal from '@/components/brief-report/SignupPromptModal';
import FoodQualityAnalysisSection from '@/components/brief-report/FoodQualityAnalysisSection';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';
import CurrentDietReportSection from '@/components/brief-report/CurrentDietReportSection';
import ReportFloatingTabs from '@/components/brief-report/ReportFloatingTabs';

const BriefReportPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen">
      <ReportFloatingTabs />

      {/* 새로운 UI 섹션들 */}
      <FoodQualityAnalysisSection />
      <PetSuitabilitySection />
      <CurrentDietReportSection />

      {/* 기존 리포트 섹션 (블러 처리) */}
      <ReportContentSection blurLevel="lg" />

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
