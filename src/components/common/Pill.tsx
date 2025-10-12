'use client';

import { cn } from '@/utils/cn';

interface PillProps {
  children: React.ReactNode;
  color?: 'blue' | 'gray' | 'green' | 'yellow';
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-50 text-[#003DA5]',
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-50 text-green-700',
  yellow: 'bg-yellow-50 text-yellow-700',
};

const Pill = ({ children, color = 'blue', className }: PillProps) => {
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', colorMap[color], className)}>
      {children}
    </span>
  );
};

export default Pill;


