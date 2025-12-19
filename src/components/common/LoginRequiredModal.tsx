'use client';

import { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Check } from 'lucide-react';
import Button from '@/components/common/Button';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (selectedPlan?: 'basic' | 'premium') => void;
  onSignup: (selectedPlan?: 'basic' | 'premium') => void;
  planType?: 'basic' | 'premium' | 'both';
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  planType = 'both'
}: LoginRequiredModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | null>(null);
  const showAllPlans = planType === 'both' || !planType;

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const basicPlan = {
    title: '현재 급여 식단 분석',
    price: '19,500원',
    originalPrice: '39,000원',
    discount: '런칭 기념 50% 할인',
    planName: '현재 급여 식단 맞춤 설계'
  };

  const premiumPlan = {
    title: '맞춤형 식단 설계',
    price: '59,000원',
    originalPrice: '150,000원',
    discount: '런칭 기념 60% 할인',
    planName: '신규 맞춤 식단 설계 '
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <LogIn className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">로그인이 필요합니다</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 메시지 */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              결제를 진행하려면 로그인이 필요합니다.
            </p>
            <p className="text-sm text-gray-500">
              계정이 없으시다면 회원가입을 진행해주세요.
            </p>
          </div>

          {/* 서비스 소개 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium text-gray-900 mb-2">젤리대학교 맞춤 식단 설계 플랜</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 우리 아이 완전 진단</li>
              <li>• 1:1 맞춤 식단 솔루션</li>
              <li>• 서울대・한국수의영양학회 임원 수의사 검증</li>
            </ul>
          </div>

          {/* 가격 선택 */}
          {showAllPlans ? (
            // 두 플랜 모두 표시 (선택 가능)
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-900">플랜을 선택해주세요</p>
                <span className="text-red-500 text-xs">*</span>
              </div>
              {/* 베이직 플랜 */}
              <div
                onClick={() => setSelectedPlan('basic')}
                className={`relative bg-blue-50 border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedPlan === 'basic'
                  ? 'border-blue-500 bg-blue-100 shadow-md'
                  : 'border-blue-200 hover:border-blue-300'
                  }`}
              >
                {selectedPlan === 'basic' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{basicPlan.planName}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">{basicPlan.price}</span>
                    <span className="text-sm text-gray-500 ml-2 line-through">{basicPlan.originalPrice}</span>
                  </div>
                </div>
                <div className="text-xs text-blue-600 mt-1">{basicPlan.discount}</div>
              </div>

              {/* 프리미엄 플랜 */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`relative bg-blue-50 border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedPlan === 'premium'
                  ? 'border-blue-500 bg-blue-100 shadow-md'
                  : 'border-blue-200 hover:border-blue-300'
                  }`}
              >
                {selectedPlan === 'premium' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{premiumPlan.planName}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">{premiumPlan.price}</span>
                    <span className="text-sm text-gray-500 ml-2 line-through">{premiumPlan.originalPrice}</span>
                  </div>
                </div>
                <div className="text-xs text-blue-600 mt-1">{premiumPlan.discount}</div>
              </div>
            </div>
          ) : (
            // 선택한 플랜만 표시 (자동 선택)
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{planType === 'premium' ? premiumPlan.planName : basicPlan.planName}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600">{planType === 'premium' ? premiumPlan.price : basicPlan.price}</span>
                  <span className="text-sm text-gray-500 ml-2 line-through">{planType === 'premium' ? premiumPlan.originalPrice : basicPlan.originalPrice}</span>
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-1">{planType === 'premium' ? premiumPlan.discount : basicPlan.discount}</div>
            </div>
          )}
        </div>

        {/* 푸터 버튼들 */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0 rounded-b-2xl">
          <div className="space-y-3">
            <Button
              onClick={() => {
                const plan = showAllPlans ? (selectedPlan || 'basic') : (planType === 'premium' ? 'premium' : 'basic');
                if (typeof window !== 'undefined') {
                  // 새로운 자동 결제 플로우를 시작하므로 이전 자동결제 상태 초기화
                  sessionStorage.removeItem('autoPayTriggered');
                }
                onLogin(plan);
              }}
              disabled={showAllPlans && !selectedPlan}
              className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white h-12 text-base font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              <LogIn className="w-5 h-5 mr-2" />
              로그인하기
            </Button>
            <Button
              onClick={() => {
                const plan = showAllPlans ? (selectedPlan || 'basic') : (planType === 'premium' ? 'premium' : 'basic');
                if (typeof window !== 'undefined') {
                  // 새로운 자동 결제 플로우를 시작하므로 이전 자동결제 상태 초기화
                  sessionStorage.removeItem('autoPayTriggered');
                }
                onSignup(plan);
              }}
              disabled={showAllPlans && !selectedPlan}
              variant="outline"
              className="w-full h-12 text-base disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:hover:bg-gray-100"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              회원가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
