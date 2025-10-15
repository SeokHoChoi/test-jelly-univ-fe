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
    <div
      className={cn('bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col justify-between w-full relative', className)}
      style={{
        aspectRatio: '230/190',
        padding: '14px 20px 10px 20px'
      }}
    >
      {/* 우측 상단 체크표시 */}
      <div className="absolute top-[18px] right-4 text-[#003DA5] text-[20px] transform rotate-90">
        ⎋
      </div>

      {title && (
        <p className="text-[18px] font-medium text-[#343434] h-[45px] leading-tight flex items-start pt-2" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          {title}
        </p>
      )}
      {grade ? (
        <div className="text-[60px] font-semibold text-[#003DA5] mt-[12px] md:mt-[45px]">{grade}</div>
      ) : (
        <div className="mt-[12px] md:mt-[45px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default EvalCard;


