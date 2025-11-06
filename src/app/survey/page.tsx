'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMe } from '@/hooks/useMe';

dayjs.extend(customParseFormat);
import 'react-datepicker/dist/react-datepicker.css';

// currentFoods 문자열 구성 함수
function buildCurrentFoodsString(productAnalysisFeeds: Array<{ name: string, amount: string }>, surveyCurrentFoods: string): string {
  const productAnalysisFoods = productAnalysisFeeds.map(feed => feed.name).join(', ');
  return `분석 페이지에서 입력한 주식 목록: ${productAnalysisFoods}\n설문 페이지에서 입력한 자료 목록:\n${surveyCurrentFoods}`;
}

// feedingAmount 문자열 구성 함수
function buildFeedingAmountString(productAnalysisFeeds: Array<{ name: string, amount: string }>, surveyFeedingAmount: string): string {
  const productAnalysisAmounts = productAnalysisFeeds.map(feed => `${feed.name} ${feed.amount}g`).join(', ');
  return `분석 페이지에서 입력한 주식 급여 타이밍: ${productAnalysisAmounts}\n설문 페이지에서 입력한 급여 정보:\n${surveyFeedingAmount}`;
}

interface SurveyData {
  // 보호자 정보
  ownerName: string;
  phoneNumber: string;
  email: string;

  // 반려견 정보
  birthDate: string;
  gender: string;
  neutered: string;
  pregnant: string;
  bcs: number;
  rawsome: string;
  activityLevel: string;

  // 건강 정보
  healthIssues: string;
  allergies: string;
  medications: string;

  // 사료 정보
  currentFoods: string;
  feedingAmount: string;
  foodReaction: string;
  additionalInfo: string;

  // 분석 페이지 미경유입 시 보조 입력
  paDogName?: string;
  paDogBreed?: string;
  paDogWeight?: string;
}

const SurveyPage = () => {
  const router = useRouter();
  const { data: meData } = useMe();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>({
    ownerName: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    gender: '',
    neutered: '',
    pregnant: '',
    bcs: 0,
    rawsome: '',
    activityLevel: '',
    healthIssues: '',
    allergies: '',
    medications: '',
    currentFoods: '',
    feedingAmount: '',
    foodReaction: '',
    additionalInfo: ''
  });

  const [needsProductAnalysis, setNeedsProductAnalysis] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateError, setDateError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // 로그인한 사용자의 정보를 자동으로 채워주는 효과
  useEffect(() => {
    if (meData?.success && meData.data) {
      const user = meData.data;
      setFormData(prev => ({
        ...prev,
        ownerName: user.name || '',
        email: user.email || '',
        phoneNumber: user.phone || ''
      }));
    }
  }, [meData]);

  // 분석페이지 경유 여부 확인
  useEffect(() => {
    try {
      const productAnalysisData = localStorage.getItem('productAnalysisData');
      setNeedsProductAnalysis(!productAnalysisData);
    } catch {
      setNeedsProductAnalysis(true);
    }
  }, []);

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/\D/g, '');

    // 11자리 제한
    const limitedNumbers = numbers.slice(0, 11);

    // 포맷팅 적용
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 질문 구성
  const questions = [
    // 보호자 정보
    {
      id: 'ownerName',
      title: '보호자 정보',
      subtitle: '보호자분의 이름을 알려주세요',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      required: true
    },
    {
      id: 'phoneNumber',
      title: '보호자 정보',
      subtitle: '보호자분의 휴대폰 번호를 알려주세요',
      type: 'tel',
      placeholder: '휴대폰 번호를 입력해주세요',
      required: true
    },
    {
      id: 'email',
      title: '보호자 정보',
      subtitle: '보호자분의 이메일 주소를 알려주세요',
      type: 'email',
      placeholder: '이메일 주소를 입력해주세요',
      required: true
    },

    // 분석페이지 미경유입 시 추가 항목
    ...(needsProductAnalysis ? ([
      {
        id: 'paDogName',
        title: '반려견 정보',
        subtitle: '반려견의 이름을 알려주세요',
        type: 'text',
        placeholder: '반려견 이름을 입력해주세요',
        required: true
      },
      {
        id: 'paDogBreed',
        title: '반려견 정보',
        subtitle: '반려견의 품종을 알려주세요',
        type: 'text',
        placeholder: '예: 골든 리트리버',
        required: true
      },
      {
        id: 'paDogWeight',
        title: '반려견 정보',
        subtitle: '반려견의 체중을 알려주세요 (kg)',
        type: 'number',
        placeholder: '예: 10.5',
        required: true
      }
    ]) : []),

    // 반려견 정보
    {
      id: 'birthDate',
      title: '반려견 정보',
      subtitle: '반려견의 (추정) 생년월일을 알려주세요',
      type: 'date',
      placeholder: 'YYYY-MM-DD',
      required: true
    },
    {
      id: 'gender',
      title: '반려견 정보',
      subtitle: '반려견의 성별과 중성화 여부를 알려주세요',
      type: 'select',
      options: [
        '남아, 중성화 완료',
        '남아, 중성화 미완료',
        '여아, 중성화 완료',
        '여아, 중성화 미완료'
      ],
      required: true
    },
    {
      id: 'pregnant',
      title: '반려견 정보',
      subtitle: '반려견이 현재 임신 또는 수유중인가요?',
      type: 'select',
      options: ['네', '아니오', '해당없음'],
      required: true
    },
    {
      id: 'bcs',
      title: '반려견 정보',
      subtitle: '반려견의 BCS(Body Condition Score)를 선택해주세요',
      description: 'BCS란? BCS(신체충실지수)는 반려동물의 비만도를 평가하는 대표적인 방법으로, 체중이나 키가 아니라 외형과 촉진(만져보기)으로 판단하는 것입니다.',
      image: '/img/survey/bcs.png',
      type: 'select',
      options: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점'],
      required: true
    },
    {
      id: 'rawsome',
      title: '반려견 정보',
      subtitle: '반려견의 갈비뼈를 직접 만진 후, 가장 유사한 촉감을 선택해주세요',
      description: 'Rawsome이란? Rawsome 체크는 미국생식제조업체 자료에서 유래한 간단한 촉진법으로, 손의 감각을 활용해 반려동물의 갈비뼈 상태를 평가하는 것입니다.',
      image: '/img/survey/rawsome.png',
      type: 'select',
      options: [
        '주먹 쥔 손등',
        '손을 편 손등',
        '손을 편 손바닥',
        '손바닥 두툼한 부위'
      ],
      required: true
    },
    {
      id: 'activityLevel',
      title: '반려견 정보',
      subtitle: '반려견의 활동 수준에 대해 알려주세요',
      type: 'select',
      options: [
        '저활동 (Low activity) / 일일 운동 시간: 30분 미만',
        '보통 활동 (Moderate activity) / 일일 운동 시간: 30분 ~ 1시간',
        '고활동 (High activity) / 일일 운동 시간: 1시간 이상'
      ],
      required: true
    },

    // 건강 정보
    {
      id: 'healthIssues',
      title: '건강 정보',
      subtitle: '반려견의 과거와 현재를 포함하여 겪고 있는 질병/질환이나 건강 문제가 있다면 알려주세요',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '건강 문제를 입력해주세요',
      required: true
    },
    {
      id: 'allergies',
      title: '건강 정보',
      subtitle: '반려견의 알러지원 또는 민감성을 가진 음식이 있다면 알려주세요',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '알러지 정보를 입력해주세요',
      required: true
    },
    {
      id: 'medications',
      title: '건강 정보',
      subtitle: '반려견이 현재 복용 중인 약물이 있다면 알려주세요 (영양제가 아닌 약물)',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '복용 중인 약물을 입력해주세요',
      required: true
    },

    // 사료 정보
    {
      id: 'currentFoods',
      title: '사료 정보',
      subtitle: '반려견의 현재 급여 중인 주식(사료)/ 보조식(토퍼)/ 영양제의 브랜드 및 제품명을 모두 알려주세요',
      description: '⚠️ 꼭 정확한 브랜드와 제품명을 기입해주시기 바랍니다. 부정확할 경우, 다른 제품으로 분석 및 리포트가 작성될 수 있습니다!',
      example: '1. 주식(사료): 카나간 스코티쉬 살몬 포 독\n2. 주식(사료): 지위픽 스팀드라이 독 닭고기&과일\n3. 보조식(토퍼): 스텔라앤츄이스 디너패티 치킨\n4. 영양제: 묘견서 프로바이오틱스 덴센',
      type: 'textarea',
      placeholder: '사료 및 영양제 정보를 입력해주세요',
      required: true
    },
    {
      id: 'feedingAmount',
      title: '사료 정보',
      subtitle: '반려견의 현재 급여 중인 주식(사료)/ 보조식(토퍼)/ 영양제의 1일 급여량 및 급여 횟수를 알려주세요',
      description: '⚠️ 꼭 정확한 급여량(g)을 기입해주시기 바랍니다. 부정확할 경우, 현재 섭취 에너지와 영양소 분석이 다르게 작성될 수 있습니다!',
      example: '급여 타이밍: 아침 1회, 저녁 1회 = 총 2회\n1. 주식(사료): 카나간 스코티쉬 살몬 포 독 / 하루 기준 45g\n2. 보조식(토퍼): 지위픽 스팀드라이 독 닭고기&과일 / 하루 기준 25g\n3. 보조식(토퍼): 스텔라앤츄이스 디너패티 치킨 / 하루 기준 1개\n4. 영양제: 묘견서 프로바이오틱스 덴센 / 하루 기준 1알',
      type: 'textarea',
      placeholder: '급여량 및 급여 횟수를 입력해주세요',
      required: true
    },
    {
      id: 'foodReaction',
      title: '사료 정보',
      subtitle: '반려견의 현재 먹고 있는 사료에 대한 반응은 어떤가요?',
      type: 'select',
      options: [
        '매우 즐긴다',
        '즐긴다',
        '그냥 그럭저럭 먹는다',
        '잘 먹지 않고 음식을 남긴다',
        '먹긴 먹는데 나눠서 조금씩 텀을 누고 먹는다'
      ],
      required: true
    },
    {
      id: 'additionalInfo',
      title: '추가 정보',
      subtitle: '반려견의 현재 급여 중인 사료 분석을 위하여 참고하면 좋을 정보와 궁금하신 점을 자유롭게 작성해주세요 😊',
      type: 'textarea',
      placeholder: '추가 정보를 자유롭게 작성해주세요',
      required: false
    }
  ];

  const handleNext = () => {
    // 에러 상태일 때는 다음 단계로 진행하지 않음
    if (submitError) {
      return;
    }

    if (currentStep < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleInputChange = (value: string | number) => {
    const currentQuestion = questions[currentStep];
    let processedValue = value;

    // 전화번호 처리
    if (currentQuestion.id === 'phoneNumber') {
      const formattedPhone = formatPhoneNumber(value as string);
      processedValue = formattedPhone;

      // 전화번호 유효성 검사 (11자리 숫자)
      const numbers = formattedPhone.replace(/\D/g, '');
      if (numbers.length === 11) {
        setPhoneError('');
      } else if (numbers.length > 0) {
        setPhoneError('올바른 전화번호 형식이 아닙니다');
      } else {
        setPhoneError('');
      }
    }

    // 이메일 처리
    if (currentQuestion.id === 'email') {
      const emailValue = value as string;
      if (emailValue.length > 0 && !validateEmail(emailValue)) {
        setEmailError('올바른 이메일 형식이 아닙니다');
      } else {
        setEmailError('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: processedValue
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 로컬스토리지에서 product-analysis 데이터 가져오기
      let productAnalysisData = localStorage.getItem('productAnalysisData');

      // 분석페이지 미경유입 시 설문 입력으로 대체
      if (!productAnalysisData && needsProductAnalysis) {
        const paDogName = (formData.paDogName || '').trim();
        const paDogBreed = (formData.paDogBreed || '').trim();
        const paDogWeight = (formData.paDogWeight || '').trim();

        if (!paDogName || !paDogBreed || !paDogWeight) {
          setSubmitError('반려견 이름/품종/체중을 모두 입력해주세요.');
          setIsSubmitting(false);
          return;
        }

        const fallback = {
          dogName: paDogName,
          dogBreed: paDogBreed,
          dogWeight: paDogWeight,
          feeds: [] as Array<{ name: string; amount: string }>,
        };
        productAnalysisData = JSON.stringify(fallback);
      }

      if (!productAnalysisData) {
        setSubmitError('Product analysis 데이터를 찾을 수 없습니다. 먼저 product-analysis 페이지에서 데이터를 입력해주세요.');
        setIsSubmitting(false);
        return;
      }

      const parsedProductAnalysisData = JSON.parse(productAnalysisData);

      // 백엔드 스펙에 맞는 데이터 구조로 변환
      const apiPayload = {
        guardian: {
          name: formData.ownerName,
          phone: formData.phoneNumber,
          email: formData.email
        },
        pet: {
          name: parsedProductAnalysisData.dogName,
          birthDate: formData.birthDate,
          breed: parsedProductAnalysisData.dogBreed,
          genderNeutered: formData.gender,
          pregnantOrNursing: formData.pregnant,
          weight: parseFloat(parsedProductAnalysisData.dogWeight),
          bcsScore: typeof formData.bcs === 'string' ? parseInt((formData.bcs as string).replace('점', '')) : formData.bcs,
          rawsomeCheck: formData.rawsome,
          activityLevel: formData.activityLevel,
          healthIssues: formData.healthIssues,
          allergies: formData.allergies,
          medications: formData.medications,
          currentFoods: buildCurrentFoodsString(parsedProductAnalysisData.feeds || [], formData.currentFoods),
          feedingAmount: buildFeedingAmountString(parsedProductAnalysisData.feeds || [], formData.feedingAmount),
          foodResponse: formData.foodReaction,
          additionalInfo: formData.additionalInfo || ""
        }
      };

      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        const responseData = await response.json();

        // API 응답 데이터를 로컬스토리지에 저장
        localStorage.setItem('surveyResponse', JSON.stringify({
          surveyId: responseData.data.surveyId,
          userId: responseData.data.userId,
          petId: responseData.data.petId,
          submittedAt: responseData.data.submittedAt,
          submittedAtFormatted: new Date(responseData.data.submittedAt).toLocaleString('ko-KR')
        }));

        // 성공 시 완료 페이지로 이동
        router.push('/survey/complete');
      } else {
        const errorData = await response.json();
        console.error('Survey submission failed:', errorData);

        // 에러 메시지 설정
        const errorMessage = errorData.error || errorData.message || '설문 제출에 실패했습니다.';
        setSubmitError(errorMessage);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitError('');
    handleSubmit();
  };

  const currentQuestion = questions[currentStep];
  const isCurrentStepValid = currentQuestion.required
    ? formData[currentQuestion.id as keyof SurveyData] !== '' &&
    formData[currentQuestion.id as keyof SurveyData] !== 0 &&
    (currentQuestion.id === 'phoneNumber' ? phoneError === '' : true) &&
    (currentQuestion.id === 'email' ? emailError === '' : true) &&
    (currentQuestion.id === 'birthDate' ? dateError === '' : true) &&
    !submitError // 에러 상태일 때는 버튼 비활성화
    : !submitError;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 데스크탑 컨테이너 */}
      <div className="max-w-2xl mx-auto w-full">
        {/* 헤더 */}
        <div className="px-6 pt-16 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentStep === 0
                ? 'bg-gray-100 text-gray-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-sm text-gray-500">
              {currentStep + 1} / {questions.length}
            </div>

            <div className="w-8"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="h-1 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentStep + 1) / questions.length) * 100}%`,
                backgroundColor: '#003DA5'
              }}
            />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 px-6 py-8 pb-32">
          <div className={`max-w-lg mx-auto transition-all duration-200 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}>
            {/* 질문 제목 */}
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                {currentQuestion.subtitle}
              </h1>
              {currentQuestion.description && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {currentQuestion.description}
                  </p>
                </div>
              )}
              {currentQuestion.example && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center mr-2">
                      <span className="text-white text-xs">예</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">예시</span>
                  </div>
                  <pre className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">
                    {currentQuestion.example}
                  </pre>
                </div>
              )}
              {currentQuestion.image && (
                <div className="mb-6">
                  <Image
                    src={currentQuestion.image}
                    alt={currentQuestion.subtitle}
                    width={400}
                    height={200}
                    className="w-full rounded-xl shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* 입력 필드 */}
            <div className="space-y-4">
              {currentQuestion.type === 'text' && (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={currentQuestion.type}
                  value={String(formData[currentQuestion.id as keyof SurveyData] ?? '')}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required={currentQuestion.required}
                />
              )}

              {currentQuestion.type === 'email' && (
                <div>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    value={String(formData[currentQuestion.id as keyof SurveyData] ?? '')}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:border-transparent text-base ${emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                    required={currentQuestion.required}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
              )}

              {currentQuestion.type === 'tel' && (
                <div>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="tel"
                    value={String(formData[currentQuestion.id as keyof SurveyData] ?? '')}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:border-transparent text-base ${phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                    required={currentQuestion.required}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                  )}
                </div>
              )}

              {currentQuestion.type === 'number' && (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={String(formData[currentQuestion.id as keyof SurveyData] ?? '')}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required={currentQuestion.required}
                />
              )}

              {currentQuestion.type === 'date' && (
                <div>
                  <DatePicker
                    selected={(() => {
                      if (!formData.birthDate || !formData.birthDate.includes('-')) return null;
                      // dayjs를 사용하여 로컬 시간대 기준으로 날짜 파싱 및 유효성 검사
                      const parsedDate = dayjs(formData.birthDate, 'YYYY-MM-DD', true);
                      if (!parsedDate.isValid()) return null;
                      return parsedDate.toDate();
                    })()}
                    onChange={(date) => {
                      if (date) {
                        // dayjs를 사용하여 로컬 시간대 기준으로 날짜 포맷팅
                        const formattedDate = dayjs(date).format('YYYY-MM-DD');
                        handleInputChange(formattedDate);
                        setDateError(''); // 캘린더로 선택한 날짜는 유효하므로 에러 초기화
                      } else {
                        // X 버튼 클릭 시 date가 null로 전달됨
                        handleInputChange('');
                        setDateError(''); // 초기화 시 에러도 제거
                      }
                    }}
                    dateFormat="yyyy.MM.dd"
                    placeholderText="2025.05.20"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    maxDate={new Date()}
                    isClearable
                    popperClassName="toss-datepicker-popper"
                    popperPlacement="bottom-start"
                    customInput={
                      <div className="relative">
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={formData.birthDate ? formData.birthDate.replace(/-/g, '.') : ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            // 숫자와 점만 허용
                            const cleanValue = value.replace(/[^\d.]/g, '');

                            // 최대 길이 제한 (YYYY.MM.DD = 10자)
                            if (cleanValue.length > 10) {
                              return;
                            }

                            // 숫자만 추출
                            const numbers = cleanValue.replace(/\./g, '');

                            // 단계별 포맷팅
                            let formatted = numbers;
                            if (numbers.length >= 5) {
                              formatted = numbers.slice(0, 4) + '.' + numbers.slice(4);
                            }
                            if (numbers.length >= 7) {
                              formatted = numbers.slice(0, 4) + '.' + numbers.slice(4, 6) + '.' + numbers.slice(6);
                            }

                            // YYYY-MM-DD 형식으로 변환하여 저장
                            const dateString = formatted.replace(/\./g, '-');
                            if (dateString.length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                              // dayjs를 사용한 날짜 유효성 검사
                              const parsedDate = dayjs(dateString, 'YYYY-MM-DD', true);

                              if (parsedDate.isValid()) {
                                handleInputChange(dateString);
                                setDateError('');
                              } else {
                                // 잘못된 날짜를 해당 월의 마지막 날짜로 자동 보정
                                const [year, month] = dateString.split('-').map(Number);
                                const lastDayOfMonth = dayjs(`${year}-${month.toString().padStart(2, '0')}`, 'YYYY-MM').endOf('month').date();
                                const correctedDate = `${year}-${month.toString().padStart(2, '0')}-${lastDayOfMonth.toString().padStart(2, '0')}`;

                                handleInputChange(correctedDate);
                                setDateError('');
                              }
                            } else {
                              // 임시로 포맷된 문자열 저장 (입력 중일 때)
                              setFormData(prev => ({ ...prev, birthDate: formatted }));
                            }
                          }}
                          placeholder="2025.05.20"
                          className={`w-full px-4 py-4 pr-12 border rounded-xl focus:ring-2 focus:border-transparent text-base bg-white h-14 ${dateError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            }`}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    }
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-2">{dateError}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    정확한 생년월일을 모르신다면 추정하여 입력해주세요
                  </p>
                </div>
              )}

              {currentQuestion.type === 'select' && (
                <div className="space-y-2">
                  {currentQuestion.options?.map((option, index) => (
                    <label key={index} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={formData[currentQuestion.id as keyof SurveyData] === option}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        required={currentQuestion.required}
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'textarea' && (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={String(formData[currentQuestion.id as keyof SurveyData] ?? '')}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
                  required={currentQuestion.required}
                />
              )}
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6">
          <div className="max-w-2xl mx-auto">
            {/* 에러 메시지 표시 */}
            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">설문 제출 실패</h3>
                    <p className="mt-1 text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {/* 재시도 버튼 (에러 발생 시에만 표시) */}
              {submitError && (
                <button
                  onClick={handleRetry}
                  disabled={isSubmitting}
                  className="flex-1 py-4 text-white font-semibold text-base rounded-xl transition-all duration-200 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '재시도 중...' : '다시 시도'}
                </button>
              )}

              {/* 메인 버튼 */}
              <button
                onClick={handleNext}
                disabled={!isCurrentStepValid || isSubmitting}
                className={`flex-1 py-4 text-white font-semibold text-base rounded-xl transition-all duration-200 ${isCurrentStepValid && !isSubmitting
                  ? 'active:scale-95'
                  : 'opacity-50 cursor-not-allowed'
                  }`}
                style={isCurrentStepValid && !isSubmitting ? {
                  backgroundColor: '#003DA5',
                  boxShadow: '0 4px 12px rgba(0, 61, 165, 0.15)'
                } : {
                  backgroundColor: '#E5E7EB'
                }}
              >
                {isSubmitting ? '제출 중...' : (currentStep === questions.length - 1 ? '완료하기' : '다음')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;