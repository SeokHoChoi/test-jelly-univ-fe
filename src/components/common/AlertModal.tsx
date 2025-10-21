'use client';

import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Button from '@/components/common/Button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  confirmText?: string;
}

export default function AlertModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  confirmText = '확인'
}: AlertModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full">
        {/* 컨텐츠 */}
        <div className="p-6 text-center">
          {/* 아이콘 */}
          <div className={`w-12 h-12 ${getIconBg()} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {getIcon()}
          </div>
          
          {/* 제목 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          
          {/* 메시지 */}
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
        </div>

        {/* 푸터 버튼 */}
        <div className="p-6 pt-0">
          <Button
            onClick={onClose}
            className={`w-full ${
              type === 'success' 
                ? 'bg-[#003DA5] hover:bg-[#002A7A] text-white' 
                : type === 'error'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
