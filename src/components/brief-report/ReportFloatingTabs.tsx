'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'food-analysis', label: '사료 분석' },
  { id: 'pet-suitability', label: '맞춤 분석' },
  { id: 'diet-report', label: '식단 설계' },
];

const ReportFloatingTabs = () => {
  const [activeId, setActiveId] = useState<string>('food-analysis');
  const suppressUntilRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateActiveByScroll = () => {
      // 프로그램적으로 스크롤 중에는 활성 탭을 스크롤로 변경하지 않음 (중간 섹션 깜빡임 방지)
      if (Date.now() < suppressUntilRef.current) return;
      const offset = window.innerWidth < 768 ? 100 : 140; // 위치 하향 보정
      let currentId = activeId;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0 && rect.bottom - offset > 0) {
          currentId = id;
          break;
        }
      }
      if (currentId !== activeId) setActiveId(currentId);
    };

    updateActiveByScroll();
    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    window.addEventListener('resize', updateActiveByScroll);
    return () => {
      window.removeEventListener('scroll', updateActiveByScroll);
      window.removeEventListener('resize', updateActiveByScroll);
    };
  }, [activeId]);

  // 스크롤 이동 함수는 현재 UI에서 사용되지 않습니다.

  return null;
};

export default ReportFloatingTabs;


