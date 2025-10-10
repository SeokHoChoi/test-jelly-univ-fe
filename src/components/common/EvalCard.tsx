'use client';

import { cn } from '@/utils/cn';

interface EvalCardProps {
  title?: string;
  grade?: string;
  children?: React.ReactNode;
  className?: string;
}

const EvalCard = ({ title, grade, children, className }: EvalCardProps) => {
  return (
    <div className={cn('bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]', className)}>
      {title && (
        <p className="text-[14px] text-gray-500 mb-2 flex items-center gap-2">
          {title}
        </p>
      )}
      {grade ? (
        <div className="text-[48px] font-bold text-[#003DA5]">{grade}</div>
      ) : (
        children
      )}
    </div>
  );
};

export default EvalCard;


