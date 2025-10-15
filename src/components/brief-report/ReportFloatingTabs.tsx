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

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    // 클릭 즉시 상태 반영
    setActiveId(targetId);
    // 상단 고정 탭 높이만큼 오프셋 보정
    const offset = window.innerWidth < 768 ? 100 : 140; // 위치 하향 보정
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    // 스크롤 진행 중에는 스크롤 이벤트가 상태를 덮어쓰지 않도록 억제
    suppressUntilRef.current = Date.now() + 700; // 700ms 동안 억제
    window.scrollTo({ top: y, behavior: 'smooth' });
    // 억제 해제 후 최종 위치 기준으로 한 번 더 동기화
    window.setTimeout(() => {
      suppressUntilRef.current = 0;
      // 스크롤 종점에서 활성 섹션 재계산
      const offset2 = window.innerWidth < 768 ? 100 : 140;
      for (const { id } of sections) {
        const el2 = document.getElementById(id);
        if (!el2) continue;
        const rect2 = el2.getBoundingClientRect();
        if (rect2.top - offset2 <= 0 && rect2.bottom - offset2 > 0) {
          setActiveId(id);
          break;
        }
      }
    }, 750);
  };

  return null;
};

export default ReportFloatingTabs;


