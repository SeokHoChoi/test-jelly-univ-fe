'use client';

import { twMerge } from 'tailwind-merge';

interface ReportCardHeaderProps {
  emoji: string;
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  titleSubtitleGap?: string;
}

const ReportCardHeader = ({
  emoji,
  title,
  subtitle,
  titleColor = '#1E1E1E',
  subtitleColor = '#525252',
  titleSize = '25px',
  subtitleSize = '18px',
  titleSubtitleGap = '8px'
}: ReportCardHeaderProps) => {
  // 색상에 따른 Tailwind 클래스 매핑
  const getColorClass = (color: string) => {
    switch (color) {
      case '#FFFFFF':
        return 'text-white';
      case '#F2F2F2':
        return 'text-[#F2F2F2]';
      case '#525252':
        return 'text-[#525252]';
      case '#1E1E1E':
        return 'text-[#1E1E1E]';
      default:
        return `text-[${color}]`;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-[4px]">
        <span className="text-2xl">{emoji}</span>
        <h2
          className={twMerge(
            "font-medium",
            getColorClass(titleColor)
          )}
          style={{ fontSize: titleSize }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={twMerge(
            "font-normal ml-[32px]",
            getColorClass(subtitleColor)
          )}
          style={{ fontSize: subtitleSize, marginTop: titleSubtitleGap }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ReportCardHeader;
