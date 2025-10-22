'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import BreedSearchInput from '@/components/common/BreedSearchInput';
import FoodSearchInput from '@/components/common/FoodSearchInput';
import Toast from '@/components/common/Toast';
import { submitRating } from '@/utils/api';
import { useRatingStore } from '@/contexts/RatingStore';

interface FeedItem {
  name: string;
  amount: string;
}

interface FormData {
  dogName: string;
  dogWeight: string;
  dogBreed: string;
  feeds: FeedItem[];
}

const ProductForm = () => {
  const router = useRouter();
  const [feeds, setFeeds] = useState<FeedItem[]>([
    { name: '', amount: '' },
  ]);
  const [amountErrors, setAmountErrors] = useState<string[]>([]);
  const [feedNameErrors, setFeedNameErrors] = useState<string[]>([]);
  const [breedError, setBreedError] = useState<string>('');
  const amountInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const feedNameInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>();

  const addFeed = () => {
    if (feeds.length < 3) {
      setFeeds([...feeds, { name: '', amount: '' }]);
    }
  };

  const removeFeed = (index: number) => {
    if (feeds.length > 1) {
      setFeeds(feeds.filter((_, i) => i !== index));
    }
  };

  const updateFeed = (index: number, field: keyof FeedItem, value: string) => {
    const updatedFeeds = feeds.map((feed, i) =>
      i === index ? { ...feed, [field]: value } : feed
    );
    setFeeds(updatedFeeds);

    // 급여량 입력 시 해당 에러 메시지 제거
    if (field === 'amount' && amountErrors[index]) {
      const updatedErrors = [...amountErrors];
      updatedErrors[index] = '';
      setAmountErrors(updatedErrors);
    }

    // 사료명 입력 시 해당 에러 메시지 제거
    if (field === 'name' && feedNameErrors[index]) {
      const updatedErrors = [...feedNameErrors];
      updatedErrors[index] = '';
      setFeedNameErrors(updatedErrors);
    }
  };

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    // 품종 필수 검증
    if (!data.dogBreed || !data.dogBreed.trim()) {
      setBreedError('반려견의 품종을 선택해주세요!');
      return;
    }

    // 품종 에러 초기화
    setBreedError('');

    // 사료명 벨리데이션 체크
    const newFeedNameErrors: string[] = [];
    const newAmountErrors: string[] = [];
    let firstEmptyNameIndex = -1;
    let firstEmptyAmountIndex = -1;

    feeds.forEach((feed, index) => {
      if (!feed.name.trim()) {
        newFeedNameErrors[index] = '사료이름을 입력해주세요!';
        if (firstEmptyNameIndex === -1) {
          firstEmptyNameIndex = index;
        }
      }

      if (!feed.amount.trim()) {
        newAmountErrors[index] = '하루 급여량을 입력해주세요!';
        if (firstEmptyAmountIndex === -1) {
          firstEmptyAmountIndex = index;
        }
      }
    });

    // 사료명 에러가 있으면 사료명 필드에 포커스
    if (newFeedNameErrors.length > 0) {
      setFeedNameErrors(newFeedNameErrors);
      if (firstEmptyNameIndex !== -1 && feedNameInputRefs.current[firstEmptyNameIndex]) {
        setTimeout(() => {
          feedNameInputRefs.current[firstEmptyNameIndex]?.focus();
        }, 100);
      }
      return;
    }

    // 급여량 에러가 있으면 급여량 필드에 포커스
    if (newAmountErrors.length > 0) {
      setAmountErrors(newAmountErrors);
      if (firstEmptyAmountIndex !== -1 && amountInputRefs.current[firstEmptyAmountIndex]) {
        setTimeout(() => {
          amountInputRefs.current[firstEmptyAmountIndex]?.focus();
        }, 100);
      }
      return;
    }

    // 에러가 없으면 에러 상태 초기화
    setFeedNameErrors([]);
    setAmountErrors([]);

    // 등록 API 호출
    try {
      setSubmitting(true);
      setSubmitError('');
      const payload = {
        dogName: data.dogName,
        dogWeight: data.dogWeight,
        dogBreed: data.dogBreed,
        feeds: feeds.map((f) => ({ name: f.name.trim(), amount: f.amount.trim() })),
      };

      const res = await submitRating(payload);
      // 전역 스토어에 응답 저장 (brief-report 등에서 재사용)
      useRatingStore.getState().setResponse(res?.data ?? null);

      // product-analysis 데이터를 로컬스토리지에 저장 (survey에서 사용)
      localStorage.setItem('productAnalysisData', JSON.stringify(payload));

      router.push('/brief-report');
    } catch (e: unknown) {
      // 404 에러인 경우 채널톡으로 이동
      if (e instanceof Error && ((e as any).status === 404 || e.message.includes('404'))) {
        // 토스트 표시
        setShowToast(true);

        // 채널톡 열기 (토스트와 함께)
        if (typeof window !== 'undefined' && (window as any).ChannelIO) {
          (window as any).ChannelIO('show');
        } else {
          // 채널톡이 로드되지 않은 경우 대체 메시지
          setSubmitError('사료 정보를 찾을 수 없습니다. 고객센터로 문의해주세요.');
        }
        return;
      }

      const message = e instanceof Error ? e.message : '요청 처리 중 오류가 발생했어요.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-8 px-2 md:py-[50px] md:px-[150px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ boxShadow: '10px 5px 30px 2px rgba(0, 0, 0, 0.15)' }} className='max-w-[982px] mx-auto !rounded-[20px]'>
          <Card className="p-8 !rounded-[20px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 반려견 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[17px] font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> 반려견 이름을 알려주세요
                  </label>
                  <input
                    {...register('dogName', { required: '반려견 이름을 입력해주세요' })}
                    className="w-full px-4 py-4 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-brand-blue focus:border-transparent text-[18px] font-normal"
                    placeholder="예: 뽀삐"
                  />
                  {errors.dogName && (
                    <p className="text-red-500 text-sm mt-1">{errors.dogName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[17px] font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> 반려견의 몸무게를 알려주세요
                  </label>
                  <div className="relative">
                    <input
                      {...register('dogWeight', { required: '몸무게를 입력해주세요' })}
                      type="number"
                      step="0.1"
                      className="w-full px-4 py-4 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-12 text-[18px] font-normal"
                      placeholder="예: 5.5"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      kg
                    </span>
                  </div>
                  {errors.dogWeight && (
                    <p className="text-red-500 text-sm mt-1">{errors.dogWeight.message}</p>
                  )}
                </div>
              </div>

              {/* 반려견 품종 */}
              <div>
                <label className="block text-[17px] font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> 반려견의 (추정) 품종을 알려주세요
                </label>
                <BreedSearchInput
                  value={watch('dogBreed') || ''}
                  onChange={(value) => {
                    setValue('dogBreed', value);
                    if (breedError) {
                      setBreedError('');
                    }
                  }}
                  onSelect={(breed) => {
                    if (breed) {
                      setValue('dogBreed', breed);
                      if (breedError) {
                        setBreedError('');
                      }
                    }
                  }}
                  placeholder="예: 골든 리트리버"
                />
                {breedError && (
                  <p className="text-red-500 text-sm mt-1">{breedError}</p>
                )}
              </div>

              {/* 현재 급여 중인 사료 */}
              <div>
                <label className="block text-[17px] font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> 현재 급여 중인 사료(주식)을 알려주세요 (최대 3개)
                </label>
                {feeds.map((feed, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <FoodSearchInput
                          value={feed.name}
                          onChange={(value) => updateFeed(index, 'name', value)}
                          onSelect={(food) => {
                            if (food) {
                              updateFeed(index, 'name', `${food.product_name}`);
                            }
                          }}
                          placeholder="사료이름을 입력해주세요!"
                        />
                        {feedNameErrors[index] && (
                          <p className="text-red-500 text-sm mt-1">{feedNameErrors[index]}</p>
                        )}
                      </div>
                      {feeds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeed(index)}
                          className="px-4 py-4 text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {feeds.length < 3 && (
                  <button
                    type="button"
                    onClick={addFeed}
                    className="w-full border-2 border-dashed border-[#003DA5] rounded-[20px] p-4 text-[#003DA5] hover:border-[#002A7A] hover:text-[#002A7A] transition-colors flex items-center justify-center gap-2 bg-transparent hover:bg-[#003DA5]/5 text-[18px] font-normal"
                  >
                    <Plus size={20} />
                    사료 추가하기
                  </button>
                )}
              </div>

              {/* 하루 급여량 */}
              <div>
                <p className="text-[17px] font-medium text-gray-700 mb-4">
                  <span className="text-red-500">*</span> 하루 급여량을 알려주세요
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {feeds.map((feed, index) => (
                    <Card key={index} className="p-4 !rounded-[20px]">
                      <Text variant="body" className="font-medium mb-2">
                        하루에 <span className="bg-blue-100 px-2 py-0.5 rounded-full">{feed.name || '[사료이름]'}</span>을 얼마나 급여하시나요?
                      </Text>
                      <div className="relative mt-4">
                        <input
                          ref={(el) => { amountInputRefs.current[index] = el; }}
                          value={feed.amount}
                          onChange={(e) => updateFeed(index, 'amount', e.target.value)}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="w-full px-4 py-4 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-brand-blue focus:border-transparent text-[18px] font-normal"
                          placeholder="예: 150"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          g
                        </span>
                      </div>
                      {amountErrors[index] && (
                        <p className="text-red-500 text-sm mt-1">{amountErrors[index]}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* 제출 버튼 */}
              {submitError && (
                <p className="text-red-500 text-sm text-center">{submitError}</p>
              )}
              <div className="md:pt-[56px] pt-[30px] flex justify-center">
                <Button
                  variant="hero-primary"
                  className="px-[40px] py-[30px] md:w-[304px] md:h-[78px] !rounded-[50px] !text-[20px] !font-semibold"
                  disabled={submitting}
                >
                  {submitting ? '분석 중...' : '30초 만에 알아보기'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* 토스트 알림 */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message="사료 데이터가 더 자세한 정보가 필요해서 채널톡으로 문의 남겨주시면 상담사가 더 상세하게 안내해드릴게요!"
        type="info"
        duration={5000}
      />
    </section>
  );
};

export default ProductForm;