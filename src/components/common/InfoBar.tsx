'use client';

import { cn } from '@/utils/cn';

interface InfoBarProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const InfoBar = ({ icon, children, className }: InfoBarProps) => {
  return (
    <div className={cn('w-full bg-white rounded-[16px] px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100', className)}>
      {icon && <div className="mb-2">{icon}</div>}
      <div className="text-[14px] text-gray-600 leading-relaxed space-y-[10px]">{children}</div>
    </div>
  );
};

export default InfoBar;


