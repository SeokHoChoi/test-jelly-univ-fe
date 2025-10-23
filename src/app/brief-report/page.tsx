'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';
import SignupPromptModal from '@/components/brief-report/SignupPromptModal';
import FoodQualityAnalysisSection from '@/components/brief-report/FoodQualityAnalysisSection';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';
// import ReportTabs from '@/components/brief-report/ReportTabs';
// import DietReportExample from '@/components/brief-report/DietReportExample';

const BriefReportPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const router = useRouter();
  const response = useRatingStore((s) => s.response);
  const [restored, setRestored] = useState(false);

  // 데이터가 없으면 입력 페이지로 이동
  useEffect(() => {
    // 세션스토리지가 있다면 마운트 직후 한번 더 읽어 복원 후 restored=true
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem('rating-store');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.state?.response) {
            useRatingStore.getState().setResponse(parsed.state.response);
          }
        }
      } catch { }
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return; // 복원 완료 후에만 판단
    if (!response) router.replace('/product-analysis');
  }, [response, restored, router]);

  return (
    <div className="min-h-screen pb-20">
      <FoodQualityAnalysisSection />

      {/* 플로팅 PetSuitabilitySection */}
      <PetSuitabilitySection />

      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default BriefReportPage;
