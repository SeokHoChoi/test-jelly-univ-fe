'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRatingStore } from '@/contexts/RatingStore';

/**
 * 이벤트성: 냥구 케이스 기반 전환 섹션 (토스 스타일)
 * - 백엔드 연동 없이 정적 카피/레이아웃
 * - 개인화: 반려견 이름만 스토어에서 가져다 표기
 * - CTA: /checkout 로 유도 (캠페인 파라미터 포함)
 */
export default function NyanguTeaserSection({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const response = useRatingStore((s) => s.response);

  const dogName = useMemo(() => {
    return response?.dogInfo?.name || '우리 아이';
  }, [response]);

  const goCheckout = () => {
    router.push('/checkout?plan=basic&dir=true&campaign=nyangu');
  };

  // 현재 단계(브리프 리포트에서 노출되므로 3단계: 맞춤 리포트)
  const currentStep = 3;

  // 랩 리포트(샘플 데이터)
  const labTargets = useMemo(
    () => [
      { type: '유익균', name: 'Faecalibacterium', normal_in_dogs: '> 5.52', subject_value: 6.54, trend: 'up' as const },
      { type: '유익균', name: 'Turicibacter', normal_in_dogs: '> 4.11', subject_value: 4.03, trend: 'down' as const },
      { type: '유익균', name: 'Blautia', normal_in_dogs: '> 7.08', subject_value: 6.17, trend: 'down' as const },
      { type: '유익균', name: 'Fusobacteria', normal_in_dogs: '> 6', subject_value: 6.79, trend: 'up' as const },
      { type: '유익균', name: 'Clostridium hiranonis', normal_in_dogs: '> 4.25', subject_value: 5.98, trend: 'up' as const },
      { type: '유해균', name: 'Streptococcus', normal_in_dogs: '< 3.52', subject_value: 2.74, trend: 'down' as const },
      { type: '유해균', name: 'Escherichia coli', normal_in_dogs: '< 6.15', subject_value: 2.93, trend: 'down' as const },
    ],
    []
  );
  const [showWeakPoints, setShowWeakPoints] = useState(false);

  // 임계치 파싱 및 강점/보완 산출
  const parseNormal = (s: string): { op: '>' | '<' | null; threshold: number | null } => {
    const op = s.includes('>') ? '>' : s.includes('<') ? '<' : null;
    const match = s.match(/([0-9]+(?:\.[0-9]+)?)/);
    const threshold = match ? parseFloat(match[1]) : null;
    return { op, threshold };
  };

  const evaluated = useMemo(() => {
    return labTargets.map((t) => {
      const { op, threshold } = parseNormal(t.normal_in_dogs);
      const value = t.subject_value;
      let isPositive = false;
      let delta = 0; // 양수일수록 더 긍정적(임계치 상회 or 하회 정도)
      if (op && threshold !== null) {
        if (op === '>') {
          isPositive = value >= threshold;
          delta = value - threshold; // 높을수록 좋음
        } else if (op === '<') {
          isPositive = value <= threshold;
          delta = threshold - value; // 낮을수록 좋음
        }
      }
      return { ...t, isPositive, delta, threshold: threshold ?? null, op: op ?? null };
    });
  }, [labTargets]);

  const positiveTop3 = useMemo(
    () => evaluated.filter((e) => e.isPositive).sort((a, b) => (b.delta ?? 0) - (a.delta ?? 0)).slice(0, 3),
    [evaluated]
  );
  const negativeTop = useMemo(
    () => evaluated.filter((e) => !e.isPositive).sort((a, b) => (b.delta ?? 0) - (a.delta ?? 0)),
    [evaluated]
  );

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 mt-10 md:mt-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#F7FAFF] to-white" />
      <div className="relative mx-auto max-w-3xl md:max-w-6xl">
        {/* 헤더 */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#ECF2FF] text-[#003DA5] px-4 py-2 rounded-full text-[12px] md:text-[13px] font-semibold">
            <span>🔬</span>
            <span>청담 장튼튼 프로그램 이후</span>
          </div>
          <h2 className="mt-3 md:mt-4 text-[clamp(24px,4.5vw,40px)] font-extrabold text-[#0F172A] leading-[1.15] tracking-[-0.01em]">
            경쟁률 407:4 공여견 합격 🎉
          </h2>
          <p className="mt-2 text-[#334155] text-[clamp(15px,2.4vw,18px)] leading-relaxed">
            장 불균형 지수 <span className="font-semibold">-5.58 → 정상화 성공!</span>
          </p>
          <p className="mt-1 text-[#334155] text-[clamp(14px,2.2vw,17px)] leading-relaxed">
            핵심 유익균 회복 + 유해균 안정화로 <span className="font-semibold">‘좋은 변’ 인증 완료</span>
          </p>
          <p className="text-sm md:text-base text-gray-700 text-center mt-3">
            {dogName}도 <span className="text-[#003DA5] font-semibold">‘냥구’</span>처럼
            <br className="md:hidden" />
            <span className="hidden md:inline"> </span>균형 잡힌 장 건강으로&nbsp;공여견 합격에 도전해보세요!
          </p>
        </div>

        {/* 헤더 하단: 세그먼트형 스텝퍼 (무료 → 리포트) */}
        <div className="mb-6 md:mb-8">
          <div className="mx-auto max-w-[720px] md:max-w-[820px]">
            <div className="relative flex items-center px-1 md:px-2 overflow-visible pb-7 md:pb-8">
              {([1, 2, 3, 4, 5] as const).map((step) => {
                const labels = ['무료 분석', '설문', '맞춤 리포트', '실행', '결과'] as const;
                const label = labels[step - 1];
                const isDone = step < currentStep;
                const isCurrent = step === currentStep;
                const isLast = step === 5;
                return (
                  <div
                    key={`head-step-${step}`}
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
              <span className="font-semibold text-[#003DA5]">{currentStep}/5</span> 현재: 맞춤 리포트 · 다음: 실행
            </div>
          </div>
        </div>

        {/* 스토리 타임라인 */}
        <div className="mb-6 md:mb-10 bg-white rounded-2xl border border-gray-100 p-5 md:p-6">
          <h3 className="text-[16px] md:text-[18px] font-bold text-[#0F172A] mb-4">냥구는 이렇게 바뀌었어요</h3>
          <div className="grid md:grid-cols-5 gap-3 text-[13px] md:text-[14px]">
            <div className="rounded-xl bg-[#F8FAFC] p-4 border border-gray-100">
              <p className="font-semibold text-[#0F172A] mb-1">1. 무료 분석</p>
              <p className="text-[#64748B]">현재 급여 확인 · 핵심 이슈 파악</p>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] p-4 border border-gray-100">
              <p className="font-semibold text-[#0F172A] mb-1">2. 설문</p>
              <p className="text-[#64748B]">나이/활동/예산·선호 입력</p>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] p-4 border border-gray-100">
              <p className="font-semibold text-[#0F172A] mb-1">3. 맞춤 리포트</p>
              <p className="text-[#64748B]">브랜드/급여량/7일 전환표 전달</p>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] p-4 border border-gray-100">
              <p className="font-semibold text-[#0F172A] mb-1">4. 실행</p>
              <p className="text-[#64748B]">가이드대로 급여 · Q&A 지원</p>
            </div>
            <div className="rounded-xl bg-[#F4F8FF] p-4 border border-[#D6E4FF]">
              <p className="font-semibold text-[#003DA5] mb-1">5. 결과</p>
              <p className="text-[#003DA5]">공여견 합격(경쟁률 407:4)</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] md:text-[13px] text-[#94A3B8]">
            참고: 공여 프로그램은 외부 기관의 DI→PCR→종합검진 절차로 진행됩니다. 젤리대학교는 <span className="font-semibold">식단 설계와 실행</span>을 돕는 서비스입니다.
          </p>
        </div>

        {/* 내용 카드 (토스 스타일) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 냥구 결과 요약 카드 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img
                  src="/img/home/tmp-review-profile/review-4.png"
                  alt="프로필"
                  className="w-11 h-11 rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-[16px] md:text-[17px] font-semibold text-[#0F172A]">냥구 (셔틀랜드쉽독, 1Y9M)</p>
                  <p className="text-[12px] text-[#64748B]">장 불균형 지수 검사 결과</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#64748B] whitespace-nowrap">경쟁률 407:4</span>
                <span className="px-2 py-1 text-[11px] rounded-full bg-[#E8F4F8] text-[#0B74DE] font-semibold whitespace-nowrap shrink-0">공여견 합격</span>
              </div>
            </div>

            {/* 지수 박스 */}
            <div className="bg-[#F4F8FF] border border-[#D6E4FF] rounded-xl p-5 mb-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] text-[#64748B]">전체 장 불균형 지수</p>
                  <p className="text-[clamp(28px,4.2vw,36px)] font-extrabold text-[#003DA5] font-mono">-5.58</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003DA5] text-white text-[12px] font-bold">
                    ✓ 균형
                  </span>
                  <p className="text-[11px] text-[#64748B] mt-1">정상 기준: {'< -1'}</p>
                </div>
              </div>
              <p className="mt-3 text-[14px] md:text-[15px] text-[#374151] leading-relaxed">
                청담 장튼튼 프로그램 이후 결과입니다. <span className="font-semibold">정상 기준보다 안정적인 수치</span>를 유지하고 있습니다.
              </p>
            </div>

            {/* 강점 하이라이트 (TOP3) */}
            {positiveTop3.length > 0 && (
              <div className="mb-5">
                <h4 className="text-[14px] md:text-[15px] font-bold text-[#003DA5] mb-1">핵심 개선 신호 (TOP3)</h4>
                <p className="text-[12px] text-[#64748B] mb-3">프로그램 이후 핵심 유익균이 정상 수치로 회복되었습니다.</p>
                <div className="rounded-2xl border border-[#D6E4FF] overflow-x-auto">
                  <div className="min-w-[520px]">
                    <div className="grid grid-cols-5 gap-0 bg-[#F4F8FF] text-[#0F172A] text-[12px] font-semibold">
                      <div className="px-3 py-2">구분</div>
                      <div className="px-3 py-2">세균</div>
                      <div className="px-3 py-2 text-center">기준</div>
                      <div className="px-3 py-2 text-center">측정</div>
                      <div className="px-3 py-2 text-right">결과</div>
                    </div>
                    {positiveTop3.map((p, idx) => {
                      const isEven = idx % 2 === 1;
                      const resultText =
                        p.type === '유해균'
                          ? '안정권 유지'
                          : p.name === 'Faecalibacterium'
                            ? '매우 양호'
                            : '정상 회복';
                      return (
                        <div key={idx} className={`grid grid-cols-5 gap-0 text-[13px] ${isEven ? 'bg-white' : 'bg-[#FDFEFF]'} items-center`}>
                          <div className="px-3 py-2">
                            <span className="px-2 py-0.5 text-[11px] rounded-full bg-[#EEF2FF] text-[#3730A3]">{p.type}</span>
                          </div>
                          <div className="px-3 py-2 text-[#111827]">{p.name}</div>
                          <div className="px-3 py-2 text-center font-mono">{p.normal_in_dogs}</div>
                          <div className="px-3 py-2 text-center font-mono">{String(p.subject_value)}</div>
                          <div className="px-3 py-2 text-right">
                            <span className="inline-flex items-center gap-1 text-[#0B74DE] font-semibold">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                              {resultText}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 현재 상태 요약 */}
            <div className="rounded-2xl border border-[#D6E4FF] bg-[#F4F8FF] p-4 mb-5">
              <h5 className="text-[14px] md:text-[15px] font-bold text-[#003DA5] mb-2">현재 상태 요약</h5>
              <ul className="space-y-1 text-[13px] text-[#0F172A]">
                <li className="flex items-start gap-2">
                  <span className="text-[#003DA5] mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                  </span>
                  전체 장 건강 지수: 정상 (기준 {'< -1'})
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003DA5] mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                  </span>
                  핵심 유익균 5종 중 3종 정상 이상 유지
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#003DA5] mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                  </span>
                  유해균 2종 모두 안정권
                </li>
              </ul>
            </div>

            {/* 검사표 (미니 테이블) */}
            <div className="mb-5 rounded-2xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-3 md:[grid-template-columns:2fr_1fr_1fr] bg-[#F8FAFC] text-[#475569] text-[13px] md:text-[14px] font-semibold">
                <div className="px-4 py-3">항목</div>
                <div className="px-4 py-3 text-center">정상</div>
                <div className="px-4 py-3 text-right">냥구</div>
              </div>
              {/* Rows */}
              {labTargets.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 md:[grid-template-columns:2fr_1fr_1fr] text-[14px] md:text-[15px] ${i % 2 ? 'bg-white' : 'bg-[#FDFEFF]'} items-start gap-x-2`}
                >
                  <div className="px-4 py-3 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-2 min-w-0">
                      <span className="px-2 py-0.5 text-[11px] rounded-full bg-[#EEF2FF] text-[#3730A3] shrink-0 whitespace-nowrap">{row.type}</span>
                      <span className="text-[#111827] break-words min-w-0">{row.name}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-center text-[#475569] font-mono break-words min-w-0">{row.normal_in_dogs}</div>
                  <div className="px-4 py-3 text-right font-mono min-w-0">
                    <span
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-semibold ${row.trend === 'up' ? 'text-[#B91C1C]' : 'text-[#003DA5]'
                        } whitespace-nowrap`}
                    >
                      {String(row.subject_value)}
                      <span className="text-[12px] md:text-[13px]">{row.trend === 'up' ? '▲' : '▼'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 보완 포인트 (성장 중) */}
            <div className="rounded-2xl border border-gray-100">
              <button
                className="w-full flex items-center justify-between px-4 py-3"
                onClick={() => setShowWeakPoints((v) => !v)}
                aria-expanded={showWeakPoints}
              >
                <span className="text-[14px] md:text-[15px] font-semibold text-[#0F172A]">보완 포인트 (성장 중)</span>
                <span className="text-[12px] text-[#64748B]">{negativeTop.length}개</span>
              </button>
              {showWeakPoints && (
                <div className="px-4 pb-4 space-y-3">
                  {negativeTop.slice(0, 2).map((n, idx) => {
                    const meaning =
                      n.name === 'Turicibacter'
                        ? '에너지 흡수 효율 ↑'
                        : n.name === 'Blautia'
                          ? '장내 다양성 향상 ↑'
                          : '추가 보완 시 더 좋아질 수 있음';
                    return (
                      <div key={idx} className="rounded-xl p-4 border border-[#D6E4FF] bg-[#F4F8FF]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-[#003DA5] text-white flex items-center justify-center text-[12px] font-bold">i</div>
                            <div>
                              <p className="text-[14px] font-semibold text-[#003DA5]">{n.name} 보완 시</p>
                              <p className="text-[12px] text-[#6B7280]">정상 {n.normal_in_dogs} / 측정 {n.subject_value}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-[11px] rounded-full bg-white border border-[#D6E4FF] text-[#003DA5] font-semibold">{meaning}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 결론 */}
            <div className="mt-5 rounded-xl border border-[#D6E4FF] bg-[#F4F8FF] p-4">
              <p className="text-[13px] md:text-[14px] text-[#0F172A] leading-relaxed">
                냥구는 이미 <span className="font-semibold">건강한 장 환경</span>을 유지하고 있으며, 핵심 유익균과 유해균 밸런스가 정상화되었습니다.
                지금처럼 꾸준히 관리한다면 <span className="font-semibold">더 완벽한 장 건강</span>을 기대할 수 있습니다.
              </p>
            </div>
          </div>

          {/* 무엇을 해주나요 카드 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-[18px] md:text-[20px] font-bold text-[#111] mb-4">유료 리포트에서 받게 될 것</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">식단 설계의 근거가 명확</p>
                  <p className="text-[13px] text-[#6B7280]">국제 기준·수의영양 문헌에 맞춰 ‘왜’ 바꿔야 하는지 설명</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">{dogName} 맞춤 사료·영양제 조합</p>
                  <p className="text-[13px] text-[#6B7280]">브랜드/제품명, 교체 필요성까지 한눈에</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">정확한 급여량</p>
                  <p className="text-[13px] text-[#6B7280]">g 단위로 바로 실행 가능한 가이드</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">설문 기반 1:1 커스터마이징</p>
                  <p className="text-[13px] text-[#6B7280]">반려견 정보·선호·예산까지 반영한 현실적 계획</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">수의사 QA</p>
                  <p className="text-[13px] text-[#6B7280]">실행 중 궁금한 점은 채널톡으로 바로 질문</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <div>
                  <p className="text-[14px] font-semibold text-[#111]">7일 환불 보장</p>
                  <p className="text-[13px] text-[#6B7280]">만족하지 못하면 전액 환불 (사유 불문)</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={goCheckout}
                className="w-full bg-gradient-to-r from-[#003DA5] to-[#0052CC] hover:from-[#002A7A] hover:to-[#003DA5] text-white py-4 md:py-5 rounded-2xl font-bold text-[17px] md:text-[19px] shadow-lg hover:shadow-xl transition-all active:scale-[0.99] ring-1 ring-[#003DA5]/20"
              >
                🎁 &nbsp; 지금 {dogName} 맞춤 리포트 받기
              </button>
              <p className="text-center text-[12px] text-[#6B7280] mt-3">
                서울대·한국수의영양학회 임원 수의사 검증 | 7일 환불 보장
              </p>
            </div>
          </div>
        </div>

        {/* 후기 + 신뢰 배지 */}
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[13px] text-[#111] leading-relaxed">
              “무료 리포트로는 ‘그래서 뭘 먹여야 하죠?’가 남았는데,
              유료 리포트에서 <span className="font-semibold">브랜드/급여량/전환표</span>까지 정리돼서 그대로 실행했습니다.”
            </p>
            <p className="mt-2 text-[12px] text-[#64748B]">5살 말티즈 보호자</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[13px] text-[#111] leading-relaxed">
              “유익균 수치를 표로 확인하고 나니 설득력이 달랐어요. 2주 만에
              <span className="font-semibold"> 변 상태가 안정</span>됐습니다.”
            </p>
            <p className="mt-2 text-[12px] text-[#64748B]">3살 푸들 보호자</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ECF2FF] text-[#003DA5] flex items-center justify-center">✓</div>
              <div className="text-[13px]">
                <p className="font-semibold text-[#111]">검증</p>
                <p className="text-[#64748B]">서울대·한국수의영양학회 임원 수의사</p>
              </div>
            </div>
          </div>
        </div>

        {/* 냥구 식단 공개 (더 귀엽게) */}
        <div className="mt-8 md:mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4E6] text-[#F59E0B] flex items-center justify-center text-[22px]">🥣</div>
              <div>
                <h3 className="text-[18px] md:text-[22px] font-extrabold text-[#0F172A]">냥구의 식단 공개</h3>
                <p className="text-[12px] text-[#6B7280]">가이드용 가라데이터 · 유저가 한눈에 이해하도록 구성</p>
              </div>
            </div>
            <span className="px-3 py-1.5 text-[11px] rounded-full bg-[#EEF2FF] text-[#3730A3] font-semibold whitespace-nowrap">샘플</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 사료 카드 */}
            <div className="rounded-2xl border border-[#E5E7EB] p-5">
              <div className="flex items-center gap-2 mb-2">
                {/* <span className="text-[18px]">🍽️</span> */}
                <p className="text-[13px] text-[#64748B]">주식</p>
              </div>
              <p className="text-[#0F172A] font-bold text-[16px] md:text-[17px] mb-1">로얄캐닌 미니 어덜트</p>
              <p className="text-[12px] text-[#6B7280] mb-3">소형견 전용 / 국내 생산</p>
              <div className="bg-[#F8FAFC] rounded-xl p-3">
                <p className="text-[12px] text-[#475569]">급여량</p>
                <p className="text-[16px] font-extrabold text-[#003DA5]">아침 75g · 저녁 95g</p>
              </div>
            </div>

            {/* 토핑/영양제 카드 */}
            <div className="rounded-2xl border border-[#E5E7EB] p-5">
              <div className="flex items-center gap-2 mb-2">
                {/* <span className="text-[18px]">🧪</span> */}
                <p className="text-[13px] text-[#64748B]">토핑 · 영양제</p>
              </div>
              <ul className="text-[14px] md:text-[15px] text-[#0F172A] space-y-2">
                <li>• 연어오일 1펌프 (오메가-3 보충)</li>
                <li>• 유산균 1포 (Lactobacillus + Bifido)</li>
                <li>• 간식 일일 30g 이내</li>
              </ul>
            </div>

            {/* 전환표 카드 */}
            {/* <div className="rounded-2xl border border-[#E5E7EB] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[18px]">📅</span>
                <p className="text-[13px] text-[#64748B]">7일 전환표</p>
              </div>
              <div className="space-y-2 text-[13px] md:text-[14px] text-[#0F172A]">
                <p>1일차: 신규 25% · 기존 75%</p>
                <p>3일차: 신규 50% · 기존 50%</p>
                <p>5일차: 신규 75% · 기존 25%</p>
                <p>7일차: 신규 100%</p>
              </div>
              <div className="mt-3 w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-gradient-to-r from-[#003DA5] to-[#4F8BFF]" />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* 모바일 스티키 CTA (모달 내 임베드 시 비활성화) */}
      {!embedded && (
        <div className="md:hidden fixed bottom-4 inset-x-0 px-4 z-[60]">
          <button
            onClick={goCheckout}
            className="w-full bg-[#003DA5] text-white py-4 rounded-2xl font-bold text-[17px] shadow-xl active:scale-[0.99]"
          >
            {dogName} 맞춤 리포트 받기
          </button>
        </div>
      )}
    </section>
  );
}


