'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';
import FoodQualityAnalysisSection from '@/components/brief-report/FoodQualityAnalysisSection';
import PetSuitabilitySection from '@/components/brief-report/PetSuitabilitySection';

export default function SharedReportPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setResponse = useRatingStore((s) => s.setResponse);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/reports/${params.id}`);

        if (!response.ok) {
          throw new Error('리포트를 찾을 수 없습니다.');
        }

        const data = await response.json();

        // API 응답을 RatingStore 형식으로 변환
        const ratingData = {
          dogInfo: {
            name: data.dogInfo.name,
            weight: data.dogInfo.weight,
            breed: data.dogInfo.breed
          },
          foodRatings: [{
            foodInfo: {
              id: 0, // 임시 ID
              brandName: data.foodInfo.brand_name,
              productName: data.foodInfo.product_name,
              dailyAmount: 0 // 임시 값
            },
            rating: {
              // 기존 categoryResults 구조를 새로운 구조로 변환
              nutritionReliability: {
                standardCompliance: {
                  grade: data.evaluation.categoryResults['1-1_nutrition_reliability'].grade,
                  score: data.evaluation.categoryResults['1-1_nutrition_reliability'].score,
                  detail: data.evaluation.categoryResults['1-1_nutrition_reliability'].details?.message || ''
                },
                transparencyLevel: {
                  grade: data.evaluation.categoryResults['1-2_transparency'].grade,
                  score: data.evaluation.categoryResults['1-2_transparency'].score,
                  detail: data.evaluation.categoryResults['1-2_transparency'].details?.providedCount
                    ? `${data.evaluation.categoryResults['1-2_transparency'].details.providedCount}개 영양소 정보 제공`
                    : ''
                },
                overallGrade: calculateWeightedGrade(
                  data.evaluation.categoryResults['1-1_nutrition_reliability'].score * 0.6 +
                  data.evaluation.categoryResults['1-2_transparency'].score * 0.4
                ),
                overallScore: Math.round(
                  data.evaluation.categoryResults['1-1_nutrition_reliability'].score * 0.6 +
                  data.evaluation.categoryResults['1-2_transparency'].score * 0.4
                ),
                fatalFlaws: [
                  ...(data.evaluation.categoryResults['1-1_nutrition_reliability'].fatalFlaws || []),
                  ...(data.evaluation.categoryResults['1-2_transparency'].fatalFlaws || [])
                ]
              },
              nutritionBalance: {
                macronutrientRatio: {
                  grade: data.evaluation.categoryResults['2-1_macro_balance'].grade,
                  score: data.evaluation.categoryResults['2-1_macro_balance'].score,
                  detail: data.evaluation.categoryResults['2-1_macro_balance'].details?.reason || ''
                },
                mineralBalance: {
                  grade: data.evaluation.categoryResults['2-2_mineral_balance'].grade,
                  score: data.evaluation.categoryResults['2-2_mineral_balance'].score,
                  detail: data.evaluation.categoryResults['2-2_mineral_balance'].details?.caPRatio
                    ? `Ca:P 비율 ${data.evaluation.categoryResults['2-2_mineral_balance'].details.caPRatio}`
                    : ''
                },
                fattyAcidBalance: {
                  grade: data.evaluation.categoryResults['2-3_fatty_acid_balance'].grade,
                  score: data.evaluation.categoryResults['2-3_fatty_acid_balance'].score,
                  detail: data.evaluation.categoryResults['2-3_fatty_acid_balance'].details?.reason ||
                         (data.evaluation.categoryResults['2-3_fatty_acid_balance'].fatalFlaws?.[0]) || ''
                },
                overallGrade: calculateWeightedGrade(
                  data.evaluation.categoryResults['2-1_macro_balance'].score * 0.5 +
                  data.evaluation.categoryResults['2-2_mineral_balance'].score * 0.4 +
                  data.evaluation.categoryResults['2-3_fatty_acid_balance'].score * 0.1
                ),
                overallScore: Math.round(
                  data.evaluation.categoryResults['2-1_macro_balance'].score * 0.5 +
                  data.evaluation.categoryResults['2-2_mineral_balance'].score * 0.4 +
                  data.evaluation.categoryResults['2-3_fatty_acid_balance'].score * 0.1
                ),
                fatalFlaws: [
                  ...(data.evaluation.categoryResults['2-1_macro_balance'].fatalFlaws || []),
                  ...(data.evaluation.categoryResults['2-2_mineral_balance'].fatalFlaws || []),
                  ...(data.evaluation.categoryResults['2-3_fatty_acid_balance'].fatalFlaws || [])
                ]
              },
              ingredientQuality: {
                primaryIngredients: {
                  grade: data.evaluation.categoryResults['3-1_ingredient_quality'].grade,
                  score: data.evaluation.categoryResults['3-1_ingredient_quality'].score,
                  detail: data.evaluation.categoryResults['3-1_ingredient_quality'].details?.reason || ''
                },
                ingredientSafety: {
                  grade: data.evaluation.categoryResults['3-2_manufacturing_quality']?.grade ||
                         data.evaluation.categoryResults['4_safety_certification']?.grade || 'B',
                  score: data.evaluation.categoryResults['3-2_manufacturing_quality']?.score ||
                         data.evaluation.categoryResults['4_safety_certification']?.score || 75,
                  detail: data.evaluation.categoryResults['3-2_manufacturing_quality']?.details?.country ||
                         data.evaluation.categoryResults['4_safety_certification']?.details?.certifications || ''
                },
                overallGrade: calculateWeightedGrade(
                  data.evaluation.categoryResults['3-1_ingredient_quality'].score * 0.7 +
                  (data.evaluation.categoryResults['3-2_manufacturing_quality']?.score || 75) * 0.3
                ),
                overallScore: Math.round(
                  data.evaluation.categoryResults['3-1_ingredient_quality'].score * 0.7 +
                  (data.evaluation.categoryResults['3-2_manufacturing_quality']?.score || 75) * 0.3
                ),
                fatalFlaws: [
                  ...(data.evaluation.categoryResults['3-1_ingredient_quality'].fatalFlaws || []),
                  ...(data.evaluation.categoryResults['3-2_manufacturing_quality']?.fatalFlaws || [])
                ]
              },
              manufacturingQuality: {
                countryReliability: {
                  grade: data.evaluation.categoryResults['3-2_manufacturing_quality']?.grade || 'B',
                  score: data.evaluation.categoryResults['3-2_manufacturing_quality']?.score || 75,
                  detail: data.evaluation.categoryResults['3-2_manufacturing_quality']?.details?.country || ''
                },
                overallGrade: data.evaluation.categoryResults['3-2_manufacturing_quality']?.grade || 'B',
                overallScore: data.evaluation.categoryResults['3-2_manufacturing_quality']?.score || 75,
                fatalFlaws: data.evaluation.categoryResults['3-2_manufacturing_quality']?.fatalFlaws || []
              },
              overallRating: {
                grade: data.evaluation.overallGrade,
                score: data.evaluation.overallScore,
                badge: getBadge(data.evaluation.overallScore),
                summary: '이 보고서는 저장된 분석 결과입니다.',
                strengths: [],
                improvements: [],
                recommendations: []
              },
              alerts: []
            }
          }],
          overallSummary: {
            grade: data.evaluation.overallGrade,
            score: data.evaluation.overallScore,
            badge: getBadge(data.evaluation.overallScore),
            summary: `${data.dogInfo.name}(${data.dogInfo.weight}kg, ${data.dogInfo.breed})에게 1개의 사료를 급여 중입니다.`,
            feedCount: 1,
            hasUrgentAlert: false,
            hasCautionAlert: false,
            hasCheckupAlert: false,
            totalFatalFlaws: 0,
            allAlerts: [],
            recommendedAction: ''
          }
        };

        setResponse(ratingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '리포트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id, setResponse]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
          <p className="text-gray-600">리포트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ 오류</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <FoodQualityAnalysisSection />
      <PetSuitabilitySection />
    </div>
  );
}

function calculateWeightedGrade(score: number): string {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'B+';
  if (score >= 75) return 'B';
  return 'C';
}

function getBadge(score: number): string {
  if (score >= 90) return '프리미엄';
  if (score >= 80) return '밸런스드';
  if (score >= 70) return '베이직';
  return '개선필요';
}
