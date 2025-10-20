'use client';

import { useEffect, useState } from 'react';
import DetailedDietReport from './DetailedDietReport';

interface PetInfo {
  name: string;
  breed: string;
  gender: string;
  weight: string;
  age?: string;
  neutered?: string;
  activityLevel?: string;
}

const DietReportExample = ({ onPetInfoChange }: { onPetInfoChange?: (petInfo: PetInfo) => void }) => {
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
    if (onPetInfoChange) {
      onPetInfoChange(petInfo);
    }
  }, [petInfo, onPetInfoChange]);

  const targetMetrics = {
    rer: '168kcal',
    targetWeight: '3.4kg',
    mer: '185 ~ 202kcal'
  };

  const currentFoods = [
    {
      name: 'The Honest Kitchen Chicken',
      intake: '26.5g',
      protein: '20.5g',
      proteinPercent: '25%',
      fat: '00.0g',
      fatPercent: '14%',
      carbs: '00.0g',
      carbsPercent: '25%',
      calories: '140kcal',
      caloriesPercent: '60%'
    },
    {
      name: 'Frontier Pet Kangaroo',
      intake: '15g',
      protein: '50g',
      proteinPercent: '30%',
      fat: '00.0g',
      fatPercent: '17%',
      carbs: '00.0g',
      carbsPercent: '15%',
      calories: '55kcal',
      caloriesPercent: '28%'
    },
    {
      name: 'Carna4 Chicken',
      intake: '10g',
      protein: '11.6g',
      proteinPercent: '27%',
      fat: '00.0g',
      fatPercent: '21%',
      carbs: '00.0g',
      carbsPercent: '22%',
      calories: '20.5kcal',
      caloriesPercent: '10%'
    }
  ];

  const recommendedIntake = {
    protein: '11.1g 이상',
    fat: '5.5g 이하',
    carbs: '9~17g',
    water: '185ml 이상'
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
