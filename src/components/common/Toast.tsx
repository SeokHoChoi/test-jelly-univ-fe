'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

const Toast = ({ isVisible, onClose, message, type = 'info', duration = 4000 }: ToastProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // 애니메이션 완료 후 닫기
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-white border-[#003DA5] text-[#003DA5]';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#003DA5]" />;
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-[9999] transform transition-all duration-300 ease-out ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
    >
      <div
        className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg border-2 ${getToastStyles()} overflow-hidden`}
      >
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsAnimating(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 진행 바 */}
        <div className="h-1 bg-black/10">
          <div
            className="h-full bg-current transition-all ease-linear"
            style={{
              width: isAnimating ? '0%' : '100%',
              transitionDuration: `${duration}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
