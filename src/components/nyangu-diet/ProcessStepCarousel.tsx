'use client';

import { useState } from 'react';
import AccordionItem from './AccordionItem';

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface ProcessStepCarouselProps {
  steps: ProcessStep[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

export default function ProcessStepCarousel({ steps, activeStep, onStepChange }: ProcessStepCarouselProps) {
  const activeStepData = steps.find((s) => s.id === activeStep);

  return (
    <div className="w-full">
      {/* 단계 버튼들 - 4단계 프로세스 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`px-3 py-3 md:px-4 md:py-3 rounded-xl text-[12px] md:text-[14px] font-semibold transition-all text-left ${activeStep === step.id
                ? 'bg-[#003DA5] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <div className="font-bold mb-1">{step.title}</div>
            <div className={`text-[10px] md:text-[11px] ${activeStep === step.id ? 'opacity-90' : 'opacity-70'}`}>
              {step.subtitle}
            </div>
          </button>
        ))}
      </div>

      {/* 활성 단계 콘텐츠 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 lg:p-10 min-h-[400px]">
        {activeStepData && (
          <>
            <div className="mb-6">
              <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#003DA5] mb-2">
                {activeStepData.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-gray-600">
                {activeStepData.subtitle}
              </p>
            </div>
            <div className="mt-6">
              {activeStepData.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

