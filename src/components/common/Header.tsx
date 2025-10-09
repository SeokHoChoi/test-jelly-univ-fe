'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Button from '@/components/common/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: '서비스', href: '#service' },
    { label: '플랜', href: '#plans' },
    { label: '후기', href: '#reviews' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/jellyu-logo.png"
              alt="Jelly University Logo"
              width={40}
              height={40}
              className="w-7 h-7 md:w-10 md:h-10"
            />
            <span className="text-[18px] md:text-[24px] font-semibold text-[#000000]">Jelly University</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors px-4 py-3 text-center"
            >
              로그인
            </Link>
            <Button
              size="sm"
              className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
            >
              <Link href="/signup">무료로 시작하기</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors px-4 py-3 text-center mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
              <div className="px-4">
                <Button
                  size="sm"
                  className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-full h-[47px]"
                >
                  <Link href="/signup">무료로 시작하기</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
