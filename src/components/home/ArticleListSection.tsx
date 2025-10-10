import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import Image from 'next/image';

const ArticleListSection = () => {
  const articles = [
    {
      title: '신뢰할 수 있는 수의영양학 분석',
      description: '국제적으로 신뢰받는 NRC, AAFCO, FEDIAF 등의 기준을 바탕으로, AI 기술과 수의영양 전문가가 함께 데이터를 분석합니다. 단순한 조언이 아니라, 과학과 전문성이 결합된 근거 있는 맞춤형 솔루션을 제공해요.',
    },
    {
      title: '단순한 분석을 넘어 진짜 맞춤을 제안',
      description: '영양소 비율만 보는 게 아니에요. 원료 품질, 제조 방식, 안전성까지 꼼꼼하게 따져요. 거기에 우리 아이의 품종, 나이, 체중, 건강 상태 등을 고려해서 정말 \'내 반려동물에게 딱 맞는\' 리포트를 드려요.',
    },
    {
      title: '실생활에서 바로 적용 가능한 솔루션',
      description: '분석만 해주고 끝나지 않아요. 내 반려동물에게 맞는 시중 사료 추천부터, 하루 급여량, 필요한 영양제와 토퍼까지! 지금 당장 적용할 수 있는 구체적인 가이드를 드립니다. ‘이론’이 아닌 ‘실행’을 위한 정보예요.',
    },
  ];

  return (
    <section id="service" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-18">
          <p className="text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]">
            젤리대학교
          </p>
          <h2 className="text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight">
            데이터로 완성하고 전문가가 검증한 <br />
            우리 아이 맞춤 식단
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="!p-0 border-0 shadow-none hover:shadow-none">
              <div className="mb-6 md:mb-8">
                {/* Mobile image */}
                <Image
                  src={`/img/home/article-${index + 1}-mobile.png`}
                  alt={`article-${index + 1}-mobile`}
                  width={640}
                  height={400}
                  className="block md:hidden w-full h-auto rounded-lg mx-auto"
                  sizes="100vw"
                  priority={index === 0}
                />
                {/* Desktop image */}
                <Image
                  src={`/img/home/article-${index + 1}.png`}
                  alt={`article-${index + 1}`}
                  width={640}
                  height={400}
                  className="hidden md:block w-full h-auto rounded-lg mx-auto"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={index === 0}
                />
              </div>

              <h3 className="text-left text-[18px] md:text-[24px] font-medium text-[#000000] mb-3">
                {article.title}
              </h3>

              <p className="text-left text-[#343434] text-[15px] md:text-[18px] font-normal leading-relaxed">
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
