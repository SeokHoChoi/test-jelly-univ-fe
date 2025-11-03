'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 로고 */}
        <div className="mb-8">
          <Image
            src="/img/logo-3x.png"
            alt="Jelly University"
            width={120}
            height={40}
            className="mx-auto"
            priority
          />
        </div>

        {/* 404 아이콘 */}
        <div className="mb-8">
          <div className="text-7xl font-bold text-[#003DA5] mb-4">404</div>
          <div className="w-24 h-1 bg-[#003DA5] mx-auto rounded-full"></div>
        </div>

        {/* 메시지 */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <p className="text-sm text-gray-500">
            URL을 다시 확인하시거나 아래 버튼을 이용해주세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#003DA5] text-white font-semibold rounded-lg hover:bg-[#002A7A] transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            홈으로 이동
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#003DA5] font-semibold rounded-lg border-2 border-[#003DA5] hover:bg-[#003DA5] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            이전 페이지
          </button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            도움이 필요하신가요?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Link
              href="/product-analysis"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4 mr-3 text-[#003DA5]" />
              <span>사료 분석하기</span>
            </Link>
            <Link
              href="/home#service"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4 mr-3 text-[#003DA5]" />
              <span>서비스 소개</span>
            </Link>
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-xs text-gray-400">
          <p>© 2025 Jelly University. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
