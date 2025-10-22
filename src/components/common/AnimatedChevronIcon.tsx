'use client';

import React from 'react';

interface AnimatedChevronIconProps {
  className?: string;
  size?: number;
}

const AnimatedChevronIcon: React.FC<AnimatedChevronIconProps> = ({
  className = "w-4 h-4",
  size = 16
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* 원형 배경 */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="opacity-20"
      />

      {/* 애니메이션 화살표 */}
      <g>
        {/* 첫 번째 화살표 */}
        <path
          d="M12 6 L12 18 M12 18 L8 14 M12 18 L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,3; 0,0"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            additive="sum"
            type="scale"
            values="1,1; 1,0.7; 1,1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* 두 번째 화살표 (약간의 지연) */}
        <path
          d="M12 8 L12 16 M12 16 L9 13 M12 16 L15 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,2; 0,0"
            dur="1.2s"
            begin="0.1s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            additive="sum"
            type="scale"
            values="1,1; 1,0.8; 1,1"
            dur="1.2s"
            begin="0.1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
};

export default AnimatedChevronIcon;
