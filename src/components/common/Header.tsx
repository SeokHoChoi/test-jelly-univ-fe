'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';
  const isProductAnalysisPage = pathname === '/product-analysis';
  const isBriefReportPage = pathname === '/brief-report';

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 로그인된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn && (isLoginPage || isSignupPage)) {
      window.location.href = '/';
    }
  }, [isLoggedIn, isLoginPage, isSignupPage]);

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
            {/* 로그인 안된 경우 */}
            {!isLoggedIn && (
              <>
                {/* 홈페이지 */}
                {isHomePage && (
                  <>
                    {navigationItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => login()}
                      className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors w-[76px] h-[47px] flex items-center justify-center"
                    >
                      로그인
                    </button>
                    <Button
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    >
                      <Link href="/product-analysis">무료로 시작하기</Link>
                    </Button>
                  </>
                )}

                {/* 로그인 페이지: 회원가입 + 무료로 시작하기 */}
                {isLoginPage && (
                  <>
                    <Button
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    >
                      <Link href="/signup">회원가입</Link>
                    </Button>
                    <Button
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    >
                      <Link href="/product-analysis">무료로 시작하기</Link>
                    </Button>
                  </>
                )}

                {/* 회원가입 페이지: 로그인 + 무료로 시작하기 */}
                {isSignupPage && (
                  <>
                    <Button
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    >
                      <Link href="/login">로그인</Link>
                    </Button>
                    <Button
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    >
                      <Link href="/product-analysis">무료로 시작하기</Link>
                    </Button>
                  </>
                )}

                {/* 제품분석, 간단리포트 페이지: 회원가입 */}
                {(isProductAnalysisPage || isBriefReportPage) && (
                  <Button
                    size="sm"
                    className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                  >
                    <Link href="/signup">회원가입</Link>
                  </Button>
                )}
              </>
            )}

            {/* 로그인된 경우 */}
            {isLoggedIn && (
              <>
                {/* 홈페이지: 네비게이션만 표시 (로그인, 무료로 시작하기 제거) */}
                {isHomePage && navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* 제품분석, 간단리포트 페이지: 로그아웃 */}
                {(isProductAnalysisPage || isBriefReportPage) && (
                  <Button
                    size="sm"
                    className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] rounded-[12px] w-[139px] h-[47px]"
                    onClick={() => logout()}
                  >
                    로그아웃
                  </Button>
                )}
              </>
            )}
          </nav>

          {/* Mobile - 홈페이지에서만 햄버거 버튼 표시 */}
          {isHomePage && (
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {/* Mobile - 홈페이지가 아닐 때 버튼들 */}
          {!isHomePage && (
            <div className="md:hidden flex items-center space-x-2">
              {/* 로그인 안된 경우 */}
              {!isLoggedIn && (
                <>
                  {/* 로그인 페이지: 회원가입 + 무료로 시작하기 */}
                  {isLoginPage && (
                    <>
                      <Button
                        size="sm"
                        className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                      >
                        <Link href="/signup">회원가입</Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                      >
                        <Link href="/product-analysis">무료로 시작하기</Link>
                      </Button>
                    </>
                  )}

                  {/* 회원가입 페이지: 로그인 + 무료로 시작하기 */}
                  {isSignupPage && (
                    <>
                      <Button
                        size="sm"
                        className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                      >
                        <Link href="/login">로그인</Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                      >
                        <Link href="/product-analysis">무료로 시작하기</Link>
                      </Button>
                    </>
                  )}

                  {/* 제품분석, 간단리포트 페이지: 회원가입 */}
                  {(isProductAnalysisPage || isBriefReportPage) && (
                    <Button
                      size="sm"
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                    >
                      <Link href="/signup">회원가입</Link>
                    </Button>
                  )}
                </>
              )}

              {/* 로그인된 경우 */}
              {isLoggedIn && (
                <>
                  {/* 제품분석, 간단리포트 페이지: 로그아웃 */}
                  {(isProductAnalysisPage || isBriefReportPage) && (
                    <Button
                      size="sm"
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[11px] rounded-[12px] py-[10px] px-[15px]"
                      onClick={() => logout()}
                    >
                      로그아웃
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation - 홈페이지에서만 표시 */}
        {isMenuOpen && isHomePage && (
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

              {/* 로그인 안된 경우에만 로그인 버튼과 무료로 시작하기 버튼 표시 */}
              {!isLoggedIn && (
                <>
                  <button
                    onClick={() => {
                      login();
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors px-4 py-3 text-center mx-4"
                  >
                    로그인
                  </button>
                  <div className="px-4">
                    <Button
                      size="lg"
                      className="bg-[#003DA5] hover:bg-[#002A7A] text-white font-medium text-[16px] !rounded-[12px] w-full py-3 px-4"
                    >
                      <Link href="/product-analysis">무료로 시작하기</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
