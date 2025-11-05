'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SavedReportView from '@/components/SavedReportView';
import { FoodInfo, DogInfo, FoodEvaluation } from '@/types/report';

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
        const response = await fetch(`/api/reports/${params.id}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

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

  return (
    <div className="min-h-screen">
      <SavedReportView
        foodInfo={reportData.foodInfo}
        dogInfo={reportData.dogInfo}
        evaluation={reportData.evaluation}
      />
    </div>
  );
}
