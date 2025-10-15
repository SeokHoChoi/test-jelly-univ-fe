'use client';

import { ReactNode } from 'react';

interface ReportCardContentProps {
  children: ReactNode;
  className?: string;
}

const ReportCardContent = ({ children, className = '' }: ReportCardContentProps) => {
  return (
    <div className={`text-[#343434] font-normal text-[20px] leading-snug break-words ${className}`}>
      {children}
    </div>
  );
};

export default ReportCardContent;
