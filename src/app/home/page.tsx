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
      <PlanSection />
      <ReviewSection />
      <AdBanner />
    </div>
  );
};

export default HomePage;
