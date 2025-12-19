import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ArticleListSection from '@/components/home/ArticleListSection';
import PlanSection from '@/components/home/PlanSection';
import ReviewSection from '@/components/home/ReviewSection';
import AdBanner from '@/components/home/AdBanner';

const HomePage = () => {
  return (
    <div className="min-h-screen home-page">
      <HeroSection />
      <ArticleListSection />
      <Suspense fallback={<div className="py-12 md:py-20 text-center">로딩 중...</div>}>
        <PlanSection />
      </Suspense>
      <ReviewSection />
      <AdBanner />
    </div>
  );
};

export default HomePage;
