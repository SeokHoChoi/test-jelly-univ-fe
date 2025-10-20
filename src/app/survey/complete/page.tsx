'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SurveyCompletePage = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const images = [
    '/img/survey/complete/j-1.png',
    '/img/survey/complete/j-2.png',
    '/img/survey/complete/j-3.png',
    '/img/survey/complete/j-4.png'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(imageTimer);
    };
  }, [images.length]);

  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-center pt-16 pb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className={`max-w-sm w-full text-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          {/* 젤리 이미지 */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto relative">
              <Image
                src={images[currentImageIndex]}
                alt="완료"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* 메인 메시지 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            설문이 완료되었어요
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            반려견의 건강한 식단을 위해<br />
            소중한 정보를 제공해주셔서 감사합니다
          </p>

          {/* 상태 표시 */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500">데이터 분석 준비 완료</p>
          </div>

          {/* 다음 단계 안내 */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center text-left">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#003DA5' }}>
                <span className="text-white text-xs font-medium">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">분석 리포트 생성</p>
                <p className="text-xs text-gray-500">전문가가 데이터를 분석합니다</p>
              </div>
            </div>
            <div className="flex items-center text-left">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-500 text-xs font-medium">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">맞춤형 솔루션 제공</p>
                <p className="text-xs text-gray-400">개인화된 식단 추천을 받으세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-6 pb-8">
        <button
          onClick={handleGoToCheckout}
          className="w-full py-4 text-white font-semibold text-base rounded-2xl transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: '#003DA5',
            boxShadow: '0 4px 12px rgba(0, 61, 165, 0.15)'
          }}
        >
          다음 단계로
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          분석 리포트는 보통 5-10분 정도 소요됩니다
        </p>
      </div>
    </div>
  );
};

export default SurveyCompletePage;