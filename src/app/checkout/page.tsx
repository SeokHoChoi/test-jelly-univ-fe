'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { preparePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';
import NicePayButton from '@/components/NicePayButton';
import ReviewSlider from '@/components/home/ReviewSlider';
import Card from '@/components/common/Card';
import { Check } from 'lucide-react';

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

  // 후기 데이터 (home 페이지와 동일)
  const reviews = [
    {
      id: 'review-1',
      dogName: '두부',
      guardianName: '신지원',
      location: '말티즈',
      title: '노화 관리 식단 관리에 확신이 생겼어요',
      age: { value: 4, unit: 'year' as const },
      content: '4살이 되면서 점점 노화에 대한 걱정이 커졌는데, 현재 먹이고 있는 건사료가 주식으로 적합한지 궁금했어요. 리포트에서 목표 체중과 권장 칼로리를 명확히 제시해주시고, 탄수화물 비중 등 구체적인 영양소 분석을 해주셔서 사료 변경 결정에 확신이 생겼어요. 리포트 형태라 계속 참고할 수 있어서 더 만족스럽습니다.',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      id: 'review-2',
      dogName: '밤비',
      guardianName: '남은비',
      location: '셔틀랜드 쉽독',
      title: '영양제 과다섭취를 발견해서 정말 다행이에요',
      age: { value: 1, unit: 'year' as const },
      content: '밤비가 계란노른자 알레르기와 슬개골 문제가 있어서 영양 관리가 정말 어려웠어요. 알러지 성분을 피하면서 영양 균형을 맞추는 게 쉽지 않았거든요. 리포트를 받고 충격적이었던 건 영양제를 너무 과하게 먹이고 있었다는 사실이었어요! 모르게 계속 먹였다가 오히려 독이 될 뻔했는데, 일찍 알게 되어 정말 다행입니다. 리포트를 기반으로 식단과 영양제를 모두 바꿨어요!',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      id: 'review-3',
      dogName: '하이',
      guardianName: '김지우',
      location: '포메라니안',
      title: '데이터 기반의 분석이 정말 만족스러워요',
      age: { value: 2, unit: 'year' as const },
      content: '기존 수의사 컨설팅은 35만원이나 해서 부담스러웠는데, 이 정도 퀄리티를 합리적인 가격에 받을 수 있어서 너무 좋았어요. 원료프로필과 영양성분비 등 수치적 구성도 우수하고, 사료 뒤 라벨의 애매한 정보를 구체적 수치로 명확하게 보여주셔서 이해하기 쉬웠어요. 평소 꼼꼼히 기록하는 편인데, 제가 계산한 것과 비교해봐도 정확했습니다!',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
  ];

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
    <div className='min-h-screen bg-white'>
      {/* 상단 컨테이너 */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12'>
        {/* 헤드라인 */}
        <div className='text-center mb-10 md:mb-16'>
          <h1 className='text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight'>
            <span className='text-[#003DA5]'>냥구</span>의 현재 식단, 정말 안전한지<br />
            서울대·한국수의영양학회 임원 수의사가 분석해 드려요!
          </h1>
        </div>

        {/* 가격 카드 */}
        <div className='flex justify-center mb-12 md:mb-16'>
          <Card className='relative w-full max-w-[400px] border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px]'>
            {/* 할인 배지 */}
            <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
              <span className='bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium'>
                13% 할인
              </span>
            </div>
            <div className='text-left mb-8'>
              <h3 className='text-[20px] md:text-[30px] font-medium text-[#000000] mb-2'>
                현재 급여 식단 분석
              </h3>
              <p className='text-[15px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)] mb-6'>
                현재 식단이 우리 아이에게 잘 맞는지 걱정이라면
              </p>

              <div className='mb-6'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-[40px] md:text-[55px] font-bold text-[#003DA5]'>
                    3.9만원
                  </span>
                  <span className='line-through text-[17px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)]'>
                    / 정가 4.5만원
                  </span>
                </div>
              </div>

              {/* 첫 번째 결제 버튼 */}
              <div className='mb-8'>
                {!paymentData ? (
                  <button
                    onClick={handlePreparePayment}
                    disabled={loading}
                    className='w-full bg-[#003DA5] text-white hover:bg-[#002A7A] active:bg-[#001F5C] h-12 px-6 text-lg font-bold rounded-lg transition-colors disabled:opacity-50'
                  >
                    {loading ? '결제 준비 중...' : '결제하기'}
                  </button>
                ) : (
                  <div className='w-full'>
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
                  </div>
                )}
              </div>
            </div>

            <ul className='space-y-[6px] md:space-y-2'>
              {[
                '현재 급여 사료의 국제 표준(AAFCO /FEDIAF) 준수 여부',
                '현재 급여 사료의 에너지원 구성 및 주요 영양소 비율의 적정성',
                '현재 급여 사료의 필수 및 기능성 영양소 포함 여부',
                '반려견의 현재 신체 상태 진단',
                '목표 체중 및 일일 목표 칼로리 설정',
                '현재 섭취 칼로리 및 영양소 함량 분석',
                '현재 vs 목표 영양 섭취량 비교 분석',
                '급여 식단과 영양제의 상호작용 및 평가',
                '종합 결론 및 솔루션'
              ].map((feature, index) => (
                <li key={index} className='flex items-start gap-[6px] md:gap-2'>
                  <Check className='text-[#1E1E1E] flex-shrink-0 mt-0.5' size={20} />
                  <span className='font-medium text-[14px] md:text-[18px] leading-[25px] text-[#1E1E1E]'>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 서비스 프로세스 */}
        <div className='mb-12 md:mb-16'>
          <div className='text-center mb-10 md:mb-18'>
            <p className='text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]'>
              서비스 프로세스
            </p>
            <h2 className='text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight'>
              우리 아이만을 위한 1:1 맞춤 리포트<br />
              이렇게 제공해드려요
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                no: '01',
                title: '문답지 작성',
                desc: '1:1 맞춤 리포트를 위하여 문답지 작성 시 제출해주세요. 내용에 따라 이전 결과와 달라질 수 있습니다.'
              },
              {
                no: '02',
                title: '리포트 제작',
                desc: '제출해주신 정보를 바탕으로, 국내에서 손꼽히는 기량과 데이터를 학습한 최신 AI와 서울대 출신 수의영양 전문가가 리포트를 제작합니다.'
              },
              {
                no: '03',
                title: '리포트 발송',
                desc: '결제 이후, 영업일 기준 3-5일 이내 회원가입 시 기재한 이메일 주소로 리포트를 발송해드립니다.'
              }
            ].map((item) => (
              <div key={item.no} className='bg-[#003DA5] text-white rounded-[16px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)]'>
                <div className='text-[24px] md:text-[28px] font-bold mb-3'>{item.no}</div>
                <div className='text-[20px] md:text-[24px] font-semibold mb-4'>{item.title}</div>
                <p className='text-[15px] md:text-[17px] leading-relaxed opacity-90'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 후기 섹션 */}
        <div className='mb-12 md:mb-16'>
          <div className='text-center mb-10 md:mb-18'>
            <p className='text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]'>
              CBT 참여 보호자들의 후기
            </p>
            <h2 className='text-[22px] md:text-[45px] font-medium text-[#000000] leading-tight'>
              현재 식단 분석을 경험한<br />
              실제 보호자들의 후기를 확인해보세요!
            </h2>
          </div>

          <ReviewSlider reviews={reviews} showDots={true} />
        </div>
      </div>

      {/* 하단 고정 결제 영역 */}
      <div className='sticky bottom-0 left-0 right-0 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-center'>
          {!paymentData ? (
            <button
              onClick={handlePreparePayment}
              disabled={loading}
              className='w-full md:w-auto min-w-[200px] bg-[#003DA5] hover:bg-[#002A7A] text-white px-6 py-3 rounded-[10px] font-semibold disabled:opacity-50'
            >
              {loading ? '결제 준비 중...' : '결제하기'}
            </button>
          ) : (
            <div className='w-full md:w-auto'>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


