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
    <div className={`flex flex-col sm:flex-row items-center ${className}`}>
      <div
        className="rounded-lg w-full h-[40px] sm:w-[48px] sm:min-h-[146px] flex items-center justify-center flex-shrink-0 sm:flex-shrink-0"
        style={{ backgroundColor }}
      >
        <span
          className="font-medium text-[16px] sm:text-[20px] rotate-0 sm:-rotate-90"
          style={{
            color: textColor,
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </span>
      </div>
      <div className="bg-white rounded-[15px] w-full sm:w-[441px] min-h-[174px] py-[12px] px-[20px] sm:py-[14px] sm:px-[27px] mt-[8px] sm:mt-0 sm:ml-[11px]">
        {children}
      </div>
    </div>
  );
};

export default NutrientAnalysisPanel;
