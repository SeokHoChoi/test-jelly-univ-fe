'use client';

import { useState } from 'react';
import { X, AlertTriangle, CreditCard } from 'lucide-react';
import Button from '@/components/common/Button';

interface PaymentCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  paymentInfo: {
    amount: number;
    goodsName: string;
    orderId: string;
  };
  isLoading?: boolean;
}

export default function PaymentCancelModal({
  isOpen,
  onClose,
  onConfirm,
  paymentInfo,
  isLoading = false
}: PaymentCancelModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    { value: '단순 변심', label: '단순 변심' },
    { value: '중복 결제', label: '중복 결제' },
    { value: '서비스 불만', label: '서비스 불만' },
    { value: '기타', label: '기타' }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const handleConfirm = () => {
    const reason = selectedReason === '기타' ? customReason : selectedReason;
    if (!reason.trim()) {
      alert('취소 사유를 선택해주세요.');
      return;
    }
    onConfirm(reason);
  };

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">결제 취소</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 space-y-6">
          {/* 결제 정보 */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">취소할 결제</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">상품명</span>
                <span className="text-sm font-medium text-gray-900">{paymentInfo.goodsName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">결제 금액</span>
                <span className="text-sm font-bold text-gray-900">{formatAmount(paymentInfo.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">주문번호</span>
                <span className="text-sm text-gray-900 font-mono">{paymentInfo.orderId}</span>
              </div>
            </div>
          </div>

          {/* 취소 사유 선택 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">취소 사유를 선택해주세요</h3>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <label
                  key={reason.value}
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.value}
                    checked={selectedReason === reason.value}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-[#003DA5] border-gray-300 focus:ring-[#003DA5]"
                  />
                  <span className="ml-3 text-sm text-gray-900">{reason.label}</span>
                </label>
              ))}
            </div>

            {/* 기타 사유 입력 */}
            {selectedReason === '기타' && (
              <div className="mt-3">
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="취소 사유를 입력해주세요"
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* 주의사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">취소 시 주의사항</p>
                <ul className="space-y-1 text-xs">
                  <li>• 취소된 결제는 즉시 환불 처리됩니다</li>
                  <li>• 환불은 영업일 기준 2-3일 소요됩니다</li>
                  <li>• 구독 서비스는 취소 즉시 중단됩니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 버튼들 */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading || !selectedReason}
            >
              {isLoading ? '처리 중...' : '결제 취소'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
