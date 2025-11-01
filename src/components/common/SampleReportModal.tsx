'use client';

import { useEffect, useState, Component, ReactNode } from 'react';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

// Notion 콘텐츠 스타일 오버라이드
const notionStyles = `
  /* 전체 래퍼 - 좌우 스크롤 방지 */
  .notion-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden !important;
  }
  
  /* 페이지 전체 */
  .notion-wrapper .notion-page {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  /* 커버 이미지 - 전체 너비에 맞춤, 좌우 안 짤리게 */
  .notion-wrapper .notion-page-cover {
    width: 100% !important;
    height: auto !important;
    max-height: 30vh !important;
    display: block !important;
    overflow: hidden !important;
    margin-bottom: 1rem !important;
  }
  
  .notion-wrapper .notion-page-cover img,
  .notion-wrapper .notion-page-cover-wrapper img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center !important;
  }
  
  /* 페이지 아이콘 */
  .notion-wrapper .notion-page-icon-wrapper {
    display: block !important;
    margin-bottom: 0.75rem !important;
  }
  
  /* 타이틀 */
  .notion-wrapper .notion-title {
    display: block !important;
    margin-top: 0.75rem !important;
    margin-bottom: 1rem !important;
    padding: 0 1rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  
  /* Breadcrumbs - 잘리지 않도록 */
  .notion-wrapper .breadcrumbs,
  .notion-wrapper .breadcrumb {
    width: 100% !important;
    max-width: 100% !important;
    overflow: visible !important;
    white-space: normal !important;
    word-break: keep-all !important;
    overflow-wrap: break-word !important;
  }
  
  .notion-wrapper .breadcrumb .title {
    display: block !important;
    width: 100% !important;
    padding-right: 1rem !important;
    white-space: normal !important;
    word-break: keep-all !important;
    overflow-wrap: break-word !important;
  }
  
  /* 페이지 콘텐츠 */
  .notion-wrapper .notion-page-content {
    width: 100% !important;
    max-width: 900px !important;
    margin: 0 auto !important;
    padding: 0 1rem !important;
    box-sizing: border-box !important;
  }
  
  /* 텍스트 */
  .notion-wrapper .notion-text {
    line-height: 1.6 !important;
    word-break: keep-all !important;
    overflow-wrap: break-word !important;
  }
  
  /* 컬렉션 - 내부 스크롤만 허용 */
  .notion-wrapper .notion-collection {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
  }
  
  /* 이미지 */
  .notion-wrapper .notion-image,
  .notion-wrapper .notion-image > div,
  .notion-wrapper .notion-image > div > div {
    max-width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
  }
  
  .notion-wrapper .notion-image img {
    max-width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  /* 이미지 컨테이너의 인라인 스타일 높이 제거 */
  .notion-wrapper .notion-image > div[style*="height"],
  .notion-wrapper div[style*="height: 320px"] {
    height: auto !important;
  }
  
  /* 컬럼 */
  .notion-wrapper .notion-column {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  /* 테이블 - 내부 스크롤만 허용 */
  .notion-wrapper .notion-table {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
  }
  
  /* 모든 블록이 컨테이너를 넘지 않도록 */
  .notion-wrapper .notion-block {
    max-width: 100% !important;
    word-break: keep-all !important;
    overflow-wrap: break-word !important;
  }
  
  /* 긴 단어나 URL도 줄바꿈 */
  .notion-wrapper p,
  .notion-wrapper span,
  .notion-wrapper div {
    word-break: keep-all !important;
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
  }
  
  /* 헤더 표시 */
  .notion-wrapper .notion-page-header {
    display: block !important;
    width: 100% !important;
  }
  
  /* 모바일 대응 */
  @media (max-width: 768px) {
    /* 모바일 커버 이미지 - 전체가 보이도록, 공백 줄임 */
    .notion-wrapper .notion-page-cover {
      max-height: none !important;
      height: auto !important;
      min-height: 20px !important;
      margin-top: 10px !important;
      margin-bottom: -5px !important;
    }

    .notion-wrapper .notion-page-header {
      padding-top: 40rem !important;
    }
    
    .notion-wrapper .notion-page-cover img,
    .notion-wrapper .notion-page-cover-wrapper img {
      object-fit: contain !important;
      object-position: center !important;
      max-height: 150px !important;
    }

    .notion-page-cover-wrapper {
      min-height: 0px !important;
      height: fit-content !important;
    }

    .notion-page-cover {
      height: 20px !important;
      min-height: 20px !important;
    }
    
    /* 모바일 breadcrumbs - 잘리지 않도록 */
    .notion-wrapper .breadcrumbs {
      padding-top: 2rem !important;
      padding-bottom: 1.5rem !important;
    }
    
    .notion-wrapper .breadcrumb {
      font-size: 14px !important;
    }
    
    .notion-wrapper .breadcrumb .title {
      padding-right: 0.75rem !important;
      line-height: 1.4 !important;
    }
    
    .notion-wrapper .notion-page-content {
      padding: 0 0.75rem !important;
    }
    
    .notion-wrapper .notion-title {
      padding: 0 0.75rem !important;
      font-size: 1.5rem !important;
      word-break: keep-all !important;
      overflow-wrap: break-word !important;
      margin-top: 0.5rem !important;
      margin-bottom: 0.75rem !important;
    }
    
    /* 모바일 텍스트 최적화 */
    .notion-wrapper .notion-text {
      font-size: 15px !important;
      word-break: keep-all !important;
      overflow-wrap: break-word !important;
      white-space: pre-wrap !important;
    }
    
    /* 모바일 헤딩 크기 조정 */
    .notion-wrapper .notion-h1,
    .notion-wrapper h1 {
      font-size: 1.75rem !important;
      word-break: keep-all !important;
    }
    
    .notion-wrapper .notion-h2,
    .notion-wrapper h2 {
      font-size: 1.5rem !important;
      word-break: keep-all !important;
    }
    
    .notion-wrapper .notion-h3,
    .notion-wrapper h3 {
      font-size: 1.25rem !important;
      word-break: keep-all !important;
    }
    
    /* 모바일 리스트 간격 */
    .notion-wrapper .notion-list {
      padding-left: 1.25rem !important;
    }
    
    /* 모바일 인용문 */
    .notion-wrapper .notion-quote {
      padding: 0.75rem !important;
      font-size: 14px !important;
    }
    
    /* 모바일 코드 블록 */
    .notion-wrapper .notion-code {
      font-size: 13px !important;
      overflow-x: auto !important;
      white-space: pre !important;
    }
    
    /* 모바일 콜아웃 */
    .notion-wrapper .notion-callout {
      padding: 0.75rem !important;
      font-size: 14px !important;
    }
    
    /* 모바일 토글 */
    .notion-wrapper .notion-toggle {
      padding-left: 0.5rem !important;
    }
    
    /* 모바일 구분선 */
    .notion-wrapper .notion-divider {
      margin: 1rem 0 !important;
    }
    
    /* 모바일 이미지 - 전체가 보이도록 */
    .notion-wrapper .notion-image,
    .notion-wrapper .notion-image > div,
    .notion-wrapper .notion-image > div > div {
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
    }
    
    .notion-wrapper .notion-image,
    .notion-wrapper img {
      max-width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
    }
    
    /* 모바일 임베드 콘텐츠 */
    .notion-wrapper .notion-embed,
    .notion-wrapper iframe,
    .notion-wrapper video {
      max-width: 100% !important;
      width: 100% !important;
    }
    
    /* 페이지 상하 여백 조정 */
    .notion-wrapper .notion-page {
      padding-top: 0.5rem !important;
      padding-bottom: 1rem !important;
    }
    
    /* 모바일 페이지 헤더 여백 줄임 */
    .notion-wrapper .notion-page-header {

    }

    /* 하단 배너 */
    .notion-wrapper .medium-zoom-image,
    .notion-wrapper .medium-zoom-image__fullscreen {
      height: auto !important;
      max-height: none !important;
      min-height: 0 !important;
    }
    
    /* 모든 이미지 래퍼 div의 고정 높이 제거 */
    .notion-wrapper div[style*="height"] {
      height: auto !important;
    }
  }
`;

// NotionRenderer를 dynamic import로 불러오기 (SSR 방지)
const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

// Collection, Modal 컴포넌트도 dynamic import
const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  { ssr: false }
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false }
);

// Error Boundary for NotionRenderer
class NotionErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('NotionRenderer Error:', error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SampleReportModal = ({ isOpen, onClose }: SampleReportModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderError, setRenderError] = useState(false);

  // 노션 페이지 ID (URL에서 추출)
  const NOTION_PAGE_ID = '29d1ba4419e780e58a52f0992ef63fbe';
  const notionUrl = 'https://dandy-toast-c72.notion.site/29d1ba4419e780e58a52f0992ef63fbe';

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
      document.body.style.overflow = 'hidden';
      setRenderError(false); // 모달 열릴 때마다 렌더 에러 리셋

      // 노션 데이터 가져오기 (자체 API 라우트 사용)
      if (!recordMap) {
        setLoading(true);
        fetch(`/api/notion/${NOTION_PAGE_ID}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('노션 페이지를 불러올 수 없습니다.');
            }
            return res.json();
          })
          .then((response) => {
            if (!response.success || !response.recordMap) {
              throw new Error(response.error || '노션 데이터를 불러올 수 없습니다.');
            }

            const data = response.recordMap;

            // 데이터 유효성 검사
            if (!data || typeof data !== 'object') {
              throw new Error('잘못된 데이터 형식입니다.');
            }
            setRecordMap(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error('[Client] Notion API Error:', err);
            setError(err.message || '페이지를 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, recordMap]);

  if (!isOpen || !mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleOpenInNewTab = () => {
    window.open(notionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Notion 스타일 오버라이드 */}
      <style dangerouslySetInnerHTML={{ __html: notionStyles }} />

      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={handleBackdropClick}
      >
        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* 모달 컨텐츠 */}
        <div
          className={`relative w-[90%] md:w-[95%] max-w-[1600px] h-[90vh] md:h-[95vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            } flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-gray-100 bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#003DA5] to-[#0052CC] flex items-center justify-center">
                <span className="text-[20px] md:text-[24px]">📊</span>
              </div>
              <div>
                <h2 className="text-[18px] md:text-[24px] font-bold text-gray-900">
                  샘플 리포트
                </h2>
                <p className="text-[12px] md:text-[14px] text-gray-500 mt-0.5">
                  실제 발송되는 리포트 형식입니다
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center"
              aria-label="닫기"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </button>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white"
            style={{
              // 부드러운 스크롤
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-[#003DA5] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-gray-600 text-[16px] font-medium mt-6">리포트를 불러오는 중...</p>
                  <p className="text-gray-400 text-[14px] mt-2">잠시만 기다려주세요</p>
                </div>
              </div>
            ) : error || renderError ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <span className="text-[40px]">😕</span>
                </div>
                <p className="text-gray-900 text-[20px] font-bold mb-2">
                  리포트를 표시할 수 없습니다
                </p>
                <p className="text-gray-600 text-[16px] mb-8 max-w-md">
                  {error || '일시적인 오류가 발생했습니다. 새 창에서 열어보시겠어요?'}
                </p>
                <button
                  onClick={handleOpenInNewTab}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#003DA5] to-[#0052CC] text-white text-[16px] font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>🔗</span>
                  <span>새 창에서 리포트 보기</span>
                </button>
              </div>
            ) : recordMap && Object.keys(recordMap).length > 0 ? (
              <NotionErrorBoundary
                onError={() => {
                  console.error('Render error detected, showing fallback');
                  setRenderError(true);
                }}
              >
                <div className="notion-wrapper">
                  <NotionRenderer
                    recordMap={recordMap}
                    fullPage={true}
                    darkMode={false}
                    disableHeader={false}
                    components={{
                      Collection,
                      Modal,
                    }}
                  />
                </div>
              </NotionErrorBoundary>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SampleReportModal;