'use client';

import { useEffect, useState } from 'react';
import { approvePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';

export default function PaymentResultPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const tid = query.get('tid') || '';
    const orderId = query.get('orderId') || sessionStorage.getItem('np_orderId') || '';
    const amountStr = query.get('amount') || sessionStorage.getItem('np_amount') || '0';
    const amount = Number(amountStr) || 0;

    if (!tid || !orderId || !amount) {
      setError('결제 정보가 올바르지 않습니다.');
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setError('인증이 필요합니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await approvePayment(token, { tid, orderId, amount });
        if (!response?.success) throw new Error(response?.message || '결제 승인 실패');
        setResult(response.data);
        sessionStorage.removeItem('np_orderId');
        sessionStorage.removeItem('np_amount');
      } catch (err: any) {
        setError(err?.message || '결제 승인 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className='text-center'>결제 승인 중...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;
  if (!result) return <p className='text-center'>결제 승인 결과를 불러올 수 없습니다.</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-4'>결제가 완료되었습니다 🎉</h1>
      <p>결제 금액: {result.payment.amount.toLocaleString()}원</p>
      <p>결제 수단: {result.payment.cardName}</p>
      {result.payment.receiptUrl && (
        <a
          href={result.payment.receiptUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline mt-4'
        >
          영수증 보기
        </a>
      )}
    </div>
  );
}
