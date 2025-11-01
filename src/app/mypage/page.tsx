'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/auth';
import { getSubscription, getPaymentHistory, cancelPayment } from '@/lib/paymentClient';
import { SubscriptionResponse, PaymentHistoryResponse } from '@/lib/paymentClient';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import PaymentCancelModal from '@/components/common/PaymentCancelModal';
import AlertModal from '@/components/common/AlertModal';
import { Calendar, CreditCard, Receipt, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function MyPage() {
  const { isLoggedIn, user, isLoading } = useAuthContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'subscription' | 'history'>('subscription');
  const [subscription, setSubscription] = useState<SubscriptionResponse['data']>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    orderId: string;
    amount: number;
    goodsName: string;
  } | null>(null);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
      return;
    }

    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, isLoading, router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      // 구독 정보와 결제 내역을 병렬로 로드
      const [subscriptionRes, historyRes] = await Promise.all([
        getSubscription(token),
        getPaymentHistory(token, 20, 0)
      ]);

      setSubscription(subscriptionRes.data);
      setPaymentHistory(historyRes.data);
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPayment = (payment: { orderId: string; amount: number; goodsName: string }) => {
    setSelectedPayment(payment);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async (reason: string) => {
    if (!selectedPayment) return;

    try {
      setCancelling(selectedPayment.orderId);
      const token = getToken();
      if (!token) return;

      const response = await cancelPayment(token, {
        orderId: selectedPayment.orderId,
        reason
      });

      if (response.success) {
        // 성공 모달 표시
        setAlertModal({
          isOpen: true,
          type: 'success',
          title: '결제 취소 완료',
          message: '결제가 성공적으로 취소되었습니다. 환불은 영업일 기준 2-3일 소요됩니다.'
        });
        await loadData(); // 데이터 새로고침
        setCancelModalOpen(false);
        setSelectedPayment(null);
      } else {
        // API에서 에러 응답
        setAlertModal({
          isOpen: true,
          type: 'error',
          title: '결제 취소 실패',
          message: response.message || '결제 취소에 실패했습니다. 다시 시도해주세요.'
        });
      }
    } catch (error) {
      console.error('결제 취소 실패:', error);

      // 에러 메시지 파싱
      let errorMessage = '결제 취소에 실패했습니다.';
      let errorTitle = '결제 취소 실패';

      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.error) {
            errorMessage = errorData.error;
          }
          if (errorData.code) {
            errorTitle = `결제 취소 실패 (${errorData.code})`;
          }
        } catch {
          errorMessage = error.message;
        }
      }

      setAlertModal({
        isOpen: true,
        type: 'error',
        title: errorTitle,
        message: errorMessage
      });
    } finally {
      setCancelling(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return '승인완료';
      case 'cancelled':
        return '취소됨';
      case 'pending':
        return '대기중';
      case 'failed':
        return '실패';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">안녕하세요, {user?.name}님!</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'subscription'
                ? 'bg-[#003DA5] text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                구독 정보
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'history'
                ? 'bg-[#003DA5] text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Receipt className="w-4 h-4" />
                결제 내역
              </div>
            </button>
          </nav>
        </div>

        {/* 구독 정보 탭 */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            {loading ? (
              <Card className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
                <p className="text-gray-600">구독 정보를 불러오는 중...</p>
              </Card>
            ) : subscription ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">현재 구독</h3>
                    <p className="text-gray-600">활성화된 구독 정보입니다</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${subscription.status === 'active'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 bg-gray-50'
                    }`}>
                    {subscription.status === 'active' ? '활성' : subscription.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">플랜</label>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{subscription.plan_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">결제 금액</label>
                    <p className="text-lg font-semibold text-gray-900">{formatAmount(subscription.amount)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                    <p className="text-gray-900">{formatDate(subscription.start_date)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">만료일</label>
                    <p className="text-gray-900">{formatDate(subscription.end_date)}</p>
                  </div>
                </div>

                {subscription.receipt_url && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      onClick={() => window.open(subscription.receipt_url, '_blank')}
                      variant="outline"
                      className="w-full"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      영수증 보기
                    </Button>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">활성 구독이 없습니다</h3>
                <p className="text-gray-600 mb-6">새로운 구독을 시작해보세요</p>
                <Button
                  onClick={() => router.push('/checkout')}
                  className="bg-[#003DA5] hover:bg-[#002A7A] text-white"
                >
                  구독하기
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* 결제 내역 탭 */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {loading ? (
              <Card className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
                <p className="text-gray-600">결제 내역을 불러오는 중...</p>
              </Card>
            ) : paymentHistory.length > 0 ? (
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <Card key={payment.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(payment.status)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{payment.goods_name}</h4>
                          <p className="text-sm text-gray-600">주문번호: {payment.order_id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{formatAmount(payment.amount)}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="block text-gray-500 mb-1">결제일</label>
                        <p className="text-gray-900">{formatDate(payment.approved_at)}</p>
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">결제수단</label>
                        <p className="text-gray-900">
                          {payment.pay_method === 'card' && payment.card_name
                            ? `${payment.card_name} ${payment.card_number || ''}`
                            : payment.pay_method
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">플랜</label>
                        <p className="text-gray-900 capitalize">{payment.plan_type}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        {payment.receipt_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(payment.receipt_url, '_blank')}
                          >
                            <Receipt className="w-4 h-4 mr-1" />
                            영수증
                          </Button>
                        )}
                      </div>
                      {payment.status === 'approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelPayment({
                            orderId: payment.order_id,
                            amount: payment.amount,
                            goodsName: payment.goods_name
                          })}
                          disabled={cancelling === payment.order_id}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          {cancelling === payment.order_id ? '취소 중...' : '결제 취소'}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">결제 내역이 없습니다</h3>
                <p className="text-gray-600 mb-6">아직 결제한 내역이 없습니다</p>
                <Button
                  onClick={() => router.push('/checkout')}
                  className="bg-[#003DA5] hover:bg-[#002A7A] text-white"
                >
                  구독하기
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* 결제 취소 모달 */}
      {selectedPayment && (
        <PaymentCancelModal
          isOpen={cancelModalOpen}
          onClose={() => {
            setCancelModalOpen(false);
            setSelectedPayment(null);
          }}
          onConfirm={handleConfirmCancel}
          paymentInfo={selectedPayment}
          isLoading={cancelling === selectedPayment.orderId}
        />
      )}

      {/* 알림 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
      />
    </div>
  );
}