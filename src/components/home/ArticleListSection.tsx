import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import { Shield, Target, FileText } from 'lucide-react';

const ArticleListSection = () => {
  const articles = [
    {
      icon: Shield,
      title: '신뢰할 수 있는 수의영양학 분석',
      description: 'FDA, USDA, AAFCO, NRC 등 국제 기준을 바탕으로 한 과학적 분석',
      badges: ['FDA', 'USDA', 'AAFCO', 'NRC'],
    },
    {
      icon: Target,
      title: '단순한 분석을 넘어 진짜 맞춤을 제안',
      description: '우리 아이의 개별 특성을 고려한 맞춤형 식단 솔루션',
    },
    {
      icon: FileText,
      title: '실생활에서 바로 적용 가능한 솔루션',
      description: '이론이 아닌 실제 적용 가능한 구체적인 식단 가이드',
    },
  ];

  return (
    <section id="service" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            데이터로 완성하고 전문가가 검증한 우리 아이 맞춤 식단
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                {article.icon && (
                  <article.icon className="w-16 h-16 text-brand-blue mx-auto mb-6" />
                )}
                {article.badges && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {article.badges.map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {article.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {article.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleListSection;
