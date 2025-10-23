'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface PreReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planPrice: string;
}

const PreReservationModal = ({ isOpen, onClose, planTitle, planPrice }: PreReservationModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const modal = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.98]'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="닫기"
        >
          <X size={18} className="text-gray-500" />
        </button>

        <div className="p-8 pt-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/logo-3x.png"
              alt="Jelly University"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
              priority
            />
          </div>

          <h2 className="text-[22px] md:text-[24px] font-bold text-center text-gray-900 mb-3">사전예약 혜택</h2>
          <p className="text-center text-[15px] text-gray-600 leading-relaxed mb-6">
            지금 사전예약하시면 가장 먼저 빠르게 오픈 소식과
            <br />
            <span className="font-bold text-[#003DA5]">10% 할인 혜택</span>을 드립니다!
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-xs text-gray-500 mb-1">선택한 플랜</p>
            <p className="text-sm font-semibold text-gray-900">{planTitle}</p>
            <p className="text-lg font-bold text-[#003DA5]">{planPrice}</p>
          </div>

          <Link
            href="/signup?preregistered=true"
            onClick={onClose}
            className="block w-full bg-[#003DA5] text-white text-center py-3.5 rounded-xl font-bold text-[17px] hover:bg-[#002A7A] active:bg-[#001F5C] transition-colors active:scale-95"
          >
            사전 예약하기
          </Link>

          <p className="text-[11px] text-gray-400 text-center mt-3">사전예약은 무료이며, 언제든지 취소 가능합니다</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default PreReservationModal;
