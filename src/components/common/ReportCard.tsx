'use client';

import { ReactNode } from 'react';

interface ReportCardProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
}

const ReportCard = ({ children, className = '', backgroundColor = '#FFFFFF' }: ReportCardProps) => {
  return (
    <div
      className={`rounded-[20px] py-[36px] md:py-[33px] px-[18.5px] md:px-[36px] ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

export default ReportCard;
