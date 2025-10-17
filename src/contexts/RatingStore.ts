import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface RatingData {
  dogInfo: {
    name: string;
    weight: string;
    breed: string;
  };
  foodRatings: Array<{
    foodInfo: {
      id?: number;
      brandName: string;
      productName: string;
      dailyAmount: string;
    };
    rating: {
      nutritionReliability?: {
        standardCompliance?: { grade: string; score: number; detail: string };
        transparencyLevel?: { grade: string; score: number; detail: string };
        overallGrade?: string;
        overallScore?: number;
        fatalFlaws?: string[];
        fatalFlawConditions?: string[];
      };
      nutritionBalance?: {
        macronutrientRatio?: { grade: string; score: number; detail: string };
        mineralBalance?: { grade: string; score: number; detail: string };
        fattyAcidBalance?: { grade: string; score: number; detail: string };
        overallGrade?: string;
        overallScore?: number;
        fatalFlaws?: string[];
        fatalFlawConditions?: string[];
      };
      ingredientQuality?: {
        primaryIngredients?: { grade: string; score: number; detail: string };
        ingredientSafety?: { grade: string; score: number; detail: string };
        overallGrade?: string;
        overallScore?: number;
        fatalFlaws?: string[];
        fatalFlawConditions?: string[];
      };
      manufacturingQuality?: {
        countryReliability?: { grade: string; score: number; detail: string };
        overallGrade?: string;
        overallScore?: number;
        fatalFlaws?: string[];
        fatalFlawConditions?: string[];
      };
      overallRating?: {
        grade: string;
        score: number;
        badge: string;
        summary: string;
        strengths?: string[];
        improvements?: string[];
        recommendations?: string[];
      };
      overallRatingWeighted?: {
        grade: string;
        score: number;
        badge: string;
      };
      // Alert 필드들 (rating 객체 내부에 직접 위치)
      alertLevel?: 'urgent' | 'caution' | 'checkup' | null;
      alertMessageKey?: string;
      alertSeverity?: 'urgent' | 'caution' | 'checkup';
      alertCategory?: string;
      alertDetails?: Record<string, unknown>;
      // 디버그 정보
      _sectionWeightedScores?: Record<string, number>;
      // 세부 필드 생략: 필요 시 확장
    };
  }>;
  overallSummary: {
    grade: string;
    score: number;
    badge: string;
    summary: string;
    feedCount: number;
    hasUrgentAlert?: boolean;
    hasCautionAlert?: boolean;
    totalFatalFlaws?: number;
    recommendedAction?: string;
  };
}

export interface RatingApiResponse {
  success: boolean;
  data: RatingData | null;
}

interface RatingState {
  response: RatingData | null;
  setResponse: (data: RatingData | null) => void;
  clear: () => void;

  // 파생된 셀렉터들: 화면에서 편하게 사용
  getDogInfo: () => RatingData['dogInfo'] | null;
  getFoodCards: () => Array<{
    key: string;
    title: string;
    amount: string;
    overall: {
      grade: string;
      score: number;
      badge: string;
      summary: string;
      strengths?: string[];
      improvements?: string[];
      recommendations?: string[];
    };
    overallWeighted?: {
      grade: string;
      score: number;
      badge: string;
    };
    // Alert 필드들 (rating 객체 내부에 직접 위치)
    alertLevel?: 'urgent' | 'caution' | 'checkup' | null;
    alertMessageKey?: string;
    alertSeverity?: 'urgent' | 'caution' | 'checkup';
    alertCategory?: string;
    alertDetails?: Record<string, unknown>;
  }>;
  getOverallSummary: () => RatingData['overallSummary'] | null;
}

export const useRatingStore = create<RatingState>()(
  persist(
    (set, get) => ({
      response: null,
      setResponse: (data) => set({ response: data }),
      clear: () => set({ response: null }),

      getDogInfo: () => {
        const res = get().response;
        return res ? res.dogInfo : null;
      },
      getFoodCards: () => {
        const res = get().response;
        if (!res || !res.foodRatings) return [];
        return res.foodRatings.map((fr, idx) => ({
          key: `${fr.foodInfo.id ?? idx}`,
          title: `${fr.foodInfo.brandName} ${fr.foodInfo.productName}`.trim(),
          amount: fr.foodInfo.dailyAmount,
          overall: {
            grade: fr.rating?.overallRating?.grade ?? 'N/A',
            score: fr.rating?.overallRating?.score ?? 0,
            badge: fr.rating?.overallRating?.badge ?? '표준',
            summary: fr.rating?.overallRating?.summary ?? '',
            strengths: fr.rating?.overallRating?.strengths,
            improvements: fr.rating?.overallRating?.improvements,
            recommendations: fr.rating?.overallRating?.recommendations,
          },
          overallWeighted: fr.rating?.overallRatingWeighted ? {
            grade: fr.rating.overallRatingWeighted.grade,
            score: fr.rating.overallRatingWeighted.score,
            badge: fr.rating.overallRatingWeighted.badge,
          } : undefined,
          // Alert 필드들 (rating 객체 내부에 직접 위치)
          alertLevel: fr.rating?.alertLevel,
          alertMessageKey: fr.rating?.alertMessageKey,
          alertSeverity: fr.rating?.alertSeverity,
          alertCategory: fr.rating?.alertCategory,
          alertDetails: fr.rating?.alertDetails,
        }));
      },
      getOverallSummary: () => {
        const res = get().response;
        return res ? res.overallSummary : null;
      },
    }),
    {
      name: 'rating-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ response: state.response }),
    }
  )
);


