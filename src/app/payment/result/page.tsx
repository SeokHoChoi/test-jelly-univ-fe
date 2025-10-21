'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { approvePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { CheckCircle, XCircle, Receipt, Home, User, ArrowLeft } from 'lucide-react';

type ApproveResult = {
  payment: {
    amount: number;
    cardName?: string;
    receiptUrl?: string;
  };
};

export default function PaymentResultPage() {
  const [result, setResult] = useState<ApproveResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      } catch (err) {
        const message = err instanceof Error ? err.message : '결제 승인 실패';
        setError(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 승인 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 실패</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/checkout')}
              className="flex-1 bg-[#003DA5] hover:bg-[#002A7A] text-white"
            >
              다시 결제하기
            </Button>
            <Button
              onClick={() => router.push('/home')}
              variant="outline"
              className="flex-1"
            >
              홈으로
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 정보 오류</h2>
          <p className="text-gray-600 mb-6">결제 승인 결과를 불러올 수 없습니다.</p>
          <Button
            onClick={() => router.push('/home')}
            className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white"
          >
            홈으로 돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-gray-900">결제 완료</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="p-4">
        <Card className="p-6 text-center max-w-md mx-auto">
          {/* 성공 아이콘 */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* 메인 메시지 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h1>
          <p className="text-gray-600 mb-8">젤리유 프리미엄 플랜 구독이 시작되었습니다</p>

          {/* 결제 정보 카드 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">결제 금액</span>
              <span className="text-lg font-bold text-gray-900">{formatAmount(result.payment.amount)}</span>
            </div>
            {result.payment.cardName && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">결제 수단</span>
                <span className="text-sm text-gray-900">{result.payment.cardName}</span>
              </div>
            )}
          </div>

          {/* 영수증 버튼 */}
          {result.payment.receiptUrl && (
            <Button
              onClick={() => window.open(result.payment.receiptUrl, '_blank')}
              variant="outline"
              className="w-full mb-4"
            >
              <Receipt className="w-4 h-4 mr-2" />
              영수증 보기
            </Button>
          )}

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/mypage')}
              className="w-full bg-[#003DA5] hover:bg-[#002A7A] text-white h-12 text-base font-semibold"
            >
              <User className="w-5 h-5 mr-2" />
              마이페이지에서 확인하기
            </Button>
            <Button
              onClick={() => router.push('/home')}
              variant="outline"
              className="w-full h-12 text-base"
            >
              <Home className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
