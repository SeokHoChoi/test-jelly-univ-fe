'use client';

import DetailedDietReport from './DetailedDietReport';

const DietReportExample = () => {
  // 이미지에 맞는 실제 데이터
  const petInfo = {
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
  };

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

  const comparisonData = [
    {
      name: '칼로리',
      percentage: 90.1,
      status: 'critical' as const,
      description: '10.0 / 11.1 kcal',
      detail: '칼로리 상태 · 74kcal 부족 · 목표치의 60% 수준으로 심각하게 부족'
    },
    {
      name: '단백질',
      percentage: 90.1,
      status: 'warning' as const,
      description: '10.0 / 11.1 g',
      detail: '단백질 상태 · 1.1g 부족 · 근육 보존에 필요한 최소량보다 부족'
    },
    {
      name: '지방',
      percentage: 90.1,
      status: 'good' as const,
      description: '10.0 / 11.1 g',
      detail: '지방 상태 · 목표 범위 내로 잘 관리되고 있음'
    },
    {
      name: '탄수화물',
      percentage: 106.5,
      status: 'warning' as const,
      description: '9 ~ 17 g',
      detail: '탄수화물 상태 · 권장 범위 내로 적절하게 섭취 중'
    }
  ];

  const supplements = [
    {
      name: '페퍼테일 참 유산균',
      status: 'maintenance' as const,
      description: '주식에 포함되지 않은 \'프로바이오틱스\'를 공급하여 고유의 기능을 수행합니다.\n\n장내 환경 개선은 피부 문제 및 전반적인 면역력과 직결되므로, 꾸준한 급여를 권장합니다.'
    },
    {
      name: '페피테일 참 오메가',
      status: 'conditional' as const,
      description: '주식(워프)과 간식(쏘울메이트) 모두 피쉬 오일을 함유하고 있으나, 염증 완화 및 피부 개선을 위한 치료적 용량의 EPA/DHA를 보충해준다는 점에서 유효합니다.\n\n현재 카쿠의 피부 상태와 관절 건강 예방을 위해 긍정적인 역할이 더 큽니다. 단, 향후 구리 제한 처방식 등 오메가-3가 강화된 특정 사료로 변경 시 중복 가능성이 있으므로 \'조건부\'로 권장합니다.'
    },
    {
      name: 'Neprofin Pet®',
      status: 'maintenance' as const,
      description: '소화 효소 및 항염 효소는 일반 사료에 포함되지 않는 고유의 기능성 성분입니다.\n\n카쿠의 과거 두드러기, 점액변 등 염증성 반응 관리와 관절 건강 예방이라는 목표에 부합하므로 유지를 권장합니다.'
    }
  ];

  return (
    <DetailedDietReport
      petInfo={petInfo}
      targetMetrics={targetMetrics}
      currentFoods={currentFoods}
      recommendedIntake={recommendedIntake}
      comparisonData={comparisonData}
      supplements={supplements}
    />
  );
};

export default DietReportExample;
