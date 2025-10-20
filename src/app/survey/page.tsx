'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SurveyData {
  // 보호자 정보
  ownerName: string;
  phoneNumber: string;
  email: string;

  // 반려견 정보
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
}

const SurveyPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SurveyData>({
    ownerName: '',
    phoneNumber: '',
    email: '',
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

  const [isAnimating, setIsAnimating] = useState(false);

  const questions = [
    // 보호자 정보
    {
      id: 'ownerName',
      title: '보호자 정보',
      subtitle: '이름을 알려주세요',
      type: 'text',
      placeholder: '최석호',
      required: true
    },
    {
      id: 'phoneNumber',
      title: '보호자 정보',
      subtitle: '휴대폰번호를 알려주세요',
      type: 'tel',
      placeholder: '010-1234-5678',
      required: true
    },
    {
      id: 'email',
      title: '보호자 정보',
      subtitle: '이메일을 알려주세요',
      type: 'email',
      placeholder: 'seokho9473@gmail.com',
      required: true
    },

    // 반려견 정보
    {
      id: 'gender',
      title: '반려견 정보',
      subtitle: '성별과 중성화 여부를 알려주세요',
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
      subtitle: '현재 임신 또는 수유중인가요?',
      type: 'select',
      options: ['네', '아니오', '해당없음'],
      required: true
    },
    {
      id: 'bcs',
      title: '반려견 정보',
      subtitle: 'BCS(Body Condition Score)를 선택해주세요',
      description: 'BCS란? BCS(신체충실지수)는 반려동물의 비만도를 평가하는 대표적인 방법으로, 체중이나 키가 아니라 외형과 촉진(만져보기)으로 판단하는 것입니다.',
      image: '/img/survey/bcs.png',
      type: 'select',
      options: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점'],
      required: true
    },
    {
      id: 'rawsome',
      title: '반려견 정보',
      subtitle: '아이의 갈비뼈를 직접 만진 후, 가장 유사한 촉감을 선택해주세요',
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
      subtitle: '아이의 활동 수준에 대해 알려주세요',
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
      subtitle: '과거와 현재를 포함하여 겪고 있는 질병/질환이나 건강 문제가 있다면 알려주세요',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '없다',
      required: true
    },
    {
      id: 'allergies',
      title: '건강 정보',
      subtitle: '알러지원 또는 민감성을 가진 음식이 있다면 알려주세요',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '없다',
      required: true
    },
    {
      id: 'medications',
      title: '건강 정보',
      subtitle: '현재 복용 중인 약물이 있다면 알려주세요 (영양제가 아닌 약물)',
      description: '없을 경우, "없다"라고 작성해주세요.',
      type: 'textarea',
      placeholder: '없다',
      required: true
    },

    // 사료 정보
    {
      id: 'currentFoods',
      title: '사료 정보',
      subtitle: '현재 급여 중인 주식(사료)/ 보조식(토퍼)/ 영양제의 브랜드 및 제품명을 모두 알려주세요',
      description: '⚠️ 꼭 정확한 브랜드와 제품명을 기입해주시기 바랍니다. 부정확할 경우, 다른 제품으로 분석 및 리포트가 작성될 수 있습니다!',
      type: 'textarea',
      placeholder: '예시:\n1. 주식(사료): 카나간 스코티쉬 살몬 포 독\n2. 주식(사료): 지위픽 스팀드라이 독 닭고기&과일\n3. 보조식(토퍼): 스텔라앤츄이스 디너패티 치킨\n4. 영양제: 묘견서 프로바이오틱스 덴센',
      required: true
    },
    {
      id: 'feedingAmount',
      title: '사료 정보',
      subtitle: '현재 급여 중인 주식(사료)/ 보조식(토퍼)/ 영양제의 1일 급여량 및 급여 횟수를 알려주세요',
      description: '⚠️ 꼭 정확한 급여량(g)을 기입해주시기 바랍니다. 부정확할 경우, 현재 섭취 에너지와 영양소 분석이 다르게 작성될 수 있습니다!',
      type: 'textarea',
      placeholder: '예시:\n급여 타이밍: 아침 1회, 저녁 1회 = 총 2회\n1. 주식(사료): 카나간 스코티쉬 살몬 포 독 / 하루 기준 45g\n2. 보조식(토퍼): 지위픽 스팀드라이 독 닭고기&과일 / 하루 기준 25g\n3. 보조식(토퍼): 스텔라앤츄이스 디너패티 치킨 / 하루 기준 1개\n4. 영양제: 묘견서 프로바이오틱스 덴센 / 하루 기준 1알',
      required: true
    },
    {
      id: 'foodReaction',
      title: '사료 정보',
      subtitle: '현재 먹고 있는 사료에 대한 반응은 어떤가요?',
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
      subtitle: '현재 급여 중인 사료 분석을 위하여 참고하면 좋을 정보와 궁금하신 점을 자유롭게 작성해주세요 😊',
      type: 'textarea',
      placeholder: '자유롭게 작성해주세요...',
      required: false
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
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
      }, 300);
    }
  };

  const handleInputChange = (value: string | number) => {
    const currentQuestion = questions[currentStep];
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // TODO: 실제 API 연동 시 주석 해제
      // const response = await fetch('/api/survey', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      // 성공 시 완료 페이지로 이동
      router.push('/survey/complete');
      // } else {
      //   console.error('Survey submission failed');
      // }
    } catch (error) {
      console.error('Error submitting survey:', error);
      // 에러가 발생해도 일단 완료 페이지로 이동 (개발용)
      router.push('/survey/complete');
    }
  };

  const currentQuestion = questions[currentStep];
  const isCurrentStepValid = currentQuestion.required
    ? formData[currentQuestion.id as keyof SurveyData] !== '' && formData[currentQuestion.id as keyof SurveyData] !== 0
    : true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>질문 {currentStep + 1} / {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentStep + 1) / questions.length) * 100}%`,
                backgroundColor: '#003DA5'
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'
          }`}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentQuestion.title}</h2>
            <h3 className="text-lg text-gray-700 mb-4">{currentQuestion.subtitle}</h3>
            {currentQuestion.description && (
              <div
                className="border-l-4 p-4 mb-4"
                style={{
                  backgroundColor: '#E6F0FF',
                  borderLeftColor: '#003DA5'
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: '#002A7A' }}
                >
                  {currentQuestion.description}
                </p>
              </div>
            )}
            {currentQuestion.image && (
              <div className="mb-6">
                <img
                  src={currentQuestion.image}
                  alt={currentQuestion.subtitle}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="mb-8">
            {currentQuestion.type === 'text' && (
              <input
                type={currentQuestion.type}
                value={formData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-lg"
                style={{
                  '--tw-ring-color': '#003DA5'
                } as React.CSSProperties}
                required={currentQuestion.required}
              />
            )}

            {currentQuestion.type === 'email' && (
              <input
                type="email"
                value={formData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-lg"
                style={{
                  '--tw-ring-color': '#003DA5'
                } as React.CSSProperties}
                required={currentQuestion.required}
              />
            )}

            {currentQuestion.type === 'tel' && (
              <input
                type="tel"
                value={formData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-lg"
                style={{
                  '--tw-ring-color': '#003DA5'
                } as React.CSSProperties}
                required={currentQuestion.required}
              />
            )}

            {currentQuestion.type === 'select' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={formData[currentQuestion.id as keyof SurveyData] === option}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="mr-3 h-4 w-4"
                      style={{
                        color: '#003DA5',
                        '--tw-ring-color': '#003DA5'
                      } as React.CSSProperties}
                      required={currentQuestion.required}
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'textarea' && (
              <textarea
                value={formData[currentQuestion.id as keyof SurveyData] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
                required={currentQuestion.required}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              이전
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${isCurrentStepValid
                ? 'text-white hover:opacity-90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              style={isCurrentStepValid ? { backgroundColor: '#003DA5' } : {}}
            >
              {currentStep === questions.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;