'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { preparePayment } from '@/lib/paymentClient';
import { getToken } from '@/utils/auth';
import { API_URLS } from '@/utils/constants';
import ReviewSlider from '@/components/home/ReviewSlider';
import Card from '@/components/common/Card';
import LoginRequiredModal from '@/components/common/LoginRequiredModal';
import PlanSelectionModal from '@/components/common/PlanSelectionModal';
import SampleReportModal from '@/components/common/SampleReportModal';
import { Check } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';

function CheckoutPageContent() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('plan');
  const [dogName, setDogName] = useState<string>('우리 아이');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [planSelectionModalOpen, setPlanSelectionModalOpen] = useState(false);
  const [sampleReportModalOpen, setSampleReportModalOpen] = useState(false);
  const [figmaModalOpen, setFigmaModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<'basic' | 'premium' | 'both'>('both');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Process cards data
  const processCards = [
    {
      no: '01',
      title: '문답지 작성',
      desc: '결제 이후, 1:1 맞춤 리포트를 위한 문답지 링크를 발송해드립니다.'
    },
    {
      no: '02',
      title: '리포트 제작',
      desc: '수의영양학 전문 AI와 \n서울대 출신 수의사가 \n리포트를 제작하여 발송해드립니다.'
    },
    {
      no: '03',
      title: '식단 관리',
      desc: '젤리대학교의 영양학 전문가 상담사가 Q&A 1회를 제공해드립니다.',
      note: '맞춤 식단 설계에 한하며, 리포트 수령 이후 2주이내 상담이 가능합니다.'
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
      perView: 'auto', // 자동 계산
      spacing: 12, // 모든 해상도에서 일정한 간격
    },
  });

  // 세션스토리지/로컬스토리지에서 강아지 이름 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // 1. 로컬스토리지에서 productAnalysisData 확인
        const productAnalysisData = localStorage.getItem('productAnalysisData');
        if (productAnalysisData) {
          const parsed = JSON.parse(productAnalysisData);
          if (parsed.dogName) {
            setDogName(parsed.dogName);
            return;
          }
        }

        // 2. 세션스토리지에서 surveyData 확인
        const surveyData = sessionStorage.getItem('surveyData');
        if (surveyData) {
          const parsed = JSON.parse(surveyData);
          if (parsed.dogName) {
            setDogName(parsed.dogName);
            return;
          }
        }

        // 3. 세션스토리지에서 rating-store 확인
        const ratingStore = sessionStorage.getItem('rating-store');
        if (ratingStore) {
          const parsed = JSON.parse(ratingStore);
          if (parsed?.state?.response?.dogInfo?.name) {
            setDogName(parsed.state.response.dogInfo.name);
            return;
          }
        }
      } catch (error) {
        console.error('강아지 이름을 가져오는 중 오류 발생:', error);
      }
    }
  }, []);

  // ?dir=true 쿼리 파라미터 확인하여 모달 자동 열기
  useEffect(() => {
    const dirParam = searchParams.get('dir');
    if (dirParam === 'true') {
      setSampleReportModalOpen(true);
    }
  }, [searchParams]);

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
      const existing = document.querySelector(`script[src="${API_URLS.NICEPAY_SDK_URL}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('SDK 로드 실패')));
        return;
      }
      const script = document.createElement('script');
      script.src = API_URLS.NICEPAY_SDK_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('SDK 로드 실패'));
      document.body.appendChild(script);
    });
  };

  const handlePrepareAndPay = useCallback(async (planType?: 'basic' | 'premium') => {
    try {
      setLoading(true);

      // 플랜 타입 결정: 파라미터 > sessionStorage > URL 파라미터 > 기본값(basic)
      const savedPlan = typeof window !== 'undefined' ? sessionStorage.getItem('selectedPlan') : null;
      const plan = planType || savedPlan || searchParams.get('plan') || 'basic';
      const isPremium = plan === 'premium';

      // JWT 토큰 확인
      const token = getToken();
      if (!token) {
        // 선택한 플랜 정보를 sessionStorage에 저장 (state는 버튼 클릭 시 이미 설정됨)
        sessionStorage.setItem('selectedPlan', plan);
        // 현재 URL을 리다이렉트 URL로 설정
        const currentUrl = window.location.href;
        sessionStorage.setItem('redirectAfterLogin', currentUrl);
        setLoginModalOpen(true);
        return;
      }

      // sessionStorage에 저장된 플랜 정보 삭제 (사용 후 정리)
      if (typeof window !== 'undefined' && savedPlan) {
        sessionStorage.removeItem('selectedPlan');
      }

      // 플랜에 따른 가격 설정
      const planInfo = isPremium
        ? { planType: 'premium', amount: 59000, goodsName: '젤리유 프리미엄 플랜 (3개월)' }
        : { planType: 'basic', amount: 19500, goodsName: '젤리유 베이직 플랜 (3개월)' };

      // 결제 준비 API 호출
      const response = await preparePayment(token, planInfo);

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
        sandbox: process.env.NODE_ENV === 'development',
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
  }, [searchParams]);

  // 로그인/회원가입 후 리다이렉트 시 자동 결제 진행
  useEffect(() => {
    const autoPay = searchParams.get('autoPay');
    const plan = searchParams.get('plan') as 'basic' | 'premium' | null;

    if (autoPay === 'true' && plan && getToken()) {
      if (typeof window !== 'undefined') {
        // 이미 한 번 자동 결제를 시도했는지 체크 (새로고침 시 재실행 방지)
        const alreadyTriggered = sessionStorage.getItem('autoPayTriggered');
        if (alreadyTriggered === 'true') {
          return;
        }
        sessionStorage.setItem('autoPayTriggered', 'true');
      }

      // 약간의 딜레이를 주어 페이지가 완전히 로드된 후 결제 진행
      setTimeout(() => {
        handlePrepareAndPay(plan);
      }, 500);
    }
  }, [searchParams, handlePrepareAndPay]);

  return (
    <div className='min-h-screen bg-white'>
      {/* 상단 컨테이너 */}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12'>
        {/* 스크롤 액션 버튼 */}
        <div className='w-full flex justify-center mb-8'>
          <nav>
            <div className='inline-flex items-center gap-1 bg-white rounded-full p-1 border border-gray-200 overflow-x-auto'>
              {[
                { id: 'reviews', label: '후기' },
                { id: 'plan', label: '플랜' },
                { id: 'process', label: '프로세스' }
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
        <div className='text-center mb-8 md:mb-12'>
          <h1 className='text-[25px] md:text-[40px] leading-tight mb-8 md:mb-12'>
            <span className='text-[#000000] font-medium'>치료보다 예방이 중요합니다</span>
            {/* <span className='text-[#003DA5] font-semibold'>{dogName}</span>
            <span className='text-[#000000] font-medium'>의 현재 식단, 정말 안전한지<br />
              서울대·한국수의영양학회 임원 수의사가 분석해 드려요!</span> */}
          </h1>

          {/* 비교 인포그래픽 - 콜아웃 스타일 */}
          <div className='max-w-4xl mx-auto mb-14 md:mb-20'>
            <div className='bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 md:p-8'>
              <div className='relative w-full flex items-start justify-center gap-2 md:gap-3'>
                {/* 왼쪽 그래프 영역 */}
                <div className='flex flex-col items-center w-[60%] md:w-[66.1%]'>
                  {/* 상단 라벨 - 그래프 범위 내 위에, 구분선 쪽으로 정렬 */}
                  <div className='mb-2 w-full text-right'>
                    <p className='text-[12px] md:text-[14px] font-medium text-[#383838]'>병원비</p>
                    <p className='text-[10px] md:text-[12px] text-[#383838]'>(연 평균)</p>
                  </div>

                  {/* 왼쪽 바 - 병원비 (주황/노랑 그라데이션) */}
                  <div
                    className='relative h-[62px] md:h-[80px] rounded-l-[31px] md:rounded-l-[40px] rounded-r-[5px] md:rounded-r-[7px] flex items-center justify-end pr-3 md:pr-4 w-full'
                    style={{
                      background: 'linear-gradient(to right, #F05B1B 0%, #F05B1B 60%, #FFCC00 100%)'
                    }}
                  >
                    <p className='text-[12px] md:text-[16px] font-semibold text-[#383838]'>190,000원</p>
                  </div>
                </div>

                {/* 구분선 - 그래프와 떨어져 있음 */}
                <div className='w-px h-[62px] md:h-[80px] bg-[#8E8E93] self-end' />

                {/* 오른쪽 그래프 영역 */}
                <div className='flex flex-col items-center w-[20%] md:w-[13.1%]'>
                  {/* 상단 라벨 - 그래프 범위 내 위에, 구분선 쪽으로 정렬 */}
                  <div className='mb-2 w-full text-left'>
                    <p className='text-[12px] md:text-[14px] font-medium text-[#383838] whitespace-nowrap'>맞춤 식단 설계</p>
                    <p className='text-[10px] md:text-[12px] text-[#383838] whitespace-nowrap'>(평생)</p>
                  </div>

                  {/* 오른쪽 바 - 맞춤 식단 (노란색) */}
                  <div
                    className='relative h-[62px] md:h-[80px] rounded-r-[31px] md:rounded-r-[40px] rounded-l-[5px] md:rounded-l-[7px] flex items-center justify-start pl-2 md:pl-3 w-full'
                    style={{
                      background: '#FFCC00'
                    }}
                  >
                    <p className='text-[12px] md:text-[16px] font-semibold text-[#383838] whitespace-nowrap'>19,500원</p>
                  </div>
                </div>
              </div>

              {/* 하단 메시지 - 구분선 아래 */}
              <div className='text-center mt-4'>
                <p className='text-[12px] md:text-[15px] font-semibold text-black'>
                  예방이 치료보다 약 10배 효율적입니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 후기 섹션 */}
        <div id="reviews" className='mb-16 md:mb-24'>
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

        {/* 젤리대학교 서비스 vs 타사 서비스 비교 섹션 */}
        <div
          id="service-comparison"
          className="mb-16 md:mb-28 flex justify-center"
        >
          <div className="w-full max-w-7xl px-4 md:px-8">
            {/* 데스크톱: 레퍼런스와 정확히 일치하는 UI */}
            <div className="hidden md:block">
              {/* 전체 파란 배경 컨테이너 - #003DA5 기반 */}
              <div
                className="relative rounded-[40px] p-8"
                style={{
                  background: "#003DA5"//'linear-gradient(135deg, #5B7FE4 0%, #003DA5 100%)'
                }}
              >
                {/* 3개 카드를 담는 컨테이너 - 중앙 카드가 위아래로 튀어나올 공간 확보 */}
                <div className="relative flex items-center justify-center py-8">

                  {/* 좌측 카드 - 소제목 (중앙 정렬) */}
                  <div className="flex-1 z-10">
                    <div
                      className="h-full rounded-l-[32px] border-y border-l border-white/40 backdrop-blur-sm"
                      style={{ background: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      <div className="px-8 py-10 flex flex-col gap-6">
                        {/* 헤더 공간 */}
                        <div className="h-20" />

                        {/* 라벨들 - 중앙 정렬 + 구분선 */}
                        <div className="flex items-center justify-center h-20 border-b border-[#E5E7EB]/50 pb-6">
                          <p className="text-[18px] font-bold text-[#002A7A] text-center">👨‍⚕️ 상담 주체</p>
                        </div>
                        <div className="flex items-center justify-center h-24 border-b border-[#E5E7EB]/50 pb-6">
                          <p className="text-[18px] font-bold text-[#002A7A] text-center">💬 상담 방식</p>
                        </div>
                        <div className="flex items-center justify-center h-20">
                          <p className="text-[18px] font-bold text-[#002A7A] text-center">💰 가격</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 중앙 카드 - 전체 둥글게, 돋보기 효과 (scale로 확대) */}
                  <div className="relative flex-1 z-30">
                    {/* 글로우 효과 - subtle하게 */}
                    <div
                      className="absolute -inset-6 rounded-[48px] blur-2xl opacity-25"
                      style={{ background: 'rgba(59, 130, 246, 0.3)' }}
                      aria-hidden="true"
                    />

                    {/* 중간 카드: scale로 확대해서 돋보기 효과 - 비율은 좌/우와 동일 */}
                    <div
                      className="relative bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,61,165,0.12)] transform scale-[1.15] origin-center ring-1 ring-[#003DA5]/20"
                    >
                      {/* 추천 배지 */}
                      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-[#003DA5] to-[#0051D5] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold shadow-md flex items-center gap-1.5">
                          <span className="text-[16px]">💙</span> 우리 아이 첫걸음
                        </div>
                      </div>

                      <div className="px-8 py-10 flex flex-col gap-6">
                        {/* 헤더 */}
                        <div className="h-20 flex items-center justify-center border-b-2 border-[#003DA5]/10 pb-4">
                          <div className="text-center">
                            <p className="text-[18px] font-semibold text-[#003DA5]">젤리대학교</p>
                            <p className="text-[32px] font-black text-[#003DA5] mt-1">서비스</p>
                          </div>
                        </div>

                        {/* 상담 주체 - 좌측 정렬 */}
                        <div className="flex items-start h-20 border-b border-[#E5E7EB]/50 pb-4">
                          <div className="flex-1">
                            <p className="text-[18px] font-bold text-[#003DA5] leading-relaxed">
                              수의영양학 전문가 + AI 기반 분석
                            </p>
                          </div>
                        </div>

                        {/* 상담 방식 - 좌측 정렬 */}
                        <div className="flex flex-col justify-center gap-0.5 h-24 border-b border-[#E5E7EB]/50 pb-4">
                          <p className="text-[17px] font-bold text-[#003DA5] flex items-center gap-2">
                            <span className="text-[20px]">✨</span> 보고서 기반 비대면 서비스
                          </p>
                          <p className="text-[16px] text-[#6B7280] pl-7">
                            시간·장소 제약 없음
                          </p>
                        </div>

                        {/* 가격 - 좌측 정렬 */}
                        <div className="flex flex-col justify-center h-20">
                          <p className="text-[28px] font-black text-[#003DA5]">
                            ₩19,500 ~ ₩59,000
                          </p>
                          <p className="text-[14px] text-[#6B7280] mt-1 font-medium">
                            {/* TODO: 추가 문구 ex)💎 플랜에 따라 선택 가능 */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 우측 카드 - 오른쪽만 둥글게 (좌측 정렬) */}
                  <div className="flex-1 z-10">
                    <div
                      className="h-full rounded-r-[32px] border-y border-r border-white/40 backdrop-blur-sm"
                      style={{ background: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      <div className="pl-12 pr-8 py-10 flex flex-col gap-6">
                        {/* 헤더 */}
                        <div className="h-20 flex items-center justify-center border-b border-[#E5E7EB]/50 pb-4">
                          <div className="text-center">
                            <p className="text-[18px] font-semibold text-[#6B7280]">타사</p>
                            <p className="text-[32px] font-black text-[#374151] mt-1">서비스</p>
                          </div>
                        </div>

                        {/* 상담 주체 - 좌측 정렬 */}
                        <div className="flex items-center h-20 border-b border-[#E5E7EB]/50 pb-4">
                          <p className="text-[18px] font-medium text-[#4B5563]">
                            임상/영양학 수의사
                          </p>
                        </div>

                        {/* 상담 방식 - 좌측 정렬 */}
                        <div className="flex flex-col justify-center gap-2 h-24 border-b border-[#E5E7EB]/50 pb-4">
                          <p className="text-[17px] text-[#4B5563] flex items-center gap-2">
                            <span className="text-[18px]">🏥</span> 오프라인 대면 상담
                          </p>
                          <p className="text-[16px] text-[#6B7280] pl-7">
                            예약·방문 필수
                          </p>
                        </div>

                        {/* 가격 - 좌측 정렬 */}
                        <div className="flex flex-col justify-center gap-1.5 h-20">
                          <p className="text-[18px] font-semibold text-[#374151]">A: ₩250,000</p>
                          <p className="text-[18px] font-semibold text-[#374151]">B: ₩350,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* 모바일: 데스크톱 스타일과 일관성 있게 */}
            <div className="md:hidden space-y-6">
              {/* 젤리대학교 카드 - 돋보기 효과 */}
              <div className="relative">
                {/* 글로우 효과 - subtle하게 */}
                <div className="absolute -inset-4 rounded-[32px] bg-blue-400/10 blur-xl" aria-hidden="true" />

                {/* 배지 */}
                <div className="absolute -top-5.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#003DA5] to-[#0051D5] text-white px-4 py-1 rounded-full text-[11px] font-semibold shadow-md flex items-center gap-1">
                    <span className="text-[14px]">💙</span> 우리 아이 첫걸음
                  </div>
                </div>

                <div className="relative bg-white rounded-2xl border border-[#003DA5]/20 shadow-[0_4px_20px_rgba(0,61,165,0.08)] p-6 transform scale-105 ring-1 ring-[#003DA5]/10">
                  <p className="text-center text-[16px] font-semibold text-[#003DA5]">젤리대학교</p>
                  <p className="text-center text-[24px] font-black text-[#003DA5] mb-5">서비스</p>

                  <div className="space-y-4">
                    {/* 상담 주체 */}
                    <div className="border-b border-[#E5E7EB] pb-3">
                      <p className="text-[11px] font-bold text-[#002A7A] mb-1.5 flex items-center gap-1">
                        <span>👨‍⚕️</span> 상담 주체
                      </p>
                      <p className="text-[15px] font-bold text-[#003DA5]">수의영양학 전문가 + AI 기반 분석</p>
                    </div>

                    {/* 상담 방식 */}
                    <div className="border-b border-[#E5E7EB] pb-3">
                      <p className="text-[11px] font-bold text-[#002A7A] mb-1.5 flex items-center gap-1">
                        <span>💬</span> 상담 방식
                      </p>
                      <p className="text-[14px] font-bold text-[#003DA5] flex items-center gap-1.5 mb-0.5">
                        <span>✨</span> 보고서 기반 비대면 서비스
                      </p>
                      <p className="text-[13px] text-[#6B7280] pl-5">시간·장소 제약 없음</p>
                    </div>

                    {/* 가격 */}
                    <div>
                      <p className="text-[11px] font-bold text-[#002A7A] mb-1.5 flex items-center gap-1">
                        <span>💰</span> 가격
                      </p>
                      <p className="text-[20px] font-black text-[#003DA5]">₩19,500 ~ ₩59,000</p>
                      <p className="text-[12px] text-[#6B7280] mt-0.5 font-medium">💎 플랜에 따라 선택 가능</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 타사 카드 */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E0E6F5] shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-6">
                <p className="text-center text-[16px] font-semibold text-[#6B7280]">타사</p>
                <p className="text-center text-[24px] font-black text-[#374151] mb-5">서비스</p>

                <div className="space-y-4">
                  {/* 상담 주체 */}
                  <div className="border-b border-[#E5E7EB] pb-3">
                    <p className="text-[11px] font-bold text-[#6B7280] mb-1.5 flex items-center gap-1">
                      <span>👨‍⚕️</span> 상담 주체
                    </p>
                    <p className="text-[15px] font-medium text-[#4B5563]">임상/영양학 수의사</p>
                  </div>

                  {/* 상담 방식 */}
                  <div className="border-b border-[#E5E7EB] pb-3">
                    <p className="text-[11px] font-bold text-[#6B7280] mb-1.5 flex items-center gap-1">
                      <span>💬</span> 상담 방식
                    </p>
                    <p className="text-[14px] text-[#4B5563] flex items-center gap-1.5 mb-0.5">
                      <span>🏥</span> 오프라인 대면 상담
                    </p>
                    <p className="text-[13px] text-[#6B7280] pl-5">예약·방문 필수</p>
                  </div>

                  {/* 가격 */}
                  <div>
                    <p className="text-[11px] font-bold text-[#6B7280] mb-1.5 flex items-center gap-1">
                      <span>💰</span> 가격
                    </p>
                    <p className="text-[15px] font-semibold text-[#374151]">A: ₩250,000</p>
                    <p className="text-[15px] font-semibold text-[#374151]">B: ₩350,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 가격 카드 */}
        <div id="plan" className='mb-16 md:mb-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
            {/* 3.9만원 플랜 */}
            <Card className='relative w-full border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px] flex flex-col'>
              {/* 할인 배지 */}
              <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                <span className='bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium'>
                  50% 할인
                </span>
              </div>
              <div className='text-left flex-1 flex flex-col'>
                <h3 className='text-[20px] md:text-[30px] font-bold text-[#000000] mb-4'>
                  현재 급여 식단 맞춤 설계
                </h3>
                <div className='mb-6'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-[40px] md:text-[55px] font-bold text-[#003DA5]'>
                      19,500원
                    </span>
                    <span className='line-through text-[17px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)]'>
                      / 정가 3.9만원
                    </span>
                  </div>
                </div>
                <div className='mb-6'>
                  <p className='text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3'>
                    이런 분들에게 추천드려요!
                  </p>
                  <ul className='space-y-2 text-[14px] md:text-[16px] text-[#666666]'>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 주식(사료)가 잘 맞아서 새롭게 변경하지 않아도 되는 보호자</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 주식을 활용해 우리 아이의 건강 상태에 맞게 맞춤 설계하고 싶은 보호자</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 먹이는 제품의 품질이 좋은지, 정말 안전한지 궁금한 보호자</span>
                    </li>
                  </ul>
                </div>
                <div className='mb-6'>
                  <p className='text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3'>
                    이런걸 받으실 수 있어요!
                  </p>
                  <ul className='space-y-2 text-[14px] md:text-[16px] text-[#666666]'>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 식단 평가 및 솔루션</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>우리 아이의 현재 신체 상태 진단 및 분석</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>하루 권장 에너지량, 주요 영양소 섭취 함량 설계</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 주식과 보조식을 활용한 맞춤 식단 설계</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>우리 아이가 먹는 제품의 품질과 안전성에 대한 정밀 분석 *최대 3종</span>
                    </li>
                  </ul>
                  <p className='text-[13px] md:text-[14px] text-[#666666] mt-3 italic'>
                    *글로벌 수의영양학 데이터를 학습한 전문 AI가 제공해드립니다.
                  </p>
                </div>
              </div>

              {/* 버튼 영역 - 하단 고정 */}
              <div className='mt-auto pt-6'>
                {/* 예시 리포트 미리보기 버튼 */}
                <div className='mb-4'>
                  <button
                    onClick={() => setSampleReportModalOpen(true)}
                    className='w-full flex flex-col items-center justify-center px-4 py-3 text-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    <span className="text-[16px] font-semibold text-gray-900">예시 리포트 미리보기</span>
                    <span className="text-[13px] text-gray-600 mt-0.5">결제 후, 실제 받게 될 리포트를 확인해보세요</span>
                  </button>
                </div>

                {/* 서비스 신청하기 버튼 */}
                <div>
                  <button
                    onClick={() => {
                      const token = getToken();
                      if (!token) {
                        setSelectedPlanForModal('basic');
                        setLoginModalOpen(true);
                      } else {
                        handlePrepareAndPay('basic');
                      }
                    }}
                    disabled={loading}
                    className='w-full flex flex-col items-center justify-center px-4 py-3 bg-[#003DA5] text-white hover:bg-[#002A7A] active:bg-[#001F5C] rounded-lg transition-colors disabled:opacity-50'
                  >
                    <span className="text-lg font-bold">{loading ? '서비스 준비 중...' : '19,500원으로 시작하기'}</span>
                    <span className="text-[13px] font-normal opacity-90">이미 15명이 신청했어요!</span>
                  </button>
                </div>
              </div>

            </Card>

            {/* 59,000원 플랜 */}
            <Card className='relative w-full border-[0.5px] border-black/10 shadow-[0_0_4.4px_0_rgba(0,0,0,0.06),0_5px_19px_0_rgba(0,0,0,0.08)] px-[30px] py-[40px] flex flex-col'>
              {/* 할인 배지 */}
              <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                <span className='bg-red-500 text-white px-4 py-2 rounded-full text-base font-medium'>
                  60% 할인
                </span>
              </div>
              <div className='text-left flex-1 flex flex-col'>
                <h3 className='text-[20px] md:text-[30px] font-bold text-[#000000] mb-4'>
                  <span className='inline-block'>신규 맞춤 식단 설계</span>
                  <span className='text-[14px] md:text-[16px] text-[#003DA5] font-normal ml-2 md:ml-3 whitespace-nowrap'>
                    영양학 전문 수의사 직접 검증
                  </span>
                  <br className='md:hidden' />
                  <span className='md:hidden text-[14px] text-[#003DA5] font-normal block mt-1'>
                    영양학 전문 수의사 직접 검증
                  </span>
                </h3>
                <div className='mb-6'>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-[40px] md:text-[55px] font-bold text-[#003DA5]'>
                      59,000원
                    </span>
                    <span className='line-through text-[17px] md:text-[20px] font-medium text-[rgba(0,0,0,0.55)]'>
                      / 정가 15만원
                    </span>
                  </div>
                </div>
                <div className='mb-6'>
                  <p className='text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3'>
                    이런 분들에게 추천드려요!
                  </p>
                  <ul className='space-y-2 text-[14px] md:text-[16px] text-[#666666]'>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>새로운 주식(사료)로 변경하고 싶은 보호자</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>새로운 주식을 활용해 우리 아이의 건강 상태에 맞게 맞춤 설계하고 싶은 보호자</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>신규 제품의 품질이 좋은지, 정말 안전한지 궁금한 보호자</span>
                    </li>
                  </ul>
                </div>
                <div className='mb-6'>
                  <p className='text-[15px] md:text-[18px] font-semibold text-[#000000] mb-3'>
                    이런걸 받으실 수 있어요!
                  </p>
                  <ul className='space-y-2 text-[14px] md:text-[16px] text-[#666666]'>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 식단 평가 및 진단</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>우리 아이의 현재 신체 상태 진단 및 분석</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>하루 권장 에너지량, 주요 영양소 섭취 함량 설계</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>새로운 맞춤 식단 2가지 설계 제공</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>현재 → 신규 식단 단계별 변경 플랜</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>신규 식단 관련 영양학 Q&A 1회 제공</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span>✓</span>
                      <span>우리 아이가 먹는 제품의 품질과 안전성에 대한 정밀 분석</span>
                    </li>
                  </ul>
                  <p className='text-[13px] md:text-[14px] text-[#666666] mt-3 italic'>
                    *수의영양학 전문 수의사가 최종 검증 후 제공해드립니다.
                  </p>
                </div>
              </div>

              {/* 버튼 영역 - 하단 고정 */}
              <div className='mt-auto pt-6'>
                {/* 예시 리포트 미리보기 버튼 */}
                <div className='mb-4'>
                  <button
                    onClick={() => setFigmaModalOpen(true)}
                    className='w-full flex flex-col items-center justify-center px-4 py-3 text-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    <span className="text-[16px] font-semibold text-gray-900">예시 리포트 미리보기</span>
                    <span className="text-[13px] text-gray-600 mt-0.5">결제 후, 실제 받게 될 리포트를 확인해보세요</span>
                  </button>
                </div>

                {/* 서비스 신청하기 버튼 */}
                <div>
                  <button
                    onClick={() => {
                      const token = getToken();
                      if (!token) {
                        setSelectedPlanForModal('premium');
                        setLoginModalOpen(true);
                      } else {
                        handlePrepareAndPay('premium');
                      }
                    }}
                    disabled={loading}
                    className='w-full flex flex-col items-center justify-center px-4 py-3 bg-[#003DA5] text-white hover:bg-[#002A7A] active:bg-[#001F5C] rounded-lg transition-colors disabled:opacity-50'
                  >
                    <span className="text-lg font-bold">{loading ? '서비스 준비 중...' : '59,000원으로 시작하기'}</span>
                    <span className="text-[13px] font-normal opacity-90">이미 10명이 신청했어요!</span>
                  </button>
                </div>
              </div>

            </Card>
          </div>
        </div>

        {/* 서비스 프로세스 */}
        <div id="process" className='mb-16 md:mb-24'>
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
                          className='text-[18px] font-normal text-white opacity-90 whitespace-pre-line'
                          style={{ wordBreak: 'keep-all', lineHeight: '1.3' }}
                        >
                          {item.desc}
                        </p>
                        {item.note && (
                          <p
                            className='text-[12px] font-normal text-white opacity-70 mt-2'
                            style={{ wordBreak: 'keep-all', lineHeight: '1.4' }}
                          >
                            {item.note}
                          </p>
                        )}
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
                  className='text-[25px] font-normal text-white opacity-90 whitespace-pre-line'
                  style={{ wordBreak: 'keep-all', lineHeight: '1.3' }}
                >
                  {item.desc}
                </p>
                {item.note && (
                  <p
                    className='text-[14px] font-normal text-white opacity-70 mt-3'
                    style={{ wordBreak: 'keep-all', lineHeight: '1.4' }}
                  >
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 결제 영역 */}
      <div className='sticky bottom-0 left-0 right-0 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center'>
          <button
            onClick={() => {
              const token = getToken();
              if (!token) {
                // 미로그인: 로그인/회원가입 모달 표시 (가격 선택 가능)
                setSelectedPlanForModal('both');
                setLoginModalOpen(true);
              } else {
                // 로그인됨: 플랜 선택 모달 표시
                setPlanSelectionModalOpen(true);
              }
            }}
            disabled={loading}
            className='w-full md:w-auto min-w-[200px] px-4 py-3 bg-[#003DA5] hover:bg-[#002A7A] text-white rounded-[10px] disabled:opacity-50 font-semibold'
          >
            {loading ? '서비스 준비 중...' : '19,500원으로 시작하기'}
          </button>
          <p className='text-[12px] text-gray-600 mt-2 text-center'>이미 25명이 신청했어요!</p>
        </div>
      </div>

      {/* 로그인 필요 모달 */}
      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        planType={selectedPlanForModal}
        onLogin={(selectedPlan) => {
          setLoginModalOpen(false);
          // 선택한 플랜 정보를 URL 파라미터로 전달
          const plan = selectedPlan || 'basic';
          const redirectUrl = `${window.location.origin}/checkout?plan=${plan}&autoPay=true`;
          router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
        }}
        onSignup={(selectedPlan) => {
          setLoginModalOpen(false);
          // 선택한 플랜 정보를 URL 파라미터로 전달
          const plan = selectedPlan || 'basic';
          const redirectUrl = `${window.location.origin}/checkout?plan=${plan}&autoPay=true`;
          router.push(`/signup?redirect=${encodeURIComponent(redirectUrl)}`);
        }}
      />

      {/* 플랜 선택 모달 (로그인된 경우) */}
      <PlanSelectionModal
        isOpen={planSelectionModalOpen}
        onClose={() => setPlanSelectionModalOpen(false)}
        onSelectPlan={(plan) => {
          setPlanSelectionModalOpen(false);
          handlePrepareAndPay(plan);
        }}
      />

      {/* 샘플 리포트 모달 (3.9만원) */}
      <SampleReportModal
        isOpen={sampleReportModalOpen}
        onClose={() => setSampleReportModalOpen(false)}
      />

      {/* Figma 샘플 리포트 모달 (7.9만원) */}
      {figmaModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setFigmaModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">샘플 리포트 미리보기</h2>
              <button
                onClick={() => setFigmaModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            {/* Figma 임베드 */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="https://jelly-univ-joedy20240615.figma.site/joedy_20240615_diet_plan"
                className="w-full h-full border-0"
                allow="fullscreen"
                title="Figma 샘플 리포트"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}


