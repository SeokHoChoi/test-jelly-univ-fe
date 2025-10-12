'use client';

import { ReactNode } from 'react';

interface NutrientAnalysisPanelProps {
  title: string;
  backgroundColor: string;
  textColor: string;
  children: ReactNode;
  className?: string;
}

const NutrientAnalysisPanel = ({
  title,
  backgroundColor,
  textColor,
  children,
  className = ''
}: NutrientAnalysisPanelProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div
        className="rounded-lg w-[48px] h-[146px] flex items-center justify-center"
        style={{ backgroundColor }}
      >
        <span
          className="font-medium text-[20px] vertical-text"
          style={{ color: textColor }}
        >
          {title}
        </span>
      </div>
      <div className="bg-white rounded-lg w-[441px] h-[174px] py-[14px] px-[27px] ml-[11px]">
        {children}
      </div>
    </div>
  );
};

export default NutrientAnalysisPanel;
