'use client';

import { useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRatingStore } from '@/contexts/RatingStore';
import { useRouter } from 'next/navigation';
import NyanguTeaserSection from './NyanguTeaserSection';

interface NyanguTeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NyanguTeaserModal({ isOpen, onClose }: NyanguTeaserModalProps) {
  const router = useRouter();
  const response = useRatingStore((s) => s.response);

  const dogName = useMemo(() => {
    return response?.dogInfo?.name || '우리 아이';
  }, [response]);

  const goCheckout = () => {
    sessionStorage.setItem('nyanguTeaserClosed', 'true');
    router.push('/checkout?plan=basic&dir=true&campaign=nyangu');
  };

  // 모달 오픈 시 배경 스크롤 차단
  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevTouchAction = (document.body.style as CSSStyleDeclaration & { touchAction?: string }).touchAction ?? '';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    (document.body.style as CSSStyleDeclaration & { touchAction?: string }).touchAction = 'none';
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      (document.body.style as CSSStyleDeclaration & { touchAction?: string }).touchAction = prevTouchAction;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Dim */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* Centered Modal */}
      <div className="relative w-full max-w-[1200px] h-[90vh] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src="/img/home/tmp-review-profile/review-4.png"
              alt="프로필"
              className="w-9 h-9 rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
            <p className="text-[16px] md:text-[18px] font-semibold text-[#0F172A] tracking-[-0.01em]">공여견 1차 합격한 냥구 케이스 소개!</p>
          </div>
          <button aria-label="닫기" onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {/* Scrollable Content */}
        <div className="h-[calc(90vh-64px)] overflow-y-auto">
          <NyanguTeaserSection embedded />
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="mt-4 p-4 md:p-5 bg-[#F7FAFF] rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-[14px] md:text-[15px] text-[#0F172A]">
                    <span className="font-extrabold text-[#003DA5]">오늘 신청 시 13% 할인</span> · 수의사 검증 · 7일 환불 보장
                  </p>
                  <button
                    onClick={goCheckout}
                    className="w-full md:w-auto bg-gradient-to-r from-[#003DA5] to-[#0052CC] hover:from-[#002A7A] hover:to-[#003DA5] text-white px-7 py-3.5 rounded-xl font-bold text-[15px] shadow-lg active:scale-[0.99] ring-1 ring-[#003DA5]/20"
                  >
                    🎁 {dogName} 맞춤 리포트 받기
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-1 py-3">
                <button
                  onClick={() => {
                    sessionStorage.setItem('nyanguTeaserClosed', 'true');
                    onClose();
                  }}
                  className="text-[12px] text-[#64748B] underline underline-offset-2"
                >
                  다시 보지 않기
                </button>
                <button onClick={onClose} className="text-[12px] text-[#64748B]">
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


