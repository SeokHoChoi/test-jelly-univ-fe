'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분간 캐시 유지
            staleTime: 5 * 60 * 1000,
            // 10분간 백그라운드에서 데이터 유지
            gcTime: 10 * 60 * 1000,
            // 에러 시 자동 재시도 비활성화 (인증 에러의 경우)
            retry: (failureCount, error: any) => {
              // 401 에러는 재시도하지 않음
              if (error?.status === 401) {
                return false;
              }
              // 다른 에러는 최대 3번 재시도
              return failureCount < 3;
            },
            // 윈도우 포커스 시 자동 리페치 비활성화
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
