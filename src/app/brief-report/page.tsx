'use client';

import { useState } from 'react';
import PublicInfoSection from '@/components/brief-report/PublicInfoSection';
import ResultSummarySection from '@/components/brief-report/ResultSummarySection';
import ReportContentSection from '@/components/brief-report/ReportContentSection';
import SignupPromptModal from '@/components/brief-report/SignupPromptModal';

const BriefReportPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen">
      <PublicInfoSection />
      <ResultSummarySection />
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
