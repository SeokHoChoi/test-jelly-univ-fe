'use client';

import { cn } from '@/utils/cn';

interface PillProps {
  children: React.ReactNode;
  color?: 'blue' | 'gray' | 'green' | 'yellow';
  className?: string;
}

const colorMap = {
  blue: 'bg-[#003DA5] text-white',
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-50 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-700',
};

const Pill = ({ children, color = 'blue', className }: PillProps) => {
  return (
    <span className={cn('inline-flex items-center rounded-full text-[15px] font-medium', colorMap[color], className)} style={{ padding: '12px' }}>
      {children}
    </span>
  );
};

export default Pill;


