'use client';

import { useEffect, useState } from 'react';
import DetailedDietReport from './DetailedDietReport';
import { getFoodDetail, searchFoods, FoodSearchResult } from '@/utils/api';
import { useRatingStore } from '@/contexts/RatingStore';

interface PetInfo {
  name: string;
  breed: string;
  gender: string;
  weight: string;
  age?: string;
  neutered?: string;
  activityLevel?: string;
}

interface FeedStored {
  id?: number; // 선택된 음식의 고유 ID (있으면 상세 호출에 사용)
  name: string; // 제품명
  amount: string; // g (문자열)
}

const DietReportExample = ({ onPetInfoChange }: { onPetInfoChange?: (petInfo: PetInfo) => void }) => {
  const { response: ratingResponse } = useRatingStore();
  const [petInfo, setPetInfo] = useState({
    name: '하이',
    breed: '셔틀랜드 쉽독',
    gender: '남아',
    age: '1년 2개월',
    weight: '3.2kg',
    neutered: '완료',
    bcs: 5,
    rwacome: 5,
    personality: '행복한 미식가',
    description: '넘치는 에너지로 가득하지만 조금은 무거운 상태예요. 전문적인 관리로 근육량을 유지하면서 최고 컨디션을 만들어보세요.'
  });

  // 동적 계산된 현재 식단 영양 데이터
  const [currentFoods, setCurrentFoods] = useState<Array<{
    name: string;
    intake: string;
    protein: string;
    proteinPercent: string;
    fat: string;
    fatPercent: string;
    carbs: string;
    carbsPercent: string;
    calories: string;
    caloriesPercent: string;
  }>>([]);

  // product-analysis / survey 데이터 반영
  useEffect(() => {
    // 로컬스토리지에서 분석 페이지 데이터 가져오기
    const productAnalysisData = localStorage.getItem('productAnalysisData');
    // 세션스토리지에서 설문 데이터 가져오기
    const surveyData = sessionStorage.getItem('surveyData');

    if (productAnalysisData) {
      try {
        const parsedData = JSON.parse(productAnalysisData);
        setPetInfo(prev => ({
          ...prev,
          name: parsedData.dogName || prev.name,
          breed: parsedData.dogBreed || prev.breed,
          weight: parsedData.dogWeight ? `${parsedData.dogWeight}kg` : prev.weight
        }));
      } catch (error) {
        console.error('Failed to parse productAnalysisData:', error);
      }
    }

    if (surveyData) {
      try {
        const parsedData = JSON.parse(surveyData);
        setPetInfo(prev => ({
          ...prev,
          name: parsedData.dogName || prev.name,
          breed: parsedData.dogBreed || prev.breed,
          weight: parsedData.dogWeight ? `${parsedData.dogWeight}kg` : prev.weight,
          gender: parsedData.gender || prev.gender,
          neutered: parsedData.neutered || prev.neutered
        }));
      } catch (error) {
        console.error('Failed to parse surveyData:', error);
      }
    }
  }, []);

  // petInfo가 변경될 때마다 부모 컴포넌트에 전달
  useEffect(() => {
    if (onPetInfoChange) onPetInfoChange(petInfo);
  }, [petInfo, onPetInfoChange]);

  // 현재 식단 주요 영양소 계산: Rating API 응답 데이터 기반
  useEffect(() => {
    const run = async () => {
      try {
        let feeds: FeedStored[] = [];

        // Rating Store에서 데이터 가져오기 (우선순위)
        if (ratingResponse?.foodRatings) {
          feeds = ratingResponse.foodRatings.map((fr) => ({
            id: fr.foodInfo.id,
            name: `${fr.foodInfo.productName}`.trim(),
            amount: fr.foodInfo.dailyAmount
          }));
        }

        // Rating 데이터가 없으면 productAnalysisData에서 가져오기 (fallback)
        if (feeds.length === 0) {
          const pa = localStorage.getItem('productAnalysisData');
          if (!pa) return;
          const parsed = JSON.parse(pa) as { feeds?: FeedStored[] };
          feeds = Array.isArray(parsed?.feeds) ? parsed.feeds : [];
        }

        if (feeds.length === 0) return;

        const results = await Promise.all(
          feeds.map(async (feed) => {
            // amount 파싱 (g)
            const amountG = (() => {
              const num = parseFloat(String(feed.amount).replace(/[^\d.]/g, ''));
              return isNaN(num) ? 0 : num;
            })();

            // 상세 조회: id 우선, 없으면 검색으로 보정
            let detail: { crude_protein?: string; crude_fat?: string; crude_fiber?: string; crude_ash?: string; moisture?: string; nutrition_text?: string } | null = null;
            try {
              if (feed.id) {
                const d = await getFoodDetail(feed.id);
                detail = d?.data ?? null;
              } else {
                const s = await searchFoods(feed.name, 1, 0);
                const candidate: FoodSearchResult | undefined = s.data?.[0];
                if (candidate) {
                  const d = await getFoodDetail(candidate.id);
                  detail = d?.data ?? null;
                }
              }
            } catch (e) {
              console.error('food detail fetch error:', e);
            }

            // 성분 % 파싱
            const p = parseFloat(detail?.crude_protein || '0') || 0;
            const f = parseFloat(detail?.crude_fat || '0') || 0;
            const fi = parseFloat(detail?.crude_fiber || '0') || 0;
            const a = parseFloat(detail?.crude_ash || '0') || 0;
            const m = parseFloat(detail?.moisture || '0') || 0;
            const c = Math.max(0, 100 - (p + f + fi + a + m));

            // g 계산 (AS FED)
            const proteinG = +(amountG * (p / 100)).toFixed(1);
            const fatG = +(amountG * (f / 100)).toFixed(1);
            const carbsG = +(amountG * (c / 100)).toFixed(1);

            // kcal 추정 (Atwater 조정계수)
            const kcal = +(proteinG * 3.5 + fatG * 8.5 + carbsG * 3.5).toFixed(0);

            return {
              name: feed.name,
              intake: `${amountG}g`,
              protein: `${proteinG}g`,
              proteinPercent: `${p.toFixed(0)}%`,
              fat: `${fatG}g`,
              fatPercent: `${f.toFixed(0)}%`,
              carbs: `${carbsG}g`,
              carbsPercent: `${c.toFixed(0)}%`,
              calories: `${kcal}kcal`,
              caloriesPercent: ''
            };
          })
        );

        setCurrentFoods(results);
        // 캐시
        sessionStorage.setItem('nutrientAnalysis', JSON.stringify(results));
      } catch (e) {
        console.error('nutrient analysis build error:', e);
      }
    };

    run();
  }, [ratingResponse]);

  // RER 계산: RER = 70 × (체중(kg))^0.75
  const calculateRER = (weight: string): number => {
    const weightNumber = parseFloat(weight.replace('kg', ''));
    if (isNaN(weightNumber)) return 168;
    return Math.round(70 * Math.pow(weightNumber, 0.75));
  };

  // MER 계산: RER × 활동계수 (중성화된 성견 기준 1.4-1.6)
  const calculateMER = (rer: number): { min: number; max: number } => {
    return {
      min: Math.round(rer * 1.4),
      max: Math.round(rer * 1.6)
    };
  };

  // 권장 영양소 계산 (체중 기반)
  const calculateRecommendedNutrients = (weight: string) => {
    const weightNumber = parseFloat(weight.replace('kg', ''));
    if (isNaN(weightNumber)) return { protein: '11.1g 이상', fat: '5.5g 이하', carbs: '9~17g', water: '185ml 이상' };

    // 단백질: 체중 1kg당 2.5-3.5g
    const proteinMin = Math.round(weightNumber * 2.5 * 10) / 10;
    const proteinMax = Math.round(weightNumber * 3.5 * 10) / 10;

    // 지방: 체중 1kg당 1.5-2.5g
    const fatMin = Math.round(weightNumber * 1.5 * 10) / 10;
    const fatMax = Math.round(weightNumber * 2.5 * 10) / 10;

    // 탄수화물: 체중 1kg당 3-6g
    const carbsMin = Math.round(weightNumber * 3);
    const carbsMax = Math.round(weightNumber * 6);

    // 물: 체중 1kg당 50-60ml
    const waterMin = Math.round(weightNumber * 50);
    const waterMax = Math.round(weightNumber * 60);

    return {
      protein: `${proteinMin}~${proteinMax}g`,
      fat: `${fatMin}~${fatMax}g`,
      carbs: `${carbsMin}~${carbsMax}g`,
      water: `${waterMin}~${waterMax}ml`
    };
  };

  // 실제 계산된 값들
  const rer = calculateRER(petInfo.weight);
  const mer = calculateMER(rer);
  const recommendedNutrients = calculateRecommendedNutrients(petInfo.weight);

  const targetMetrics = {
    rer: `${rer}kcal`,
    targetWeight: petInfo.weight, // 현재 체중을 목표 체중으로 사용
    mer: `${mer.min} ~ ${mer.max}kcal`
  };

  const recommendedIntake = {
    protein: recommendedNutrients.protein,
    fat: recommendedNutrients.fat,
    carbs: recommendedNutrients.carbs,
    water: recommendedNutrients.water
  };

  return (
    <DetailedDietReport
      petInfo={petInfo}
      targetMetrics={targetMetrics}
      currentFoods={currentFoods}
      recommendedIntake={recommendedIntake}
    />
  );
};

export default DietReportExample;
