'use client';

interface RatingBarProps {
  label: string;
  selectedGrade: string;
  orderNumber?: string;
}

const RatingBar = ({ label, selectedGrade, orderNumber }: RatingBarProps) => {
  const grades = [
    { value: 'A+', label: '최상' },
    { value: 'A', label: '우수' },
    { value: 'B+', label: '양호' },
    { value: 'B', label: '기본' },
  ];

  return (
    <div className="relative">
      {/* 모바일에서 위에 표시되는 타이틀 */}
      <div className="md:hidden mb-5">
        <h5 className="text-[13px] font-medium text-[#003DA5] text-center">
          {orderNumber && `${orderNumber} `}{label}
        </h5>
      </div>

      {/* 메인 바 컨테이너 */}
      <div
        className="bg-white rounded-[40px] md:rounded-[80px] flex flex-row items-center justify-between relative overflow-visible py-[8px] px-[4px] md:py-[10px] md:pl-[20px] md:pr-[39px]"
        style={{
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* 왼쪽 라벨 - 데스크톱에서만 표시 */}
        <span className="hidden md:block text-[12px] md:text-[17px] font-bold text-[#003DA5] leading-tight whitespace-pre-line text-center w-[90px] md:w-[110px] md:flex-shrink-0">
          {label}
        </span>

        {/* 등급들 */}
        <div className="flex items-center justify-center w-full md:w-auto">
          {grades.map((grade, index) => {
            const isSelected = selectedGrade === grade.value;
            const prevGrade = grades[index - 1];
            const nextGrade = grades[index + 1];
            const prevIsSelected = prevGrade && selectedGrade === prevGrade.value;
            const nextIsSelected = nextGrade && selectedGrade === nextGrade.value;

            // 간격 계산 - 모바일에서 더 작은 간격으로 조정
            let marginLeft = '';
            if (index === 0) {
              marginLeft = 'ml-0';
            } else if (isSelected || prevIsSelected || nextIsSelected) {
              marginLeft = 'ml-[14px] md:ml-[12px]'; // 선택된 등급과 인접한 경우
            } else {
              marginLeft = 'ml-[16px] md:ml-[10px]'; // 선택되지 않은 등급들 간격 (더 작게)
            }

            return (
              <div key={grade.value} className={`relative ${marginLeft}`}>
                {/* 선택된 등급의 파란 배지 (하얀 배지 위에) */}
                {selectedGrade === grade.value && (
                  <div
                    className="absolute bg-[#003DA5] rounded-full z-30 flex flex-col justify-center items-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) scale(1.1)',
                      width: '55px',
                      height: '80px',
                      boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <div className="text-white text-[14px] md:text-[12px] font-normal mb-[3px] md:mb-[8px] whitespace-nowrap">{grade.label}</div>
                    <div className="text-white text-[24px] md:text-[25px] font-normal whitespace-nowrap relative" style={{ transform: 'translateY(2px)', letterSpacing: '-0.1em' }}>
                      {grade.value}
                    </div>
                  </div>
                )}

                {/* 등급 텍스트 - 세로 배치 (하얀 배지) */}
                <div
                  className={`relative z-20 px-2 py-1 md:px-3 rounded-full text-center leading-tight ${selectedGrade === grade.value
                    ? 'text-transparent'
                    : 'text-[#848484]'
                    }`}
                >
                  <div className="text-[14px] md:text-[12px] font-normal mb-[3px] md:mb-[8px] whitespace-nowrap">{grade.label}</div>
                  <div className={`text-[24px] md:text-[25px] font-normal whitespace-nowrap ${selectedGrade === grade.value ? 'text-transparent' : 'text-[#000000]'} relative`} style={{ transform: 'translateY(2px)', letterSpacing: '-0.1em' }}>
                    {grade.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingBar;
