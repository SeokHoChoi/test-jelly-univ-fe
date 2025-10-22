import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 이미지 최적화 전체 비활성화 - 원본 품질 유지
    unoptimized: true,
  },
};

export default nextConfig;
