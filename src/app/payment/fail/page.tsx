'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function PaymentFailPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const msg = searchParams.get('message');
    setMessage(msg || '결제에 실패했습니다.');
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-5xl mb-4">✕</div>
        <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailPageContent />
    </Suspense>
  );
}
