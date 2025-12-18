'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';
import SignupPromptModal from '@/components/brief-report/SignupPromptModal';
import FoodQualityAnalysisSection from '@/components/brief-report/FoodQualityAnalysisSection';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';
// [기획 보류] 냥구 케이스 모달 - 기획 보류로 인해 잠시 홀드
// import NyanguTeaserModal from '@/components/brief-report/NyanguTeaserModal';
// import ReportTabs from '@/components/brief-report/ReportTabs';
// import DietReportExample from '@/components/brief-report/DietReportExample';

const BriefReportPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const router = useRouter();
  const response = useRatingStore((s) => s.response);
  const [restored, setRestored] = useState(false);
  // [기획 보류] 냥구 케이스 모달 관련 상태 - 기획 보류로 인해 잠시 홀드
  // const [nyanguOpen, setNyanguOpen] = useState(false);

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

  // [기획 보류] 스크롤 50% 지점에서 1회 모달 노출 (세션 단위) - 기획 보류로 인해 잠시 홀드
  // useEffect(() => {
  //   const already = typeof window !== 'undefined' ? sessionStorage.getItem('nyanguTeaserClosed') : 'true';
  //   if (already === 'true') return;
  //   const onScroll = () => {
  //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //     const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  //     if (docHeight > 0 && scrollTop / docHeight > 0.5) {
  //       setNyanguOpen(true);
  //       sessionStorage.setItem('nyanguTeaserClosed', 'true');
  //       window.removeEventListener('scroll', onScroll);
  //     }
  //   };
  //   window.addEventListener('scroll', onScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, [restored]);

  // [기획 보류] 최초 세션 초기화: 첫 방문 시에만 보이도록 - 기획 보류로 인해 잠시 홀드
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && !sessionStorage.getItem('nyanguTeaserClosed')) {
  //     sessionStorage.setItem('nyanguTeaserClosed', 'false');
  //   }
  // }, []);

  return (
    <div className="min-h-screen pb-20">
      <FoodQualityAnalysisSection />

      {/* 플로팅 PetSuitabilitySection */}
      <PetSuitabilitySection />

      {/* [기획 보류] 냥구 케이스 모달 (스크롤 트리거) - 기획 보류로 인해 잠시 홀드 */}
      {/* <NyanguTeaserModal
        isOpen={nyanguOpen}
        onClose={() => setNyanguOpen(false)}
      /> */}

      <SignupPromptModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default BriefReportPage;
