'use client';

interface RatingBarProps {
  label: string;
  selectedGrade: string;
}

const RatingBar = ({ label, selectedGrade }: RatingBarProps) => {
  const grades = [
    { value: 'A+', label: '최상' },
    { value: 'A', label: '우수' },
    { value: 'B+', label: '양호' },
    { value: 'B', label: '기본' },
  ];

  return (
    <div className="relative">
      {/* 메인 바 컨테이너 */}
      <div
        className="bg-white rounded-[40px] md:rounded-[80px] flex flex-col md:flex-row items-center relative overflow-visible py-[8px] px-[12px] md:py-[10px] md:px-[39px] gap-[20px] md:gap-[50px]"
        style={{
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* 왼쪽 라벨 */}
        <span className="text-[12px] md:text-[15px] font-bold text-[#003DA5] leading-tight whitespace-pre-line text-center w-full md:w-auto md:flex-shrink-0">
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

            // 간격 계산 - 더 작은 간격으로 조정
            let marginLeft = '';
            if (index === 0) {
              marginLeft = 'ml-0';
            } else if (isSelected || prevIsSelected || nextIsSelected) {
              marginLeft = 'ml-[8px] md:ml-[15px]'; // 선택된 등급과 인접한 경우
            } else {
              marginLeft = 'ml-[8px] md:ml-[12px]'; // 선택되지 않은 등급들 간격 (더 작게)
            }

            return (
              <div key={grade.value} className={`relative ${marginLeft}`}>
                {/* 선택된 등급의 강조 표시 (카드를 벗어나서) */}
                {selectedGrade === grade.value && (
                  <div
                    className="absolute bg-[#003DA5] rounded-full z-10"
                    style={{
                      width: '60px',
                      height: '89px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                )}

                {/* 등급 텍스트 - 세로 배치 */}
                <div
                  className={`relative z-20 px-2 py-1 md:px-3 rounded-full text-center leading-tight ${selectedGrade === grade.value
                    ? 'text-white'
                    : 'text-[#848484]'
                    }`}
                >
                  <div className="text-[10px] md:text-[12px] font-normal mb-[4px] md:mb-[8px] whitespace-nowrap">{grade.label}</div>
                  <div className={`text-[16px] md:text-[25px] font-normal whitespace-nowrap ${selectedGrade === grade.value ? 'text-white' : 'text-[#000000]'} relative`} style={{ transform: 'translateY(5px)', letterSpacing: '-0.1em' }}>
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
