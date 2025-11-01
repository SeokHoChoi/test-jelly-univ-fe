import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 이미지 최적화 전체 비활성화 - 원본 품질 유지
    unoptimized: true,
  },
  // API 라우트 타임아웃 설정 (60초)
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Vercel 배포 시 타임아웃 설정
  ...(process.env.NODE_ENV === 'production' && {
    serverRuntimeConfig: {
      maxDuration: 60,
    },
  }),
};

export default nextConfig;
