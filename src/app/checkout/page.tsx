'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { preparePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';
import ReviewSlider from '@/components/home/ReviewSlider';
import Card from '@/components/common/Card';
import LoginRequiredModal from '@/components/common/LoginRequiredModal';
import { Check } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('plan');
  const [dogName, setDogName] = useState<string>('냥구');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const router = useRouter();

  // Process cards data
  const processCards = [
    {
      no: '01',
      title: '문답지 작성',
      desc: '1:1 맞춤 리포트를 위하여 문답지 작성 시 제출해주세요. 내용에 따라 이전 결과와 달라질 수 있습니다.'
    },
    {
      no: '02',
      title: '리포트 제작',
      desc: '제출하신 정보를 바탕으로\n국제적으로 신뢰받는 기관들의\n데이터를 학습한 AI와 서울대\n출신 수의영양 전문가가\n리포트를 제작합니다.'
    },
    {
      no: '03',
      title: '리포트 발송',
      desc: '결제 이후, 영업일 기준\n5일 이내 회원가입 시\n기재한 이메일 주소로\n리포트를 발송해드립니다.'
    }
  ];

  // Keen slider for process cards
  const [processSliderRef, processSlider] = useKeenSlider({
    loop: true,
    drag: true,
    mode: 'snap',
    renderMode: 'performance',
    slides: {
      origin: 'center',
      perView: 1.37,
      spacing: 2,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 1.4, spacing: 2 },
      },
      '(min-width: 768px)': {
        slides: { perView: 1.6, spacing: 2 },
      },
    },
  });

  // 세션스토리지에서 강아지 이름 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem('rating-store');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.state?.response?.dogInfo?.name) {
            setDogName(parsed.state.response.dogInfo.name);
          }
        }
      } catch (error) {
        console.error('강아지 이름을 가져오는 중 오류 발생:', error);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 후기 데이터 (home 페이지와 동일)
  const reviews = [
    {
      id: 'review-1',
      dogName: '레오',
      guardianName: '신혜선',
      location: '말티푸',
      title: '객관적인 데이터로 확신을 얻었어요',
      age: { value: 8, unit: 'month' as const },
      content: '처음 키우는 강아지라 정말 잘 키우고 있는지 항상 불안했어요. 레오가 사료를 잘 안 먹어서 더욱 걱정이 많았고요. 리포트를 받고 나서야 제가 먹이고 있던 방법에 대한 객관적인 평가를 받을 수 있었어요. 특히 사료 성분표를 쉽게 풀어서 설명해주셔서 이해하기 좋았고, 전문가 검증을 거친다는 점에서 큰 신뢰가 갔습니다!',
      avatar: '/img/home/tmp-review-profile/review-1.png',
    },
    {
      id: 'review-2',
      dogName: '카키',
      guardianName: '양한아',
      location: '이탈리안 그레이 하운드',
      title: '사료부터 청소 습관까지 모두 바꿨어요',
      age: { value: 6, unit: 'year' as const },
      content: '리포트를 보고 자동급식기 청소부터 사료 보관 방식까지 완전히 바꿨어요. ‘습식 사료를 상온에 1시간 이상 두면 안된다’는 한 문장에 바로 청소 습관이 달라졌죠. 색소·방부제가 든 사료 성분도 다시 살펴보고 결국 바꾸게 됐어요. 덕분에 사료 급여가 훨씬 안심되요!',
      avatar: '/img/home/tmp-review-profile/review-2.png',
    },
    {
      id: 'review-3',
      dogName: '두부',
      guardianName: '신지원',
      location: '말티즈',
      title: '노화 관리 식단 관리에 확신이 생겼어요',
      age: { value: 4, unit: 'year' as const },
      content: '4살이 되면서 점점 노화에 대한 걱정이 커졌는데, 현재 먹이고 있는 건사료가 주식으로 적합한지 궁금했어요. 리포트에서 목표 체중과 권장 칼로리를 명확히 제시해주시고, 탄수화물 비중 등 구체적인 영양소 분석을 해주셔서 사료 변경 결정에 확신이 생겼어요. 리포트 형태라 계속 참고할 수 있어서 더욱 만족스럽습니다.',
      avatar: '/img/home/tmp-review-profile/review-3.png',
    },
    {
      id: 'review-4',
      dogName: '밤비',
      guardianName: '남은비',
      location: '셔틀랜드 쉽독',
      title: '영양제 과다섭취를 발견해서 정말 다행이에요',
      age: { value: 1, unit: 'year' as const },
      content: '밤비가 계란노른자 알러지와 슬개골 문제가 있어서 영양 관리가 정말 어려웠어요. 알러지 성분을 피하면서 영양 균형을 맞추는 게 쉽지 않았거든요. 리포트를 받고 충격적이었던 건 영양제를 너무 과하게 먹이고 있다는 사실이었어요! 모르고 계속 먹였다면 오히려 독이 될 뻔했는데, 일찍 알게 되어 정말 다행입니다. 리포트를 기반으로 식단과 영양제를 모두 바꿨어요!',
      avatar: '/img/home/tmp-review-profile/review-4.png',
    },
    {
      id: 'review-5',
      dogName: '하이',
      guardianName: '김지우',
      location: '포메라니안',
      title: '데이터 기반의 분석이 정말 만족스러워요',
      age: { value: 2, unit: 'year' as const },
      content: '기존 수의사 컨설팅은 35만원이나 해서 부담스러웠는데, 이 정도 퀄리티를 합리적인 가격에 받을 수 있어서 너무 좋았어요. 원그래프와 영양성분비 등 시 각적 구성도 우수하고, 사료 뒤 라벨의 애매한 정보를 구체적 수치로 명확하게 보여주셔서 이해하기 쉬웠어요. 평소 꼼꼼히 기록하는 편인데, 제가 계산한 것과 비교해봐도 정확했습니다!',
      avatar: '/img/home/tmp-review-profile/review-5.png',
    },
    {
      id: 'review-6',
      dogName: '도담이',
      guardianName: '박혜영',
      location: '셔틀랜드 쉽독',
      title: '며칠 만에 황금빛 단단한 똥이 나왔어요',
      age: { value: 1, unit: 'year' as const },
      content: '리포트를 받고 급여량부터 조절했어요. 이후 추천받은 식단을 참고해 모두 변경 했고요.그랬더니 훈련 때문에 설사에 가깝던 변이 며칠 만에 황금빛 단단한 똥으로 바뀌더라고요.이렇게 바로 결과가 보이니 신뢰가 확 갔죠!',
      avatar: '/img/home/tmp-review-profile/review-6.png',
    },
    {
      id: 'review-7',
      dogName: '카쿠',
      guardianName: '황윤희',
      location: '이탈리안 그레이 하운드',
      title: '구리축적 걱정이 해결됐어요',
      age: { value: 4, unit: 'year' as const },
      content: '카쿠가 구리축적 유전자를 가지고 있어서 사료 선택이 정말 까다로웠어요. 어떤 사료 회사에 구리 함량을 물어봐도 알려주지 않더라고요.리포트에서 에너지원 구성 적절성을 자세히 분석해주시고, 현재 과다 급여하고 있다는 것도 정확히 파악해주셔서 큰 도움이 됐어요.이제 확신을 가지고 급여량을 조절할 수 있게 됐습니다.',
      avatar: '/img/home/tmp-review-profile/review-7.png',
    },
  ];

  // NICEPAY SDK 로더
  const ensureNiceSdkLoaded = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as { AUTHNICE?: unknown }).AUTHNICE) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[src="https://pay.nicepay.co.kr/v1/js/"]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('SDK 로드 실패')));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://pay.nicepay.co.kr/v1/js/';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('SDK 로드 실패'));
      document.body.appendChild(script);
    });
  };

  const handlePrepareAndPay = async () => {
    try {
      setLoading(true);

      // JWT 토큰 확인
      const token = getToken();
      if (!token) {
        setLoginModalOpen(true);
        return;
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

      // NICEPAY 결제창 호출
      await ensureNiceSdkLoaded();
      (window as { AUTHNICE: { requestPay: (data: unknown) => void } }).AUTHNICE.requestPay({
        clientId: modifiedData.clientId,
        method: 'card',
        orderId: modifiedData.orderId,
        amount: modifiedData.amount,
        goodsName: modifiedData.goodsName,
        returnUrl: modifiedData.returnUrl,
        sandbox: true,
        ...(modifiedData.timestamp && { timestamp: Number(modifiedData.timestamp) }),
        ...(modifiedData.signature && { signature: modifiedData.signature }),
        buyerName: modifiedData.buyerName ?? '',
        buyerEmail: modifiedData.buyerEmail ?? '',
        buyerTel: modifiedData.buyerTel ?? '',
        fnSuccess: () => { },
        fnFail: () => { alert('결제에 실패했습니다. 다시 시도해주세요.'); },
        fnError: (err: unknown) => {
          const message = err && typeof err === 'object' && 'message' in err ? String((err as { message?: unknown }).message) : String(err);
          alert('결제 중 오류가 발생했습니다: ' + message);
        },
      });

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
        {/* 스크롤 액션 버튼 */}
        <div className='w-full flex justify-center mb-8'>
          <nav>
            <div className='inline-flex items-center gap-1 bg-white rounded-full p-1 border border-gray-200 overflow-x-auto'>
              {[
                { id: 'plan', label: '플랜' },
                { id: 'process', label: '프로세스' },
                { id: 'reviews', label: '후기' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      scrollToSection(tab.id);
                    }}
                    className={`whitespace-nowrap h-10 px-5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${isActive
                      ? 'bg-[#003DA5] text-white shadow'
                      : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* 헤드라인 */}
        <div className='text-center mb-10 md:mb-16'>
          <h1 className='text-[25px] md:text-[40px] leading-tight'>
            <span className='text-[#003DA5] font-semibold'>{dogName}</span>
            <span className='text-[#000000] font-medium'>의 현재 식단, 정말 안전한지<br />
              서울대·한국수의영양학회 임원 수의사가 분석해 드려요!</span>
          </h1>
        </div>

        {/* 가격 카드 */}
        <div id="plan" className='flex justify-center mb-12 md:mb-16'>
          <Card className='relative w-full max-w-[571px] border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px]'>
            {/* 할인 배지 */}
            <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
              <span className='bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium'>
                13% 할인
              </span>
            </div>
            <div className='text-left mb-8'>
              <p className='text-[15px] md:text-[20px] font-semibold text-[#003DA5] mb-1'>
                현재 식단이 우리 아이에게 잘 맞는지 걱정이라면
              </p>
              <h3 className='text-[20px] md:text-[30px] font-bold text-[#000000] mb-2'>
                현재 급여 식단 분석
              </h3>
              <p className='text-[14px] md:text-[16px] text-[#666666] mb-2 font-medium'>
                아이의 에너지량과 필요 영양소를 바탕으로, 현재 급여 중인 식단 최대 3종을 <span className='text-orange-500'>영양·품질·안전성</span>까지 맞춤 분석합니다!
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

              {/* 결제 버튼 (UI 동일, 클릭 시 프리페어 후 즉시 결제) */}
              <div className='mb-8'>
                <button
                  onClick={handlePrepareAndPay}
                  disabled={loading}
                  className='w-full bg-[#003DA5] text-white hover:bg-[#002A7A] active:bg-[#001F5C] h-12 px-6 text-lg font-bold rounded-lg transition-colors disabled:opacity-50'
                >
                  {loading ? '결제 준비 중...' : '결제하기'}
                </button>
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
        <div id="process" className='mb-12 md:mb-16 mt-1'>
          <div className='text-center mb-10 md:mb-18'>
            <p className='text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]'>
              서비스 프로세스
            </p>
            <h2 className='text-[25px] md:text-[40px] font-medium text-[#000000] leading-tight'>
              우리 아이만을 위한 1:1 맞춤 리포트<br />
              이렇게 제공해드려요
            </h2>
          </div>

          {/* 모바일: 캐러셀, 데스크탑: 기존 UI */}
          <div className="block md:hidden">
            {/* Process Cards Carousel (모바일만) */}
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div
                  ref={processSliderRef}
                  className="keen-slider overflow-hidden"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch'
                  }}
                >
                  {processCards.map((item) => (
                    <div
                      key={item.no}
                      className="keen-slider__slide"
                      style={{
                        width: 'auto',
                        minHeight: 'auto',
                        flexShrink: 0,
                        display: 'block'
                      }}
                    >
                      <div
                        className='bg-[#003DA5] text-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[280px] h-[320px] p-6'
                        style={{
                          padding: item.no === '03' ? '25px 30px 25px 25px' : '25px 25px 25px 25px'
                        }}
                      >
                        <div className='text-[30px] font-bold text-white mb-0.5 leading-none'>{item.no}</div>
                        <div className='text-[25px] font-medium text-white leading-none mb-[60px]'>{item.title}</div>
                        <p
                          className='text-[18px] font-normal text-white opacity-90'
                          style={{ wordBreak: 'keep-all', lineHeight: '1.3' }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 데스크탑: 기존 UI */}
          <div className='hidden md:flex flex-row justify-center items-center gap-4'>
            {processCards.map((item) => (
              <div
                key={item.no}
                className='bg-[#003DA5] text-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                style={{
                  width: '375px',
                  height: '424px',
                  padding: item.no === '03' ? '37px 70px 37px 44px' : '37px 37px 37px 44px'
                }}
              >
                <div className='text-[40px] font-bold text-white mb-0.5 leading-none'>{item.no}</div>
                <div className='text-[35px] font-medium text-white leading-none' style={{ marginBottom: '85px' }}>{item.title}</div>
                <p
                  className='text-[25px] font-normal text-white opacity-90'
                  style={{ wordBreak: 'keep-all', lineHeight: '1.3' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 후기 섹션 */}
        <div id="reviews" className='mb-12 md:mb-16' style={{ marginTop: '70px' }}>
          <div className='text-center mb-10 md:mb-10'>
            <p className='text-[15px] md:text-[20px] font-medium text-[#003DA5] mb-[15px] md:mb-[20px]'>
              CBT 참여 보호자들의 후기
            </p>
            <h2 className='text-[25px] md:text-[40px] font-medium text-[#000000] leading-tight'>
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
          <button
            onClick={handlePrepareAndPay}
            disabled={loading}
            className='w-full md:w-auto min-w-[200px] bg-[#003DA5] hover:bg-[#002A7A] text-white px-6 py-3 rounded-[10px] font-semibold disabled:opacity-50'
          >
            {loading ? '결제 준비 중...' : '결제하기'}
          </button>
        </div>
      </div>

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={() => {
          setLoginModalOpen(false);
          router.push('/login');
        }}
        onSignup={() => {
          setLoginModalOpen(false);
          router.push('/signup');
        }}
      />
    </div>
  );
}


