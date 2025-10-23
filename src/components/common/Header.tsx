'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, User as UserIcon } from 'lucide-react';
import AnimatedChevronIcon from './AnimatedChevronIcon';
import Button from '@/components/common/Button';
import { useAuthContext } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, isLoading, logout, user, isMounted } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/home';
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';
  const isProductAnalysisPage = pathname === '/product-analysis';
  const isBriefReportPage = pathname === '/brief-report';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 로그인된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn && (isLoginPage || isSignupPage)) {
      router.push('/home');
    }
  }, [isLoggedIn, isLoginPage, isSignupPage, router]);

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
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src="/img/logo-3x.png"
              alt="Jelly University Logo"
              width={40}
              height={40}
              className="w-7 h-7 md:w-10 md:h-10"
            />
            <span className="text-[18px] md:text-[24px] font-semibold text-[#000000]">Jelly University</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* 마운트되지 않았거나 로딩 중일 때 */}
            {(!isMounted || isLoading) && (
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            )}

            {/* 로그인 안된 경우 */}
            {isMounted && !isLoading && !isLoggedIn && (
              <>
                {/* 홈페이지 */}
                {isHomePage && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-4">
                        {navigationItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors"
                            title="현재 페이지 내 이동"
                            aria-label={`${item.label} 섹션으로 스크롤`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[#64748B]">
                        <span className="text-[12px] leading-none">페이지 내</span>
                        <AnimatedChevronIcon className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                    </div>
                    <Link
                      href="/login"
                      className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors w-[76px] h-[47px] flex items-center justify-center"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/product-analysis"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] w-[139px] h-[47px] text-[16px]"
                    >
                      무료로 시작하기
                    </Link>
                  </>
                )}

                {/* 로그인 페이지: 회원가입 + 무료로 시작하기 */}
                {isLoginPage && (
                  <>
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] w-[139px] h-[47px] text-[16px]"
                    >
                      회원가입
                    </Link>
                    <Link
                      href="/product-analysis"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] w-[139px] h-[47px] text-[16px]"
                    >
                      무료로 시작하기
                    </Link>
                  </>
                )}

                {/* 회원가입 페이지: 로그인 + 무료로 시작하기 */}
                {isSignupPage && (
                  <>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center rounded-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] hover:bg-[#002A7A] text-white text-[16px] w-[139px] h-[47px]"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/product-analysis"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] w-[139px] h-[47px] text-[16px]"
                    >
                      무료로 시작하기
                    </Link>
                  </>
                )}

                {/* 제품분석, 간단리포트 페이지: 회원가입 */}
                {(isProductAnalysisPage || isBriefReportPage) && (
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-8 px-3 text-sm w-[139px] h-[47px] text-[16px]"
                  >
                    회원가입
                  </Link>
                )}
              </>
            )}

            {/* 로그인된 경우 */}
            {isMounted && !isLoading && isLoggedIn && (
              <>
                {/* 홈페이지: 네비게이션 + 사용자 이름 + 로그아웃 */}
                {isHomePage && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-4">
                        {navigationItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors"
                            title="현재 페이지 내 이동"
                            aria-label={`${item.label} 섹션으로 스크롤`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[#64748B]">
                        <span className="text-[12px] leading-none">페이지 내</span>
                        <AnimatedChevronIcon className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                    </div>
                    {/* Toss 스타일 사용자 메뉴 */}
                    <div className="relative">
                      <button
                        onClick={() => setIsUserMenuOpen((v) => !v)}
                        className="group flex items-center gap-2 rounded-full bg-[#EEF4FF] hover:bg-[#E6EFFF] active:bg-[#DDE9FF] transition-colors px-4 py-2 border border-[#D6E4FF]"
                        aria-haspopup="menu"
                        aria-expanded={isUserMenuOpen}
                      >
                        <span className="text-[15px] font-semibold text-[#0B5FFF] leading-none">
                          {user?.name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#3B82F6] group-hover:text-[#1D4ED8]" />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-[#E6ECF2] bg-white shadow-[0_8px_24px_rgba(2,6,23,0.08)] overflow-hidden z-50">
                          <Link
                            href="/mypage"
                            className="flex items-center gap-2 px-3.5 py-3 text-[14px] text-[#0F172A] hover:bg-[#F8FAFC]"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserIcon className="w-4 h-4 text-[#64748B]" /> 마이페이지
                          </Link>
                          <button
                            className="w-full text-left px-3.5 py-3 text-[14px] text-[#DC2626] hover:bg-[#FFF1F2]"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout();
                            }}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* 제품분석, 간단리포트 페이지: 사용자 이름 + 마이페이지 + 로그아웃 */}
                {(isProductAnalysisPage || isBriefReportPage) && (
                  <>
                    {/* Toss 스타일 사용자 메뉴 */}
                    <div className="relative">
                      <button
                        onClick={() => setIsUserMenuOpen((v) => !v)}
                        className="group flex items-center gap-2 rounded-full bg-[#EEF4FF] hover:bg-[#E6EFFF] active:bg-[#DDE9FF] transition-colors px-4 py-2 border border-[#D6E4FF]"
                        aria-haspopup="menu"
                        aria-expanded={isUserMenuOpen}
                      >
                        <span className="text-[15px] font-semibold text-[#0B5FFF] leading-none">
                          {user?.name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#3B82F6] group-hover:text-[#1D4ED8]" />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-[#E6ECF2] bg-white shadow-[0_8px_24px_rgba(2,6,23,0.08)] overflow-hidden z-50">
                          <Link
                            href="/mypage"
                            className="flex items-center gap-2 px-3.5 py-3 text-[14px] text-[#0F172A] hover:bg-[#F8FAFC]"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserIcon className="w-4 h-4 text-[#64748B]" /> 마이페이지
                          </Link>
                          <button
                            className="w-full text-left px-3.5 py-3 text-[14px] text-[#DC2626] hover:bg-[#FFF1F2]"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout();
                            }}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </>
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
            <div className="md:hidden flex items-center space-x-1">
              {/* 마운트되지 않았거나 로딩 중일 때 */}
              {(!isMounted || isLoading) && (
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              )}

              {/* 로그인 안된 경우 */}
              {isMounted && !isLoading && !isLoggedIn && (
                <>
                  {/* 로그인 페이지: 회원가입 + 무료로 시작하기 */}
                  {isLoginPage && (
                    <>
                      <Link
                        href="/signup"
                        className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-8 px-3 text-sm text-[11px] py-[10px] px-[15px]"
                      >
                        회원가입
                      </Link>
                      <Link
                        href="/product-analysis"
                        className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-8 px-3 text-sm text-[11px] py-[10px] px-[15px]"
                      >
                        무료로 시작하기
                      </Link>
                    </>
                  )}

                  {/* 회원가입 페이지: 로그인 + 무료로 시작하기 */}
                  {isSignupPage && (
                    <>
                      <Link
                        href="/login"
                        className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-8 px-3 text-sm text-[11px] py-[10px] px-[15px]"
                      >
                        로그인
                      </Link>
                      <Link
                        href="/product-analysis"
                        className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-8 px-3 text-sm text-[11px] py-[10px] px-[15px]"
                      >
                        무료로 시작하기
                      </Link>
                    </>
                  )}

                  {/* 제품분석, 간단리포트 페이지: 회원가입 */}
                  {(isProductAnalysisPage || isBriefReportPage) && (
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center rounded-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] hover:bg-[#002A7A] text-white text-[11px] py-[10px] px-[15px]"
                    >
                      회원가입
                    </Link>
                  )}
                </>
              )}

              {/* 로그인된 경우 */}
              {isMounted && !isLoading && isLoggedIn && (
                <>
                  {/* 제품분석, 간단리포트 페이지: 토스 스타일 사용자 메뉴 (모바일) */}
                  {(isProductAnalysisPage || isBriefReportPage) && (
                    <div className="relative">
                      <button
                        onClick={() => setIsUserMenuOpen((v) => !v)}
                        className="group flex items-center gap-1.5 rounded-full bg-[#EEF4FF] hover:bg-[#E6EFFF] active:bg-[#DDE9FF] transition-colors px-3.5 py-1.5 border border-[#D6E4FF]"
                        aria-haspopup="menu"
                        aria-expanded={isUserMenuOpen}
                      >
                        <span className="text-[13px] font-semibold text-[#0B5FFF] leading-none">
                          {user?.name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#3B82F6] group-hover:text-[#1D4ED8]" />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-[#E6ECF2] bg-white shadow-[0_8px_24px_rgba(2,6,23,0.08)] overflow-hidden z-50">
                          <Link
                            href="/mypage"
                            className="flex items-center gap-2 px-3 py-2.5 text-[13px] text-[#0F172A] hover:bg-[#F8FAFC]"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserIcon className="w-4 h-4 text-[#64748B]" /> 마이페이지
                          </Link>
                          <button
                            className="w-full text-left px-3 py-2.5 text-[13px] text-[#DC2626] hover:bg-[#FFF1F2]"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout();
                            }}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation - 홈페이지에서만 표시 */}
        {isMenuOpen && isHomePage && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="text-[12px] px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#0B5FFF] border border-[#D6E4FF]">페이지 내</div>
                <AnimatedChevronIcon className="w-5 h-5 text-[#94A3B8]" />
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center justify-between px-4 py-3 text-[#0F172A] font-medium text-[16px] hover:text-brand-blue transition-colors"
                    title="현재 페이지 내 이동"
                    aria-label={`${item.label} 섹션으로 스크롤`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-[12px] text-[#94A3B8]">섹션</span>
                  </Link>
                ))}
              </div>

              {/* 마운트되지 않았거나 로딩 중일 때 */}
              {(!isMounted || isLoading) && (
                <div className="px-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              )}

              {/* 로그인 안된 경우에만 로그인 버튼과 무료로 시작하기 버튼 표시 */}
              {isMounted && !isLoading && !isLoggedIn && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-[#F8F8F8] hover:bg-[#E8E8E8] active:bg-[#D8D8D8] rounded-[12px] text-[#000000] font-medium text-[16px] hover:text-brand-blue transition-colors px-4 py-3 text-center mx-4"
                  >
                    로그인
                  </Link>
                  <div className="px-4">
                    <Link
                      href="/product-analysis"
                      className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C] h-12 px-6 text-lg w-full py-3 px-4 text-[16px]"
                    >
                      무료로 시작하기
                    </Link>
                  </div>
                </>
              )}

              {/* 로그인된 경우 사용자 이름과 마이페이지, 로그아웃 버튼 표시 */}
              {isMounted && !isLoading && isLoggedIn && (
                <>
                  {/* 사용자 이름 - 상단 라벨형 배치 (간격 확대) */}
                  <div className="px-4 pt-1 pb-4">
                    <span className="text-[13px] text-[#64748B]">안녕하세요</span>
                    <div className="mt-0.5 text-[16px] font-semibold text-[#111827]">{user?.name}님</div>
                  </div>

                  {/* 메뉴 아이템들 */}
                  <div className="px-4 space-y-3">
                    {/* 마이페이지: 파란 배경 / 하얀 글자 + 이모지 */}
                    <Link
                      href="/mypage"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg font-bold active:scale-95 bg-[#003DA5] text-white hover:bg-[#002A7A] active:bg-[#001F5C] px-4 py-3 text-[15px]"
                    >
                      <span className="text-[16px] leading-none" aria-hidden>👤</span>
                      마이페이지
                    </Link>

                    {/* 로그아웃: 흰 배경 / 파란 테두리 & 텍스트, 상태 컬러 반영 */}
                    <button
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-[14px] font-semibold border transition-colors border-[#0B5FFF] text-[#0B5FFF] hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:bg-[#F8FAFF] active:border-[#0A46E9] active:text-[#0A46E9] active:bg-[#EEF4FF]"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      로그아웃
                    </button>
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
