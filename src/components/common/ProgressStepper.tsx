'use client';

interface ProgressStepperProps {
  /**
   * 현재 단계 (1부터 시작)
   */
  currentStep: number;
  /**
   * 각 단계의 라벨 배열
   * @default ['무료 분석', '설문', '맞춤 리포트', '실행', '결과']
   */
  labels?: readonly string[];
  /**
   * 전체 단계 수
   * @default 5
   */
  totalSteps?: number;
  /**
   * 현재 단계 설명 텍스트 (예: "맞춤 리포트")
   */
  currentStepLabel?: string;
  /**
   * 다음 단계 설명 텍스트 (예: "실행")
   */
  nextStepLabel?: string;
}

/**
 * 프로그레스 스테퍼 컴포넌트
 * 
 * 사용 예시:
 * ```tsx
 * <ProgressStepper 
 *   currentStep={3}
 *   currentStepLabel="맞춤 리포트"
 *   nextStepLabel="실행"
 * />
 * ```
 */
export default function ProgressStepper({
  currentStep,
  labels = ['무료 분석', '설문', '맞춤 리포트', '실행', '결과'] as const,
  totalSteps = 5,
  currentStepLabel,
  nextStepLabel
}: ProgressStepperProps) {
  // 현재/다음 단계 라벨이 제공되지 않으면 labels 배열에서 가져옴
  const currentLabel = currentStepLabel || labels[currentStep - 1] || '';
  const nextLabel = nextStepLabel || (currentStep < totalSteps ? labels[currentStep] : '');

  return (
    <div className="mb-6 md:mb-8">
      <div className="mx-auto max-w-[720px] md:max-w-[820px]">
        <div className="relative flex items-center px-1 md:px-2 overflow-visible pb-7 md:pb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const label = labels[step - 1] || '';
            const isDone = step < currentStep;
            const isCurrent = step === currentStep;
            const isLast = step === totalSteps;
            return (
              <div
                key={`step-${step}`}
                className={isLast ? 'flex items-center shrink-0' : 'flex items-center flex-1 min-w-0'}
              >
                {/* 노드 + 라벨 (라벨은 절대 위치로 노드 정중앙 하단에 고정) */}
                <div className="relative shrink-0">
                  <div
                    className={[
                      'relative z-10 flex items-center justify-center rounded-full',
                      'w-8 h-8 md:w-9 md:h-9',
                      isCurrent
                        ? 'bg-[#003DA5] text-white ring-4 ring-[#003DA5]/20'
                        : isDone
                          ? 'bg-[#E6EEF9] text-[#003DA5]'
                          : 'bg-[#E5E7EB] text-[#94A3B8]',
                      'text-[12px] md:text-[13px] font-bold'
                    ].join(' ')}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isDone ? '✓' : step}
                  </div>
                  <div className={['absolute left-1/2 -translate-x-1/2 top-full mt-2 text-[11px] md:text-[12px] text-[#64748B] text-center whitespace-nowrap', isCurrent ? 'font-semibold text-[#003DA5]' : ''].join(' ')}>
                    {label}
                  </div>
                </div>
                {/* 커넥터: 마지막 단계는 렌더하지 않음 */}
                {!isLast && (
                  <div
                    className={[
                      'h-2 mx-1 md:mx-2 rounded-full flex-1',
                      isDone
                        ? 'bg-[#C6D7F5]'
                        : isCurrent
                          ? 'bg-gradient-to-r from-[#003DA5] to-[#4F8BFF]'
                          : 'bg-[#E5E7EB]'
                    ].join(' ')}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-1 text-right text-[11px] md:text-[12px] text-[#334155]">
          <span className="font-semibold text-[#003DA5]">{currentStep}/{totalSteps}</span>
          {currentLabel && nextLabel && (
            <> 현재: {currentLabel} · 다음: {nextLabel}</>
          )}
        </div>
      </div>
    </div>
  );
}

