'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * 냥구 페이지 - 장 건강의 중요성과 맞춤 식단 설계
 * 토스 스타일 UI로 구현
 */
export default function NyanguDietPage() {
  const router = useRouter();
  const [isNyanguDietOpen, setIsNyanguDietOpen] = useState(false);

  const goCheckout = () => {
    router.push('/checkout?plan=basic&dir=true&campaign=nyangu');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-gray-900 text-[15px]">
            장 건강의 비밀
          </h1>
          <div className="w-9" />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="pb-4">
        {/* ========== 섹션 1: 히어로 - 후킹 강화 ========== */}
        <section className="px-5 pt-12 pb-12 bg-white">
          <div className="max-w-2xl mx-auto text-left md:text-center">
            <div className="inline-block px-3 py-1 bg-[#F3F6FF] rounded-full mb-4">
              <span className="text-[13px] text-[#003DA5] font-bold">
                🫀 수의사가 말하는 건강 비결
              </span>
            </div>
            <h1 className="text-[28px] md:text-[40px] font-bold text-gray-900 leading-[1.3] tracking-[-0.02em] mb-4">
              강아지에게는 심장만큼 중요한
              <br />
              <span className="text-[#003DA5]">제2의 장기</span>가 있습니다
            </h1>
            <p className="text-[16px] md:text-[18px] text-gray-600 leading-[1.7]">
              하지만 90%의 보호자는
              <br />
              이 장기가 망가지는 줄도 모릅니다.
            </p>
            <div className="mt-8 flex md:justify-center animate-bounce">
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </section>

        {/* ========== 섹션 2: 장의 중요성 - 숫자 강조 ========== */}
        <section className="px-5 py-12 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[15px] text-gray-600 mb-2">면역 세포의</p>
              <p className="text-[60px] md:text-[80px] font-black text-[#003DA5] leading-none tracking-tight">
                70<span className="text-[30px] md:text-[40px] font-bold">%</span>
              </p>
              <p className="text-[18px] md:text-[20px] font-bold text-gray-900 mt-2">
                가 살고 있는 곳
              </p>
            </div>

            {/* 핵심 메시지 카드 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 text-center">
              <p className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-4">
                바로 <span className="text-[#003DA5]">&apos;장(Gut)&apos;</span>입니다
              </p>
              <div className="space-y-4 text-[15px] md:text-[16px] text-gray-600 leading-[1.7] text-left md:text-center">
                <p>
                  단순한 소화 기관이 아니에요.
                  <br className="hidden md:block" />{' '}
                  최신 수의학계에서는 <span className="font-bold text-gray-900">장 건강이 곧 전신 건강</span>이라고 말합니다.
                </p>
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-left md:text-center">
                  <p className="text-[14px] md:text-[15px] text-[#003DA5] font-medium">
                    &quot;아토피, 면역력, 심지어 성격까지...
                    <br className="md:hidden" />
                    모든 건강의 해답이 장에 있습니다.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 섹션 3: 증상 체크 ========== */}
        <section className="px-5 py-10 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight mb-3">
                혹시 우리 아이의 장은
                <br />
                <span className="text-[#003DA5]">안녕한가요?</span>
              </h2>
            </div>

            {/* 증상 탭 UI - 가로 한 줄 */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { emoji: '💩', text: '설사가 잦아요' },
                { emoji: '🐾', text: '피부가 가려워요' },
                { emoji: '😖', text: '부쩍 예민해요' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl py-4 px-2 border border-gray-200 shadow-sm flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-[28px]">{item.emoji}</span>
                  <span className="text-[13px] md:text-[14px] font-medium text-gray-700 leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            {/* 경고 메시지 */}
            <div className="bg-[#F3F6FF] border border-[#D0E2FF] rounded-xl p-5">
              <p className="text-[14px] md:text-[15px] text-[#003DA5] leading-[1.7]">
                <span className="font-bold">단순한 컨디션 난조가 아니에요.</span>
                <br />
                장이 무너져 보내는 <span className="font-bold">구조 신호</span>일 수 있어요!
              </p>
            </div>
          </div>
        </section>

        {/* ========== 섹션 4: 불균형 지수 - 게이지 바 형태로 시각화 ========== */}
        <section className="px-5 py-12 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight mb-4">
                이 위험, 이제는
                <br />
                <span className="text-[#003DA5]">눈으로 확인할 수 있습니다</span>
              </h2>
              <p className="text-[15px] text-gray-600">
                수의학에서는 <span className="font-bold">&apos;장내 미생물 불균형 지수&apos;</span>로
                <br />
                장 건강을 정확하게 수치화합니다.
              </p>
            </div>

            {/* 불균형 지수 게이지 카드 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              {/* 게이지 바 시각화 */}
              <div className="relative h-6 bg-gray-100 rounded-full mb-12 mt-4">
                {/* 구간 표시 */}
                <div className="absolute left-0 w-[20%] h-full bg-[#E0F2FE] rounded-l-full" />
                <div className="absolute left-[20%] w-[50%] h-full bg-[#F8FAFC]" />
                <div className="absolute right-0 w-[30%] h-full bg-[#FFE4E6] rounded-r-full" />

                {/* 구분선 및 라벨 */}
                <div className="absolute left-[20%] -top-2 bottom-0 w-0.5 bg-white">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[12px] font-bold text-[#003DA5]">
                    균형
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] text-gray-400">
                    -1
                  </div>
                </div>
                <div className="absolute left-[70%] -top-2 bottom-0 w-0.5 bg-white">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[12px] font-bold text-[#4B5563]">
                    보통
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] text-gray-400">
                    1.5
                  </div>
                </div>

                {/* 위험 구간 라벨 */}
                <div className="absolute right-2 -top-8 text-[12px] font-bold text-[#E11D48]">
                  불균형
                </div>

                {/* 현재 상태 포인터 (예시) */}
                <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E11D48] border-2 border-white rounded-full shadow-md z-10">
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#E11D48] text-white text-[11px] px-2 py-1 rounded whitespace-nowrap font-bold">
                    위험!
                  </div>
                </div>
              </div>

              {/* 수치 상세 설명 */}
              <div className="grid grid-cols-3 gap-2 text-center text-[13px]">
                <div className="p-2 rounded-lg bg-[#F0F9FF]">
                  <p className="text-gray-500 mb-1">균형</p>
                  <p className="font-bold text-[#003DA5]">&lt; -1</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC]">
                  <p className="text-gray-500 mb-1">보통</p>
                  <p className="font-bold text-[#4B5563]">-1 ~ 1.5</p>
                </div>
                <div className="p-2 rounded-lg bg-[#FFF1F2]">
                  <p className="text-gray-500 mb-1">불균형</p>
                  <p className="font-bold text-[#E11D48]">&gt; 1.5</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 섹션 5: 골든키 ========== */}
        <section className="px-5 py-10 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[14px] text-[#003DA5] font-semibold mb-2">🔑 건강의 핵심</p>
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight">
                우리 아이 건강의 골든 키
                <br />
                <span className="text-[#003DA5]">장내 미생물 균형</span>
              </h2>
            </div>

            {/* detail.png 이미지 */}
            <div className="rounded-2xl overflow-hidden mb-8 border border-gray-200 bg-white">
              <img
                src="/img/nyangu-page/detail.png"
                alt="장내 미생물 균형 상세"
                className="w-full h-auto"
              />
            </div>

            {/* 설명 */}
            <div className="space-y-6 text-[16px] text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">장내 미생물 균형이 무너지면 어떤 일이 일어날까요?</span>
                <br />
                단순히 배탈이 나는 게 끝이 아니에요.
              </p>
              <p>
                장벽이 뚫리면 독소가 혈관으로 그대로 들어가요.
                <br />
                그렇게 온몸에 염증이 퍼지고, 면역 체계가 흔들리기 시작합니다.
              </p>
            </div>

            {/* 핵심 메시지 */}
            <div className="mt-8 rounded-2xl p-5 text-center border border-gray-200 bg-white">
              <p className="text-[16px] md:text-[18px] font-semibold text-gray-900 leading-snug">
                즉, 장은 우리 아이 몸을 지키는
                <br />
                <span className="text-[#003DA5]">제1의 방어선</span>이자, <span className="text-[#003DA5]">제2의 뇌</span>입니다.
              </p>
            </div>
          </div>
        </section>

        {/* ========== 섹션 6: 3가지 축 카드 ========== */}
        <section className="px-5 py-10 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* 카드 1: 장-면역 축 */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-[#F3F6FF] flex items-center justify-center">
                      <img
                        src="/img/nyangu-page/stomach.png"
                        alt="장-면역 축"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#003DA5] font-semibold mb-1">면역의 최전선</p>
                      <p className="text-[18px] font-bold text-gray-900">장-면역 축</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-gray-500">
                    원인 모를 알러지와 만성 염증의 시작
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[15px] font-semibold text-gray-900 mb-2">
                      &quot;면역 세포 70%가 사는 거대한 성벽&quot;
                    </p>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      장은 영양분은 흡수하고, 나쁜 세균은 막아내는 촘촘한 그물망 구조로 되어있어요.
                    </p>
                  </div>
                  <p className="text-[14px] text-[#003DA5] leading-relaxed">
                    <span className="font-semibold">하지만 식단 불균형으로 이 장벽이 뚫리면?</span>
                    <br />
                    세균과 독소가 혈관으로 그대로 침투합니다.
                  </p>
                </div>
              </div>

              {/* 카드 2: 장-뇌 축 */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-[#F3F6FF] flex items-center justify-center">
                      <img
                        src="/img/nyangu-page/brain.png"
                        alt="장-뇌 축"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#003DA5] font-semibold mb-1">제2의 뇌</p>
                      <p className="text-[18px] font-bold text-gray-900">장-뇌 축</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-gray-500">
                    분리불안, 인지 기능 저하의 시작
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[15px] font-semibold text-gray-900 mb-2">
                      &quot;뇌를 조종하는 행복 호르몬 공장&quot;
                    </p>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      장과 뇌는 서로 &apos;직통&apos;으로 연결되어 있어요.
                      <br />
                      심리 안정을 돕는 &apos;세로토닌&apos;의 90%가 장에서 만들어집니다.
                    </p>
                  </div>
                  <p className="text-[14px] text-[#003DA5] leading-relaxed">
                    <span className="font-semibold">장내 미생물 균형이 깨지면?</span>
                    <br />
                    뇌로 가는 행복 신호가 끊깁니다.
                  </p>
                </div>
              </div>

              {/* 카드 3: 장-신장/피부 축 */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-[#F3F6FF] flex items-center justify-center">
                      <img
                        src="/img/nyangu-page/detoxification.png"
                        alt="장-신장/피부 축"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#003DA5] font-semibold mb-1">전신 해독기</p>
                      <p className="text-[18px] font-bold text-gray-900">장-신장/피부 축</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-gray-500">
                    신부전 악화, 만성 피부병·귓병의 시작
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[15px] font-semibold text-gray-900 mb-2">
                      &quot;독소를 걸러내는 1차 방어선&quot;
                    </p>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                      장은 몸의 하수처리장이에요.
                      <br />
                      독소를 대변으로 배출해 다른 장기를 보호합니다.
                    </p>
                  </div>
                  <p className="text-[14px] text-[#003DA5] leading-relaxed">
                    <span className="font-semibold">하지만 장에서 못 거른 독소가 혈액을 타고 돌면?</span>
                    <br />
                    신장이 떠안거나 피부로 터져 나옵니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 섹션 7: 냥구 스토리 ========== */}
        <section className="px-5 py-16 bg-gradient-to-b from-[#003DA5] to-[#002A7A]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[14px] text-[#93C5FD] font-semibold mb-4">🏆 실제 케이스</p>
            <h2 className="text-[28px] md:text-[32px] font-bold text-white leading-tight mb-4">
              407마리 중 단 4마리
              <br />
              냥구가 증명했습니다
            </h2>
            <p className="text-[16px] text-[#BFDBFE] leading-relaxed mb-8">
              치열한 경쟁률을 뚫고 &apos;장 건강 상위 1%&apos;
              <br />
              변 공여견으로 당당히 선발된 냥구가 있습니다.
            </p>

            {/* 변 공여견 설명 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-8 text-left">
              <p className="text-[13px] text-[#93C5FD] font-semibold mb-2">*변 공여견이란?</p>
              <p className="text-[14px] text-white/90 leading-relaxed">
                장 질환을 겪는 아픈 강아지에게 이식할 건강한 미생물을 제공하는 강아지예요.
              </p>
            </div>

            <div className="space-y-4 text-[16px] text-white/90 leading-relaxed text-left">
              <p>
                건강한 분변 이식(FMT)은 무너진 장 생태계를 복원하는 강력한 치료법입니다.
              </p>
              <p className="font-semibold text-white">
                즉, 냥구의 장은 그 자체로 &apos;치료제&apos;로 쓰일 만큼 완벽하다는 의미예요.
              </p>
            </div>
          </div>
        </section>

        {/* ========== 섹션 8: 냥구의 비결 ========== */}
        <section className="px-5 py-16 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 leading-tight mb-3">
                냥구의 건강한 장의 비결은?
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                비싼 &apos;프리미엄 사료&apos;가 아니에요.
                <br />
                바로 <span className="font-semibold text-[#003DA5]">냥구의 상태에 꼭 맞는 맞춤 식단</span>에 있습니다.
              </p>
            </div>

            {/* 냥구 식단 토글 */}
            <button
              onClick={() => setIsNyanguDietOpen(!isNyanguDietOpen)}
              className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-5 border border-gray-200 transition-colors flex items-center justify-between"
            >
              <span className="text-[16px] font-semibold text-[#003DA5]">
                냥구의 식단 구경하기
              </span>
              {isNyanguDietOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* 토글 콘텐츠 */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isNyanguDietOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-6">
                {/* 아침 */}
                <div>
                  <p className="text-[14px] font-semibold text-gray-900 mb-3">🌞 아침 08:00</p>
                  <div className="space-y-2 text-[14px] text-gray-700">
                    <p><span className="font-medium">주식:</span> 아카나 라이트 앤 피트 레시피 50g + 디어니스트키친 탈수건조 그레인프리 피쉬 11g</p>
                    <p><span className="font-medium">보조식:</span> 쥬쥬그린 저스트 그린 블랜드 1 테이블스푼</p>
                    <p><span className="font-medium">영양제:</span> 프로바이오틱스 1알, 오메가3 2알</p>
                  </div>
                </div>
                {/* 저녁 */}
                <div>
                  <p className="text-[14px] font-semibold text-gray-900 mb-3">🌚 저녁 19:00</p>
                  <div className="space-y-2 text-[14px] text-gray-700">
                    <p><span className="font-medium">주식:</span> 아카나 라이트 앤 피트 레시피 50g + 디어니스트키친 탈수건조 그레인프리 피쉬 11g</p>
                    <p><span className="font-medium">보조식:</span> 습식 사료 또는 락토프리 요거트 약 10g</p>
                  </div>
                </div>
                {/* 급여 정보 */}
                <div className="bg-white rounded-lg p-4">
                  <p className="text-[13px] text-gray-600">
                    <span className="font-semibold text-gray-900">하루 급여량:</span> 120g |{' '}
                    <span className="font-semibold text-gray-900">목표 칼로리:</span> 451~632kcal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 섹션 9: 주의 메시지 ========== */}
        <section className="px-5 py-12 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[14px] text-[#003DA5] font-semibold mb-3">⚠️ 잠깐!</p>
              <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900 leading-tight">
                냥구에게 좋은 식단 ≠
                <br />
                우리 아이에게 좋은 식단
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <ul className="space-y-3 text-[15px] text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>나이가 다르고</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>체중이 다르고</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>활동량이 다르고</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>알레르기, 건강 고민이 다르고</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>심지어 사는 환경까지 다른데</span>
                </li>
              </ul>
              <p className="text-[15px] text-gray-700 mt-4">
                어떻게 같은 식단이 모든 아이에게 맞을 수 있을까요?
              </p>
            </div>

            <div className="bg-[#003DA5] rounded-xl p-5 text-center">
              <p className="text-[16px] md:text-[18px] font-bold text-white leading-snug">
                ⚠️ 기억하세요!
                <br />
                좋은 식단은 없습니다. <span className="text-[#BFDBFE]">맞는 식단</span>만 있을 뿐!
              </p>
            </div>
          </div>
        </section>

        {/* ========== 섹션 10: 젤리대학교 소개 ========== */}
        <section className="px-5 py-16 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[14px] text-[#003DA5] font-semibold mb-3">🎓 젤리대학교</p>
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight mb-3">
                젤리대학교에서
                <br />
                우리 아이의 <span className="text-[#003DA5]">건강 성적표</span>를 바꿔주세요
              </h2>
              <p className="text-[15px] text-gray-600">
                글로벌 수의영양학 데이터 기준으로
                <br />
                우리 아이의 상태에 꼭 맞는 식단을 설계해드립니다.
              </p>
            </div>

            {/* 3원칙 헤더 */}
            <div className="text-left mb-6">
              <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-1">
                젤리대학교 식단 설계 3원칙
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#003DA5]">
                이건 단순한 &quot;좋은 사료 추천&quot;이 아니에요.
              </p>
            </div>

            {/* 상단 원형 3개 - 피그마 구조 반영 */}
            <div className="mb-8 rounded-2xl bg-[#F5F7FB] px-4 py-8 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16">
                <div className="flex items-center justify-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <p className="text-center text-[13px] md:text-[15px] font-semibold text-[#003DA5] leading-snug">
                      국제 표준
                      <br />
                      영양 검증
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#DBEAFE] flex items-center justify-center shadow-sm">
                    <p className="text-center text-[13px] md:text-[15px] font-semibold text-[#1E3A8A] leading-snug">
                      개체별
                      <br />
                      맞춤 데이터 설계
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#003DA5] flex items-center justify-center shadow-sm">
                    <p className="text-center text-[13px] md:text-[15px] font-semibold text-white leading-snug">
                      AI + 수의사
                      <br />
                      이중 검증
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3원칙 상세 설명 - 3컬럼 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 국제 표준 영양 검증 */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-[14px] font-semibold text-gray-900 mb-2">국제 표준 영양 검증</p>
                <p className="text-[14px] text-gray-600 mb-3">
                  AAFCO·FEDIAF·NRC 기준으로 사료의 영양 적절성을 분석합니다.
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#003DA5]" />
                  <p className="text-[13px] text-[#003DA5] leading-relaxed">
                    보호자가 해석하기 어려운 사료 라벨을 저희가 해석하여 검증해요.
                  </p>
                </div>
              </div>

              {/* 개체별 맞춤 데이터 설계 */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-[14px] font-semibold text-gray-900 mb-2">개체별 맞춤 데이터 설계</p>
                <p className="text-[14px] text-gray-600 mb-3">
                  나이·체중·활동량·중성화 여부 등을 반영한 맞춤 목표량과 급여량을 산출합니다.
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#003DA5]" />
                  <p className="text-[13px] text-[#003DA5] leading-relaxed">
                    보호자가 직접 계산하기 어려운 수의영양학 데이터를 바탕으로 설계해요.
                  </p>
                </div>
              </div>

              {/* AI + 수의사 이중 검증 */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-[14px] font-semibold text-gray-900 mb-2">AI + 수의사 이중 검증</p>
                <p className="text-[14px] text-gray-600 mb-3">
                  AI 분석 후 수의영양학 전문 수의사의 검토를 거쳐 리포트를 발행합니다.
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#003DA5]" />
                  <p className="text-[13px] text-[#003DA5] leading-relaxed">
                    AI가 빠르게 설계하고, 전문가가 꼼꼼하게 검증합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 섹션 11: 마지막 CTA ========== */}
        <section className="px-5 py-10 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight mb-4">
              더이상 감으로 먹이지 마세요
              <br />
              이제 우리 아이에게 <span className="text-[#003DA5]">딱 맞게</span> 먹이세요.
            </h2>
          </div>
        </section>

        {/* ========== 섹션 12: 참고문헌 ========== */}
        <section className="px-5 py-8 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <p className="text-[12px] font-semibold text-gray-500 mb-4">참고문헌</p>
            <div className="text-[11px] text-gray-400 leading-relaxed space-y-1">
              <p>[1] Turner, J.R. (2009). Intestinal mucosal barrier function in health and disease. Nature Reviews Immunology.</p>
              <p>[2] Cerutti, A. &amp; Rescigno, M. (2008). The biology of intestinal immunoglobulin A responses. Immunity.</p>
              <p>[3] O&apos;Hara &amp; Shanahan (2006). The gut flora as a forgotten organ. EMBO Reports.</p>
              <p>[4] Royal Canin Academy — Canine Microbiome Dysbiosis.</p>
              <p>[5] Suchodolski JS. (2016). Intestinal microbiota of dogs and cats: a bigger world than we think. Veterinary Clinics of North America.</p>
              <p>[6] Pilla &amp; Suchodolski (2020). The role of the canine gut microbiome and metabolome in health and disease. Animals.</p>
              <p>[7] Guard et al. (2017). Characterization of dysbiosis in dogs with chronic enteropathy. Journal of Veterinary Internal Medicine.</p>
              <p>[8] AlShawaqfeh MK et al. (2017). A dysbiosis index to assess microbial changes in fecal samples of dogs with chronic enteropathy. FEMS Microbiology Ecology.</p>
              <p>[9] Suchodolski JS et al. (2020). Analysis of the gut microbiome in dogs and cats. Veterinary Clinical Pathology.</p>
              <p>[10] Levy et al. (2017). The effect of diet on the canine intestinal microbiome. British Journal of Nutrition.</p>
              <p>[11] Sandri et al. (2017). Influence of diet on gut microbiota in dogs. PLOS ONE.</p>
              <p>[12] Cuscó et al. (2017). Microbiota profiling in healthy dogs. PLOS ONE.</p>
              <p>[13] Isaacson &amp; Kim (2012). The intestinal microbiome: A diet-responsive metabolic organ. Current Opinion in Gastroenterology.</p>
              <p>[14] Pilla &amp; Suchodolski (2019). The Gut Microbiome: Disorders and Dietary Management. Veterinary Clinics of North America.</p>
              <p>[15] Hildebrandt et al. (2019). Individualized diet-microbiome interactions. Cell.</p>
              <p>[16] Weese &amp; Costa (2017). Gut microbiota: a target for nutritional intervention. Journal of Small Animal Practice.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ========== 플로팅 CTA 버튼 ========== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={goCheckout}
            className="w-full bg-[#003DA5] hover:bg-[#002A7A] active:scale-[0.98] text-white py-4 rounded-xl font-bold text-[17px] transition-all shadow-lg shadow-[#003DA5]/20"
          >
            우리 아이 맞춤 식단 설계하기
          </button>
          <p className="text-center text-[12px] text-gray-500 mt-2">
            우리 아이의 장 건강을 위해
          </p>
        </div>
      </div>
    </div>
  );
}
