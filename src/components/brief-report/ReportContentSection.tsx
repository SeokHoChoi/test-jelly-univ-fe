import Text from '@/components/common/Text';
import Card from '@/components/common/Card';
import BlurOverlay from '@/components/common/BlurOverlay';
import { Shield, Target, TrendingUp } from 'lucide-react';

interface ReportContentSectionProps {
  blurLevel?: 'sm' | 'md' | 'lg' | 'xl';
}

const ReportContentSection = ({
  blurLevel = 'lg'
}: ReportContentSectionProps) => {

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Text variant="title" className="mb-2 text-gray-900">
            Current Diet Report
          </Text>
          <Text variant="subtitle" className="text-brand-blue">
            하이를 위한 현재 식단 분석 리포트
          </Text>
        </div>

        {/* 반려견 이미지 */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🐕</span>
          </div>
        </div>

        <BlurOverlay blurLevel={blurLevel}>
          <div className="space-y-8">
            {/* 반려견 기본 정보 */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                냥구는요
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Text variant="body" className="font-medium">나이</Text>
                  <Text variant="subtitle" className="text-brand-blue">1년 2개월</Text>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Text variant="body" className="font-medium">체중</Text>
                  <Text variant="subtitle" className="text-brand-blue">10kg</Text>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Text variant="body" className="font-medium">중성화 여부</Text>
                  <Text variant="subtitle" className="text-brand-blue">완료</Text>
                </div>
              </div>
            </Card>

            {/* BCS 및 RWASOME */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                신체 상태 평가
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text variant="body" className="font-medium mb-2">BCS (Body Condition Score)</Text>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${score === 3
                          ? 'bg-brand-blue text-white'
                          : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Text variant="body" className="font-medium mb-2">RWASOME</Text>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${score === 4
                          ? 'bg-brand-blue text-white'
                          : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 목표 제품 및 권장 급여량 */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                하이를 위한 목표 제품과 하루 권장 급여량
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-yellow-100 rounded-lg">
                  <Shield className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <Text variant="body" className="font-medium">권장 에너지량</Text>
                  <Text variant="subtitle" className="text-yellow-600">168kcal</Text>
                </div>
                <div className="text-center p-4 bg-yellow-100 rounded-lg">
                  <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <Text variant="body" className="font-medium">목표 체중</Text>
                  <Text variant="subtitle" className="text-yellow-600">9.5kg</Text>
                </div>
                <div className="text-center p-4 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <Text variant="body" className="font-medium">1일 권장 급여량</Text>
                  <Text variant="subtitle" className="text-yellow-600">120g</Text>
                </div>
              </div>
            </Card>

            {/* 현재 식단 분석 */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                현재 식단의 주요 영양소 함량 분석
              </Text>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <Text variant="body">ZIWIPEAK 에어드라이 소고기</Text>
                  <Text variant="body" className="font-medium">150g</Text>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <Text variant="body">오리지널 치킨 스트립</Text>
                  <Text variant="body" className="font-medium">30g</Text>
                </div>
              </div>
            </Card>

            {/* 영양소 비교 차트 */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                현재 급여 vs 권장 급여 영양소 비교
              </Text>
              <div className="space-y-4">
                {[
                  { nutrient: '단백질', current: 85, recommended: 90 },
                  { nutrient: '지방', current: 45, recommended: 50 },
                  { nutrient: '탄수화물', current: 120, recommended: 100 },
                  { nutrient: '칼슘', current: 2.1, recommended: 2.5 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <Text variant="body" className="font-medium">{item.nutrient}</Text>
                      <Text variant="body" className="text-gray-600">
                        {item.current} / {item.recommended}
                      </Text>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-200 rounded-full h-3 relative">
                        <div
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${Math.min((item.current / item.recommended) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="w-16 bg-green-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 상세 분석 결과 */}
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <Text variant="subtitle" className="text-lg mb-4 text-yellow-800">
                ⚠️ 중요 분석 결과
              </Text>
              <Text variant="body" className="text-yellow-800 leading-relaxed">
                현재 급여 중인 사료의 단백질 함량이 권장량보다 약간 부족합니다.
                특히 성장기 강아지에게 중요한 아미노산 균형을 고려할 때,
                보조 사료나 영양제를 통한 단백질 보충이 필요할 수 있습니다.
              </Text>
            </Card>

            {/* 추천 식단 */}
            <Card className="p-6">
              <Text variant="subtitle" className="text-lg mb-4">
                추천 식단
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: '로얄캐닌 미니 어덜트', brand: 'Royal Canin' },
                  { name: '힐스 사이언스 다이어트', brand: 'Hills' },
                  { name: '프로플랜 어덜트', brand: 'Purina' },
                ].map((product, index) => (
                  <div key={index} className="p-4 border border-brand-blue rounded-lg text-center">
                    <Text variant="body" className="font-medium text-brand-blue">
                      {product.name}
                    </Text>
                    <Text variant="caption" className="text-gray-600">
                      {product.brand}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </BlurOverlay>

      </div>
    </section>
  );
};

export default ReportContentSection;
