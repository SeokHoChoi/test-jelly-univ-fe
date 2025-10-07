import Link from 'next/link';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { Shield } from 'lucide-react';

const ResultSummarySection = () => {
  return (
    <section className="bg-brand-blue py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Text variant="title" className="text-white mb-4">
            그래서 이 사료, 냥구에게 잘 맞을까?
          </Text>
          <Text variant="body" className="text-white text-lg max-w-4xl mx-auto">
            급여 중인 사료가 냥구의 현재 건강 상태에 영향을 미치는지, 그리고 현재 급여 방식이 적절한지 최종적으로 진단하고 해결책을 제시해 드려요!
          </Text>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              <div className="flex-1">
                <div className="space-y-3 mb-6">
                  <Text variant="body" className="text-gray-700">
                    • 현재 급여 사료의 영양소 분석 결과
                  </Text>
                  <Text variant="body" className="text-gray-700">
                    • 냥구의 건강 상태에 미치는 영향 평가
                  </Text>
                  <Text variant="body" className="text-gray-700">
                    • 최적화된 급여량 및 식단 개선 방안
                  </Text>
                </div>

                <Button size="lg" className="w-full md:w-auto">
                  <Link href="/signup">전체 리포트 보기</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultSummarySection;
