'use client';

import { useState } from 'react';
import { Instagram, Mail } from 'lucide-react';
import TermsModal from './TermsModal';
import { termsOfService, privacyPolicy } from '@/data/terms';

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/jelly_university?igsh=MW5ldXRjaTlqZzY2dA==', label: 'Instagram' },
    { icon: Mail, href: 'mailto:allong.contact@gmail.com', label: 'Email' },
  ];

  return (
    <>
      <footer className="bg-white border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
          {/* 링크 라인 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-[13px] text-gray-500">
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-gray-700">이용약관</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-gray-700">개인정보처리방침</button>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="hover:text-gray-600 transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* 정보 라인 */}
          <div className="text-[12px] md:text-[13px] text-gray-500 leading-6">
            {/* 1행: 상호/대표/사업자/통신판매 */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-y-1">
              <span>상호: 올롱 (Allong)</span>
              <span className="hidden md:inline mx-2 text-gray-300">·</span>
              <span>대표자: 박해주</span>
              <span className="hidden md:inline mx-2 text-gray-300">·</span>
              <span>사업자번호: 626-37-01184</span>
              <span className="hidden md:inline mx-2 text-gray-300">·</span>
              <span>통신판매신고번호: 2025-용인기흥-0589</span>
            </div>
            {/* 2행: 주소/전화/이메일 */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-y-1">
              <span>주소: 경기도 용인시 기흥구 동백죽전대로527번길 34</span>
              <span className="hidden md:inline mx-2 text-gray-300">·</span>
              <span>전화: 010-9750-7577</span>
              <span className="hidden md:inline mx-2 text-gray-300">·</span>
              <span>이메일: allong.contact@gmail.com</span>
            </div>
            <div className="mt-4 text-gray-400">© 2025 Jelly University</div>
          </div>
        </div>
      </footer>

      {/* 이용약관 모달 */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="이용약관"
        content={termsOfService}
      />

      {/* 개인정보처리방침 모달 */}
      <TermsModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="개인정보처리방침"
        content={privacyPolicy}
      />
    </>
  );
};

export default Footer;
