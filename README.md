# 🐕 Jelly University - 반려동물 맞춤 식단 솔루션

서울대·한국수의영양학회 임원 수의사가 검증한 반려동물 맞춤 식단 솔루션입니다.

## 🚀 주요 기능

- **무료 사료 분석**: 30초 만에 현재 급여 사료의 품질과 영양성 분석
- **맞춤형 식단 설계**: 반려동물의 개별 특성을 고려한 맞춤 식단 추천
- **전문가 검증**: 서울대·한국수의영양학회 임원 수의사가 검증한 AI 분석
- **실시간 리포트**: 상세한 분석 결과와 개선 방안 제시

## 🛠 기술 스택

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Lucide React
- **Form Handling**: React Hook Form
- **State Management**: Zustand
- **Responsive Design**: React Responsive

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── home/              # 홈페이지
│   ├── product-analysis/  # 제품 분석 페이지
│   ├── brief-report/      # 간략 리포트 페이지
│   ├── login/             # 로그인 페이지
│   └── signup/            # 회원가입 페이지
├── components/            # React 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   ├── home/              # 홈페이지 컴포넌트
│   ├── product-analysis/  # 제품 분석 컴포넌트
│   └── brief-report/      # 리포트 컴포넌트
└── utils/                 # 유틸리티 함수
```

## 🎨 디자인 시스템

- **브랜드 컬러**: #003DA5 (Jelly Blue)
- **타이포그래피**: Pretendard

## 🚀 시작하기

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# 프론트엔드 도메인
NEXT_PUBLIC_FRONTEND_URL=https://www.jellyuniversity.com

# 백엔드 API 도메인
NEXT_PUBLIC_BACKEND_URL=https://dog-food-db.onrender.com/api

# NicePay SDK URL
NEXT_PUBLIC_NICEPAY_SDK_URL=https://pay.nicepay.co.kr/v1/js/

# 기타 환경변수들
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id_here
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 📱 페이지 구성

- **홈페이지** (`/home`): 메인 랜딩 페이지
- **제품 분석** (`/product-analysis`): 사료 분석 폼
- **간략 리포트** (`/brief-report`): 분석 결과 미리보기
- **로그인** (`/login`): 사용자 로그인
- **회원가입** (`/signup`): 신규 사용자 등록

## 🎯 주요 컴포넌트

- **Header**: 네비게이션 및 로고
- **HeroSection**: 메인 배너 및 CTA
- **ArticleListSection**: 서비스 소개 카드
- **PlanSection**: 요금제 선택
- **ReviewSection**: 사용자 후기
- **ProductForm**: 사료 정보 입력 폼
- **ReportContentSection**: 분석 결과 표시

## 🔧 개발 환경

- Node.js 18+
- npm 또는 yarn
- TypeScript 5+
- TailwindCSS 4+

## 📄 라이선스

© 2025 Jelly University. All rights reserved.