/**
 * 반려견 사료 평가 Alert 메시지 템플릿
 * API Rating Response의 alertLevel, alertMessageKey에 따라 적절한 메시지를 반환
 */

export type AlertLevel = 'urgent' | 'caution' | 'checkup' | null;

export type AlertMessageKey =
  | 'critical_calorie_deficit'
  | 'critical_calorie_excess'
  | 'growth_stage_deficiency'
  | 'lifecycle_mismatch_puppy'
  | 'lifecycle_mismatch_senior'
  | 'low_reliability_feed'
  | 'critical_info_missing'
  | 'not_complete_feed'
  | 'grainfree_no_taurine_incomplete'
  | 'grainfree_dcm_risk'
  | 'grainfree_with_taurine'
  | 'optimization_suggestion';

export interface AlertMessage {
  level: AlertLevel;
  category: string;
  icon: string;
  title: string;
  template: string;
}

/**
 * Alert 메시지 템플릿 맵
 * 
 * 템플릿 내 변수:
 * - [반려견 이름] / [반려견의 이름] / [이름]: dogName
 * - [00]: percentage 또는 수치
 * - [나이]: dogAge
 * - [제품 명]: feedName
 */
export const ALERT_MESSAGES: Record<AlertMessageKey, AlertMessage> = {
  // 🚨 긴급 (Urgent) - 즉각적인 개선이 필요한 심각한 문제
  critical_calorie_deficit: {
    level: 'urgent',
    category: '심각한 열량 부족',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- [반려견 이름]에게는 생명 유지에 필요한 최소 에너지조차 공급되지 않고 있어요. 
- 현재 급여량은 하루 필요 최소치의 [00]%에 불과한 매우 위험한 상태에요.
- 이 상태가 지속될 경우 체중 감소는 물론, 생명 유지에 필수적인 근육까지 에너지원으로 사용하게 돼요. 결국 활력을 잃고, 면역력이 크게 저하되어 각종 질병에 취약해지며, 장기적으로는 주요 장기 기능에 손상을 줄 수 있어요!`,
  },

  critical_calorie_excess: {
    level: 'urgent',
    category: '심각한 열량 과잉',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- [반려견 이름]은/는 현재 비만을 유발할 수 있는 심각한 열량 과잉 상태에요. 
- 하루 권장량보다 [00]%나 많은 칼로리를 섭취하고 있어요. 
- 이 상태가 지속될 경우 장기적으로 관절과 심혈관계에 큰 부담을 줄 수 있어요!`,
  },

  growth_stage_deficiency: {
    level: 'urgent',
    category: '성장기 영양 결핍',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- 결정적 성장 시기를 보내고 있는 [반려견 이름]에게는 충분한 공급이 필수적이에요.
- 하지만, 현재 급여량과 사료의 영양 설계는 이를 충족시켜주기에는 부족해요. 
- 이 상태가 지속될 경우 뼈와 근육 발달이 잘 이루어지지 않고 추후 전반적인 건강에 영향을 줄 수 있어요!`,
  },

  lifecycle_mismatch_puppy: {
    level: 'urgent',
    category: '생애주기 부적합 (퍼피 성장기)',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- 성장기인 [반려견 이름]에게는 현재 사료의 영양이 충분하지 않아요. 
- 현재 급여중인 사료는 [반려견 이름]의 뼈와 근육 발달에 필수적인 단백질과 칼슘 요구량을 충족시키지 못해 심각한 성작 불균형을 초래할 수 있어요!`,
  },

  lifecycle_mismatch_senior: {
    level: 'urgent',
    category: '생애주기 부적합 (노령견)',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- 노령견인 [반려견 이름]에게 '전연령용' 사료는 최적의 선택이 아닐 수 있어요.
- '전연령용' 사료는 영양 요구량이 가장 높은 '성장기' 기준에 맞춰져 있어, [나이]살인 [이름]에게는 인의 함량이 과도하게 높아 신장에 부담을 줄 수 있어요.
- 특히 노령견에게 과도한 인 섭취는 장기적으로 신장 건강을 해치는 주요 원인이 될 수 있어요. 지금 [반려견 이름]의 건강 상태에 맞는 영양 균형을 점검해볼 필요가 있어요! `,
  },

  low_reliability_feed: {
    level: 'urgent',
    category: '신뢰도 낮은 사료',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- [반려견 이름]이 매일 먹는 주식에서 하나 이상의 심각한 문제점이 발견되었어요.
- 저희의 분석 결과, 급여 중인 사료는 핵심 평가 항목 여러 개에서 최하 등급을 받았습니다.
- 매일 먹는 주식의 품질은 [반려견 이름]의 건강과 직결됩니다. 현재 사료를 계속 급여할 경우, 장기적으로는 아이의 건강에 좋지 않은 영향을 미칠 수 있어 즉각적인 점검이 반드시 필요합니다!`,
  },

  critical_info_missing: {
    level: 'urgent',
    category: '핵심 정보 누락',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- [반려견 이름]의 뼈 건강과 직결되는 필수 정보가 누락되어, 현재 식단의 안전성을 확인할 수 없어요!
- 급여 중인 사료에는 성장과 건강 유지에 가장 중요한 '칼슘과 인의 비율'이 표기되어 있지 않습니다.
- 두 미네랄의 불균형은 성장기에는 돌이킬 수 없는 뼈 발달 문제를, 노령기에는 신장 질환을 유발할 수 있는 매우 중요한 문제입니다. 지금 바로 [반려견 이름]의 식단이 안전한지 확인하세요!`,
  },

  not_complete_feed: {
    level: 'urgent',
    category: '주식 여부',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- 급여 중인 사료는 모든 필수 영양소가 균형 있게 들어있는 '주식'이 아니기 때문에, 이것만으로는 [반려견의 이름]의 건강을 지킬 수 없어요. 

- 또한, 보조식과 간식을 너무 많이 먹게 되면 필수 아미노산/비타민/미네랄 등이 부족해져 장기적으로 심각한 영양 불균형을 초래할 수 있어요!`,
  },

  grainfree_no_taurine_incomplete: {
    level: 'urgent',
    category: '주식여부 + 그레인 프리',
    icon: '🚨',
    title: '즉각적인 개선이 필요한 심각한 문제',
    template: `- [반려견 이름]이/가 먹는 [제품 명]은 영양적으로 완전한 '주식'이 아니에요. 이것만으로는 [반려견의 이름]의 건강을 지킬 수 없어요. 
- 특히, 해당 제품은 '주식'이 아니기 때문에 심장 건강에 필수적인 '메티오닌'과 '타우린'의 최소 권장량을 충족하는지 보장할 수 없어요!
- 이러한 보조식을 주식처럼 많이 급여할 경우, 일반적인 영양 불균형의 위험은 물론, 최근 논란이 되고 있는 심장 건강(DCM)의 위험까지 높아질 수 있어 각별한 주의가 필요해요!

`,
  },

  // ⚠️ 주의 (Caution) - 장기적으로 문제가 될 수 있는 잠재적 위험
  grainfree_dcm_risk: {
    level: 'caution',
    category: '그레인프리',
    icon: '⚠️',
    title: '장기적으로 문제가 될 수 있는 잠재적 위험',
    template: `- 최근 전문가들 사이에서 일부 '그레인프리' 사료와 반려견의 심장 건강에 대한 논의가 있어요.

- 현재 급여 중인 사료는 곡물 대신 완두콩, 렌틸콩 등을 주원료로 사용하고 있는데, 이러한 식단이 심장 건강에 필수적인 '타우린' 영양소의 흡수를 방해할 수 있다는 가능성이 제기되었어요.

- 타우린 결핍은 장기적으로 '확장성 심근병증(DCM)'이라는 심각한 심장 질환을 유발할 수 있습니다. 현재 사료에 타우린과 그 재료가 되는 메티오닌이 충분히 포함되어 있는지, 전반적인 아미노산 균형이 잘 맞는지 점검하여 잠재적 위험을 관리하는 것이 중요해요!`,
  },

  // 🤔 점검 (Check-up) - 최적화를 위한 개선 포인트 발견
  grainfree_with_taurine: {
    level: 'checkup',
    category: '그레인프리',
    icon: '🤔',
    title: '최적화를 위한 개선 포인트 발견',
    template: `- 급여 중인 사료는 최근 논란이 되는 그레인프리 이슈에 대응하기 위해 제조사에서 '타우린'을 직접 추가한 제품이에요.

- 하지만 제조사의 노력과는 별개로, 이 사료의 영양 설계가 지금 우리 [반려견 이름 ]의 나이와 활동량에 딱 맞는 최적의 선택일까요? 혹시 함께 먹이는 영양제와 궁합이 맞지 않는 성분은 없을까요?

- 이제 몇 가지 추가 질문에 답변하고, [이름]만을 위한 최종 맞춤 리포트를 받아보세요. 지금 주신 정보에 더해진 상세 정보를 바탕으로 결과가 어떻게 달라지는지, 숨어있는 1%의 개선점을 찾아드릴게요!`,
  },

  optimization_suggestion: {
    level: 'checkup',
    category: '최적화를 위한 제안',
    icon: '🤔',
    title: '최적화를 위한 개선 포인트 발견',
    template: `- 훌륭해요! [반려견 이름]의 현재 식단에서는 심각하거나 즉각적인 위험 신호가 발견되지 않았어요.

- 하지만 [반려견 이름]의 활동량, 생활 습관, 세세한 건강 고민까지 더해진다면, 훨씬 더 정교하고 완벽한 분석이 가능해요.

- 이제 몇 가지 추가 질문에 답변하고, [이름]만을 위한 최종 맞춤 리포트를 받아보세요. 지금 주신 정보에 더해진 상세 정보를 바탕으로 결과가 어떻게 달라지는지, 숨어있는 1%의 개선점을 찾아드릴게요!`,
  },
};

/**
 * Alert 메시지를 포맷팅하여 반환
 * 
 * @param messageKey - Alert 메시지 키
 * @param variables - 템플릿에 삽입할 변수들
 * @returns 포맷팅된 Alert 메시지
 */
export function formatAlertMessage(
  messageKey: AlertMessageKey,
  variables: {
    dogName?: string;
    dogAge?: number;
    feedName?: string;
    percentage?: number;
    [key: string]: string | number | undefined;
  }
): string {
  const alertMessage = ALERT_MESSAGES[messageKey];
  if (!alertMessage) {
    return '';
  }

  let formattedMessage = alertMessage.template;

  // 변수 치환
  if (variables.dogName) {
    formattedMessage = formattedMessage
      .replace(/\[반려견 이름\]/g, variables.dogName)
      .replace(/\[반려견의 이름\]/g, variables.dogName)
      .replace(/\[이름\]/g, variables.dogName);
  }

  if (variables.dogAge !== undefined) {
    formattedMessage = formattedMessage.replace(/\[나이\]/g, String(variables.dogAge));
  }

  if (variables.feedName) {
    formattedMessage = formattedMessage.replace(/\[제품 명\]/g, variables.feedName);
  }

  if (variables.percentage !== undefined) {
    formattedMessage = formattedMessage.replace(/\[00\]/g, String(variables.percentage));
  }

  return formattedMessage;
}

/**
 * Alert Level에 따른 스타일 정보 반환
 */
export function getAlertLevelStyle(level: AlertLevel): {
  bgColor: string;
  textColor: string;
  borderColor: string;
} {
  switch (level) {
    case 'urgent':
      return {
        bgColor: 'bg-red-50',
        textColor: 'text-red-900',
        borderColor: 'border-red-300',
      };
    case 'caution':
      return {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-900',
        borderColor: 'border-yellow-300',
      };
    case 'checkup':
      return {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-900',
        borderColor: 'border-blue-300',
      };
    default:
      return {
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-900',
        borderColor: 'border-gray-300',
      };
  }
}
