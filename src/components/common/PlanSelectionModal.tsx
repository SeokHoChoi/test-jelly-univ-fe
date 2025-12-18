'use client';

import { X } from 'lucide-react';
import Button from '@/components/common/Button';

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'basic' | 'premium') => void;
}

export default function PlanSelectionModal({
  isOpen,
  onClose,
  onSelectPlan
}: PlanSelectionModalProps) {
  if (!isOpen) return null;

  const basicPlan = {
    title: '현재 급여 식단 맞춤 설계',
    price: '19,500원',
    originalPrice: '39,000원',
    discount: '50% 할인',
    planName: '현재 급여 식단 맞춤 설계'
  };

  const premiumPlan = {
    title: '신규 맞춤 식단 설계',
    price: '59,000원',
    originalPrice: '150,000원',
    discount: '60% 할인',
    planName: '신규 맞춤 식단 설계'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">플랜을 선택해주세요</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* 베이직 플랜 */}
          <div
            onClick={() => onSelectPlan('basic')}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{basicPlan.title}</h3>
                <p className="text-sm text-gray-600">현재 주식을 활용한 맞춤 설계</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{basicPlan.price}</div>
                <div className="text-sm text-gray-500 line-through">{basicPlan.originalPrice}</div>
                <div className="text-xs text-blue-600 mt-1">{basicPlan.discount}</div>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlan('basic');
              }}
              className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white mt-4"
            >
              {basicPlan.price}로 시작하기
            </Button>
          </div>

          {/* 프리미엄 플랜 */}
          <div
            onClick={() => onSelectPlan('premium')}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{premiumPlan.title}</h3>
                <p className="text-sm text-gray-600">영양학 전문 수의사 직접 검증</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{premiumPlan.price}</div>
                <div className="text-sm text-gray-500 line-through">{premiumPlan.originalPrice}</div>
                <div className="text-xs text-blue-600 mt-1">{premiumPlan.discount}</div>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlan('premium');
              }}
              className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white mt-4"
            >
              {premiumPlan.price}로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

