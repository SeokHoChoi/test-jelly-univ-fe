import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import { Check } from 'lucide-react';

const PublicInfoSection = () => {
  const qualityGrades = [
    { title: '영양 정보 신뢰도', grade: 'A+' },
    { title: '영양 밸런스', grade: 'A+' },
    { title: '원료 품질', grade: 'A+' },
    { title: '제조 품질', grade: 'A+' },
  ];

  const detailedAssessments = [
    {
      title: '영양 정보 신뢰도',
      items: [
        { label: '성분표 정확성', grade: 'A+' },
        { label: '영양소 정보 완성도', grade: 'A' },
      ],
    },
    {
      title: '원료 품질',
      items: [
        { label: '원료 신선도', grade: 'A+' },
        { label: '원료 안전성', grade: 'A' },
      ],
    },
    {
      title: '제조 품질',
      items: [
        { label: '제조 공정', grade: 'A+' },
        { label: '품질 관리', grade: 'A' },
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Text variant="title" className="mb-4 text-gray-900">
            이 사료, 믿고 먹일 수 있을까?
          </Text>
          <Text variant="body" className="text-gray-600">
            현재 급여 제품이 냥구는 별개로 신뢰할 수 있는 제품인지 경기해요
          </Text>
        </div>

        {/* 제품명 */}
        <div className="text-center mb-8">
          <Text variant="subtitle" className="text-brand-blue">
            ZIWIPEAK 에어드라이 소고기
          </Text>
        </div>

        {/* 사료 품질 종합 평가 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Check className="w-6 h-6 text-green-500" />
            <Text variant="subtitle" className="text-lg">
              사료 품질 종합 평가
            </Text>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {qualityGrades.map((item, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-4xl font-bold text-brand-blue mb-2">
                  {item.grade}
                </div>
                <Text variant="body" className="text-sm text-gray-600">
                  {item.title}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        {/* 사료 품질 세부 평가 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Check className="w-6 h-6 text-green-500" />
            <Text variant="subtitle" className="text-lg">
              사료 품질 세부 평가
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detailedAssessments.map((assessment, index) => (
              <Card key={index} className="p-6">
                <Text variant="subtitle" className="text-lg mb-4">
                  {assessment.title}
                </Text>
                <div className="space-y-3">
                  {assessment.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <Text variant="body" className="text-sm">
                        {item.label}
                      </Text>
                      <div className="flex gap-2">
                        {['A+', 'A', 'B+', 'B'].map((grade) => (
                          <button
                            key={grade}
                            className={`px-3 py-1 rounded text-sm font-medium ${grade === item.grade
                              ? 'bg-brand-blue text-white'
                              : 'bg-gray-100 text-gray-600'
                              }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicInfoSection;
