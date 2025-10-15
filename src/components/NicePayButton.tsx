'use client';

import { useEffect } from 'react';

// NICEPAY SDK 타입 정의
declare global {
  interface Window {
    AUTHNICE: {
      requestPay: (data: NicePayRequest) => void;
    };
  }
}

type NicePayRequest = {
  clientId: string;
  method: 'card';
  orderId: string;
  amount: number;
  goodsName: string;
  returnUrl: string;
  sandbox: boolean;
  timestamp?: number;
  signature?: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerTel?: string;
  fnSuccess?: (res: unknown) => void;
  fnFail?: (err: unknown) => void;
  fnError?: (err: unknown) => void;
};

interface Props {
  clientId: string;
  orderId: string;
  amount: number;
  goodsName: string;
  returnUrl: string;
  timestamp: number;
  signature: string;
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
  onSuccess?: (res: unknown) => void;
  onFail?: (err: unknown) => void;
}

export default function NicePayButton({
  clientId,
  orderId,
  amount,
  goodsName,
  returnUrl,
  timestamp,
  signature,
  buyerName,
  buyerEmail,
  buyerTel,
  onSuccess,
  onFail
}: Props) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pay.nicepay.co.kr/v1/js/';
    script.async = true;
    script.onload = () => { };
    script.onerror = () => console.error('SDK 로드 실패');
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="pay.nicepay.co.kr"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handlePayment = () => {
    if (!window.AUTHNICE) {
      alert('결제 SDK 로드에 실패했습니다. 새로고침 후 다시 시도해주세요.');
      return;
    }

    window.AUTHNICE.requestPay({
      clientId,
      method: 'card',
      orderId,
      amount,
      goodsName,
      returnUrl,
      sandbox: true,
      ...(timestamp && { timestamp }),
      ...(signature && { signature }),
      buyerName,
      buyerEmail,
      buyerTel,
      fnSuccess: (res) => {
        onSuccess?.(res);
      },
      fnFail: (err) => {
        onFail?.(err);
      },
      fnError: (err) => {
        const message = err && typeof err === 'object' && 'message' in err ? String((err as { message?: unknown }).message) : String(err);
        alert('결제 중 오류가 발생했습니다: ' + message);
        onFail?.(err);
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      결제하기
    </button>
  );
}
