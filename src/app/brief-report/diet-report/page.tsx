'use client';

import ReportTabs from '@/components/brief-report/ReportTabs';
import DietReportExample from '@/components/brief-report/DietReportExample';

const DietReportPage = () => {
  return (
    <div className="min-h-screen">
      {/* 상단 고정 탭 */}
      <div className="sticky top-23 z-40 bg-white/80 backdrop-blur pt-4 pb-3">
        <ReportTabs />
      </div>

      {/* 상세 식단 분석 리포트 */}
      <section id="diet-report" className="bg-white pb-12 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DietReportExample />
        </div>
      </section>
    </div>
  );
};

export default DietReportPage;


