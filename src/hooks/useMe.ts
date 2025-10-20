'use client';

import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/utils/auth';

// 사용자 정보 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  profileImage?: string | null;
  provider: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// API 응답 타입 정의
export interface MeResponse {
  success: boolean;
  data: User;
}

// /api/auth/me API 호출 함수
const fetchMe = async (): Promise<MeResponse> => {
  const token = getToken();

  if (!token) {
    throw new Error('No token available');
  }

  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// useMe 훅
export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    enabled: !!getToken(), // 토큰이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: (failureCount, error: unknown) => {
      // 401 에러는 재시도하지 않음
      if (error && typeof error === 'object') {
        if (('message' in error && typeof error.message === 'string' && error.message.includes('401')) ||
          ('status' in error && error.status === 401)) {
          return false;
        }
      }
      // 다른 에러는 최대 2번 재시도
      return failureCount < 2;
    },
  });
};
