'use client';

import Card from '@/components/common/Card';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

interface Review {
  id: string;
  dogName: string;
  guardianName: string;
  location: string;
  age: {
    value: number;
    unit: 'year' | 'month' | 'week';
  };
  title?: string;
  content: string;
  avatar: string;
}

interface ReviewSliderProps {
  reviews: Review[];
  showDots?: boolean;
}

const ReviewSlider = ({ reviews, showDots = false }: ReviewSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    drag: true,
    mode: 'snap',
    renderMode: 'performance',
    slides: {
      origin: 'center',
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 1.6, spacing: 20 },
      },
      '(min-width: 768px)': {
        slides: { perView: 2.2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2.8, spacing: 24 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 3.1, spacing: 24 },
      },
    },
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div>
      {/* 슬라이더 컨테이너 - 중앙 정렬 */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <div
            ref={sliderRef}
            className="keen-slider overflow-hidden"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch'
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="keen-slider__slide"
                style={{
                  width: 'auto',
                  minHeight: 'auto',
                  flexShrink: 0,
                  display: 'block'
                }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow h-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={review.avatar}
                      alt={`${review.dogName} 보호자 ${review.guardianName} avatar`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-[8px] object-cover"
                    />
                    <div>
                      <h4 className="text-[#000000] font-bold text-[18px]">
                        {review.dogName} 보호자 {review.guardianName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {review.location} · {review.age.value}
                        {review.age.unit === 'year' ? '살' : review.age.unit === 'month' ? '개월' : '주'}
                      </p>
                    </div>
                  </div>

                  {/* Review title */}
                  {review.title && (
                    <p className="text-[18px] font-medium text-[#003DA5] mb-4">
                      &ldquo;{review.title}&rdquo;
                    </p>
                  )}

                  {/* Review content */}
                  <p className="text-[#1E1E1E] text-[17px] font-normal leading-relaxed">
                    {review.content}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 페이지네이션 도트 - showDots가 true일 때만 표시 */}
      {showDots && (
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => slider?.current?.moveToIdx(index)}
              className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-[#003DA5]' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
