'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-4">결제 완료</h1>
        <p className="text-gray-600 mb-2">결제가 성공적으로 완료되었습니다.</p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">주문번호: {orderId}</p>
        )}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}
