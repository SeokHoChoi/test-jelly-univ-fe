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
      <footer className="bg-white py-[32px] px-[24px] md:py-[33px] md:px-[64px] border-t border-black/15">
        <div className="max-w-6xl mx-auto">
          {/* 상단: 회사 정보 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 mb-8">
            {/* Company Info */}
            <div className="text-left">
              <p className="text-[#1E1E1E] font-normal text-[20px] mb-6 md:mb-8">
                © 2025 Jelly University
              </p>
              <div className="md:space-y-0 md:flex md:flex-col">
                <p className="text-[#848484] font-normal text-[20px]">
                  올롱 ⏐ 대표자: 박해주
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* 하단: 사업자 정보 및 약관 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 사업자 정보 */}
              <div className="space-y-2">
                <p className="text-[#848484] font-normal text-[14px]">
                  상호: 올롱 (Allong)
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  대표자: 박해주
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  사업자번호: 626-37-01184
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  주소: 경기도 용인시 기흥구 동백죽전대로527번길 34
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  전화번호: 010-9750-7577
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  이메일: allong.contact@gmail.com
                </p>
                <p className="text-[#848484] font-normal text-[14px]">
                  통신판매신고번호: 2025-용인기흥-0589
                </p>
              </div>

              {/* 약관 링크 */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-[#848484] font-normal text-[14px] hover:text-[#003DA5] transition-colors text-left"
                >
                  이용약관 (올롱)
                </button>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-[#848484] font-normal text-[14px] hover:text-[#003DA5] transition-colors text-left"
                >
                  개인정보처리방침 (올롱)
                </button>
              </div>
            </div>
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
