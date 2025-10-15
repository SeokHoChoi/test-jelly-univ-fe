'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { preparePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';
import NicePayButton from '@/components/NicePayButton';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  type PaymentData = {
    clientId: string;
    orderId: string;
    amount: number;
    goodsName: string;
    returnUrl: string;
    timestamp: string;
    signature: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerTel?: string;
  } | null;

  const [paymentData, setPaymentData] = useState<PaymentData>(null);
  const router = useRouter();

  const handlePreparePayment = async () => {
    try {
      setLoading(true);

      // JWT 토큰 확인
      const token = getToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        return router.push('/login');
      }

      // 결제 준비 API 호출 (1원 테스트)
      const response = await preparePayment(token, {
        planType: 'premium',
        amount: 100, // 100원으로 테스트
        goodsName: '젤리유 프리미엄 플랜 (3개월) - 테스트',
      });

      if (!response?.success) throw new Error('결제 준비 실패');
      const { data } = response;


      // result 페이지에서 사용할 값 저장
      sessionStorage.setItem('np_orderId', data.orderId);
      sessionStorage.setItem('np_amount', String(data.amount));

      // returnUrl 수정 (백엔드에서 "undefined/payment/result"로 오는 문제 해결)
      const modifiedData = {
        ...data,
        returnUrl: `${window.location.origin}/api/payment/result` // API 라우트로 설정
      };

      // 결제 데이터 설정 (NicePayButton에서 사용)
      setPaymentData(modifiedData);

    } catch (err) {
      console.error(err);
      alert('결제 준비 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-4'>결제 페이지</h1>
      <p className='mb-6'>젤리유 프리미엄 플랜 (3개월) - 29,000원</p>

      {!paymentData ? (
        <button
          onClick={handlePreparePayment}
          disabled={loading}
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
        >
          {loading ? '결제 준비 중...' : '결제 준비하기'}
        </button>
      ) : (
        <NicePayButton
          clientId={paymentData.clientId}
          orderId={paymentData.orderId}
          amount={paymentData.amount}
          goodsName={paymentData.goodsName}
          returnUrl={paymentData.returnUrl}
          timestamp={Number(paymentData.timestamp)}
          signature={paymentData.signature}
          buyerName={paymentData.buyerName ?? ''}
          buyerEmail={paymentData.buyerEmail ?? ''}
          buyerTel={paymentData.buyerTel ?? ''}
          onSuccess={() => {
            // 결제 성공 시 추가 처리 (필요시)
          }}
          onFail={() => {
            alert('결제에 실패했습니다. 다시 시도해주세요.');
          }}
        />
      )}
    </div>
  );
}


