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
      <div className="flex items-center justify-between">
        <span className="text-[17px] font-normal text-[#000000]">{name}</span>
        <div className="bg-[#FFB800] text-[#343434] text-[17px] font-medium h-[42px] w-[107px] rounded-full flex items-center justify-center">
          {value}
        </div>
      </div>
    );
  }

  // 단백질, 지방, 탄수화물 타입 - 복잡한 구조 (보더 + 원형 배지)
  return (
    <div className="flex items-center justify-between">
      <span className="text-[17px] font-normal text-[#000000]">{name}</span>
      <div className="border border-[#000000] h-[42px] w-[107px] rounded-full flex items-center relative">
        <span
          className="text-[#000000] text-[17px] font-medium absolute"
          style={{ right: 'calc(35px + 3px + 10px)' }}
        >
          {value}
        </span>
        <div className="w-[35px] h-[35px] bg-[#F7623E] rounded-full flex items-center justify-center absolute right-[3px]">
          <span className="text-white text-[10px] font-light">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default NutrientItem;
