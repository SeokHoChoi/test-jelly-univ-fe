'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search } from 'lucide-react';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

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
  const [feeds, setFeeds] = useState<FeedItem[]>([
    { name: '', amount: '' },
  ]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

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
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', { ...data, feeds });
    // 여기서 분석 결과 페이지로 이동
    window.location.href = '/brief-report';
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 반려견 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  반려견 이름을 알려주세요
                </label>
                <input
                  {...register('dogName', { required: '반려견 이름을 입력해주세요' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="예: 뽀삐"
                />
                {errors.dogName && (
                  <p className="text-red-500 text-sm mt-1">{errors.dogName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  반려견의 몸무게를 알려주세요
                </label>
                <div className="relative">
                  <input
                    {...register('dogWeight', { required: '몸무게를 입력해주세요' })}
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-12"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                반려견의 (추정) 품종을 알려주세요
              </label>
              <div className="relative">
                <input
                  {...register('dogBreed', { required: '품종을 입력해주세요' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-12"
                  placeholder="예: 골든 리트리버"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {errors.dogBreed && (
                <p className="text-red-500 text-sm mt-1">{errors.dogBreed.message}</p>
              )}
            </div>

            {/* 현재 급여 중인 사료 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 급여 중인 사료(주식)을 알려주세요 (최대 3개)
              </label>
              {feeds.map((feed, index) => (
                <div key={index} className="mb-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        value={feed.name}
                        onChange={(e) => updateFeed(index, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        placeholder="사료명을 입력해주세요"
                      />
                    </div>
                    {feeds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeed(index)}
                        className="px-4 py-3 text-red-500 hover:text-red-700"
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
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center justify-center gap-2 bg-gray-50 hover:bg-brand-blue-light"
                >
                  <Plus size={20} />
                  사료 추가하기
                </button>
              )}
            </div>

            {/* 하루 급여량 */}
            <div>
              <Text variant="subtitle" className="text-lg mb-4">
                하루 급여량을 알려주세요
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feeds.map((feed, index) => (
                  <Card key={index} className="p-4">
                    <Text variant="body" className="font-medium mb-2">
                      하루에 {feed.name || '[사료명]'}을 얼마나 급여하시나요?
                    </Text>
                    <div className="relative">
                      <input
                        value={feed.amount}
                        onChange={(e) => updateFeed(index, 'amount', e.target.value)}
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        placeholder="예: 150"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        g
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-6">
              <Button size="lg" className="w-full">
                30초 만에 알아보기
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ProductForm;