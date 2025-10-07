'use client';

import Link from 'next/link';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { X } from 'lucide-react';

interface SignupPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupPromptModal = ({ isOpen, onClose }: SignupPromptModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-white" />
        </div>

        <Text variant="subtitle" className="text-lg mb-4">
          전체 리포트를 보려면 회원가입이 필요합니다
        </Text>

        <Text variant="body" className="text-gray-600 mb-6">
          회원가입하시면 상세한 분석 결과와 맞춤형 식단 추천을 받으실 수 있습니다.
        </Text>

        <div className="space-y-3">
          <Button size="lg" className="w-full">
            <Link href="/signup">무료로 회원가입하기</Link>
          </Button>

          <Button variant="outline" size="lg" className="w-full" onClick={onClose}>
            나중에 하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignupPromptModal;
