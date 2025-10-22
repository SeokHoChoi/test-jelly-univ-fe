'use client';

import { X, LogIn, UserPlus } from 'lucide-react';
import Button from '@/components/common/Button';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignup
}: LoginRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
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
            <h3 className="font-medium text-gray-900 mb-2">젤리유 프리미엄 플랜</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 서울대·한국수의영양학회 임원 수의사 검증</li>
              <li>• 1:1 맞춤 식단 분석 리포트</li>
              <li>• 3개월간 무제한 분석 서비스</li>
              <li>• 전문가 상담 및 피드백</li>
            </ul>
          </div>

          {/* 가격 정보 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">프리미엄 플랜</span>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">39,000원</span>
                <span className="text-sm text-gray-500 ml-2 line-through">45,000원</span>
              </div>
            </div>
            <div className="text-xs text-blue-600 mt-1">13% 할인 중</div>
          </div>
        </div>

        {/* 푸터 버튼들 */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0 rounded-b-2xl">
          <div className="space-y-3">
            <Button
              onClick={onLogin}
              className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white h-12 text-base font-semibold"
            >
              <LogIn className="w-5 h-5 mr-2" />
              로그인하기
            </Button>
            <Button
              onClick={onSignup}
              variant="outline"
              className="w-full h-12 text-base"
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
