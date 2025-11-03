'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface FoodInfo {
  brand_name: string;
  product_name: string;
  crude_protein?: number;
  crude_fat?: number;
  crude_fiber?: number;
  crude_ash?: number;
  moisture?: number;
  calcium?: number;
  phosphorus?: number;
  omega_6?: number;
  omega_3?: number;
  ingredients?: string;
  manufacturing_country?: string;
}

interface DogInfo {
  name: string;
  breed: string;
  weight: number;
  age?: number;
}

interface EvaluationResult {
  grade: string;
  score: number;
  details: Record<string, unknown>;
  fatalFlaws?: string[];
}

interface FoodEvaluation {
  categoryResults: {
    '1-1_nutrition_reliability': EvaluationResult;
    '1-2_transparency': EvaluationResult;
    '2-1_macro_balance': EvaluationResult;
    '2-2_mineral_balance': EvaluationResult;
    '2-3_fatty_acid_balance': EvaluationResult;
    '3-1_ingredient_quality': EvaluationResult;
    '3-2_manufacturing_quality': EvaluationResult;
    '4_safety_certification': EvaluationResult;
  };
  overallScore: number;
  overallGrade: string;
}

export default function SharedReportPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{
    foodInfo: FoodInfo;
    dogInfo: DogInfo;
    evaluation: FoodEvaluation;
  } | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/reports/${params.id}`);

        if (!response.ok) {
          throw new Error('리포트를 찾을 수 없습니다.');
        }

        const data = await response.json();
        setReportData({
          foodInfo: data.foodInfo,
          dogInfo: data.dogInfo,
          evaluation: data.evaluation
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '리포트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

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

  if (error || !reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ 오류</h1>
          <p className="text-gray-600">{error || '리포트를 찾을 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  // 간단한 리포트 표시
  const results = reportData.evaluation.categoryResults;
  const reliabilityGrade = results['1-1_nutrition_reliability'].grade;
  const macroGrade = results['2-1_macro_balance'].grade;
  const ingredientGrade = results['3-1_ingredient_quality'].grade;
  const manufacturingGrade = results['3-2_manufacturing_quality'].grade;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#003DA5] mb-6 text-center">
            사료 품질 분석 보고서
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {reportData.foodInfo.brand_name} - {reportData.foodInfo.product_name}
            </h2>
            <p className="text-gray-600">반려견: {reportData.dogInfo.name} ({reportData.dogInfo.breed}, {reportData.dogInfo.weight}kg)</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">영양 정보 신뢰도</p>
              <p className={`text-3xl font-bold ${reliabilityGrade === 'C' ? 'text-red-600' : 'text-[#003DA5]'}`}>
                {reliabilityGrade}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">영양 설계 균형도</p>
              <p className={`text-3xl font-bold ${macroGrade === 'C' ? 'text-red-600' : 'text-[#003DA5]'}`}>
                {macroGrade}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">원료 품질</p>
              <p className={`text-3xl font-bold ${ingredientGrade === 'C' ? 'text-red-600' : 'text-[#003DA5]'}`}>
                {ingredientGrade}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">제조 품질</p>
              <p className={`text-3xl font-bold ${manufacturingGrade === 'C' ? 'text-red-600' : 'text-[#003DA5]'}`}>
                {manufacturingGrade}
              </p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-8">
            <p>이 리포트는 Jelly University에서 생성되었습니다.</p>
            <a href="https://jellyuniversity.com" className="text-[#003DA5] hover:underline">
              jellyuniversity.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
