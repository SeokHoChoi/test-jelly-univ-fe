'use client';

interface NutrientItemProps {
  name: string;
  value: string;
  percentage?: string;
  type: 'simple' | 'complex';
}

const NutrientItem = ({ name, value, percentage, type }: NutrientItemProps) => {
  if (type === 'simple') {
    // 섭취량, 칼로리 타입 - 단순한 노란색 배지
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-[14px] sm:text-[17px] font-normal text-[#000000] flex-1 min-w-0 break-words">{name}</span>
        <div className="bg-[#FFB800] text-[#343434] text-[14px] sm:text-[17px] font-medium h-[36px] w-[90px] sm:h-[42px] sm:w-[107px] rounded-full flex items-center justify-center flex-shrink-0">
          {value}
        </div>
      </div>
    );
  }

  // 단백질, 지방, 탄수화물 타입 - 복잡한 구조 (보더 + 원형 배지)
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[14px] sm:text-[17px] font-normal text-[#000000] flex-1 min-w-0 break-words">{name}</span>
      <div className="border border-[#000000] h-[36px] w-[90px] sm:h-[42px] sm:w-[107px] rounded-full flex items-center relative flex-shrink-0">
        <span
          className="text-[#000000] text-[14px] sm:text-[17px] font-medium absolute"
          style={{ right: 'calc(30px + 3px + 8px)' }}
        >
          {value}
        </span>
        <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] bg-[#F7623E] rounded-full flex items-center justify-center absolute right-[3px]">
          <span className="text-white text-[8px] sm:text-[10px] font-light">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default NutrientItem;
