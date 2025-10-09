import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import Image from 'next/image';

const ReviewSection = () => {
  const reviews = [
    {
      name: '밤비 보호자 남은데',
      location: '서울랜드 맘독',
      time: '1일',
      content: '정말 상세한 분석이 나왔어요! 우리 밤비가 평소 먹던 사료가 영양적으로 부족하다는 걸 처음 알았습니다. 전문가 상담도 정말 도움이 되었고요.',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      name: '멍멍이 엄마 김씨',
      location: '강아지 키우기',
      time: '3일',
      content: '맞춤형 식단 설계 서비스 받았는데, 우리 강아지 체중 관리에 정말 도움이 되었어요. 이제 정확한 급여량을 알 수 있어서 안심이 됩니다.',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      name: '뽀삐 아빠 박씨',
      location: '반려동물 건강관리',
      time: '1주',
      content: '영양제 추천도 정말 정확했어요. 우리 뽀삐가 훨씬 건강해진 것 같아요. 전문가가 직접 상담해주시니까 신뢰가 갑니다.',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
  ];

  return (
    <section id="reviews" className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-18">
          <p className="text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]">
            보호자 후기
          </p>
          <h2 className="text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight">
            CBT 참여 보호자들의 생생한 후기
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={review.avatar}
                  alt={`${review.name} avatar`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-[8px] object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {review.location} · {review.time}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg">
                &ldquo;{review.content}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
