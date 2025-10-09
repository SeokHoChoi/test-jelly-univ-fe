'use client';

import { useState, useEffect } from 'react';

// 로그인 상태 관리 훅
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 로그인 상태 확인 함수
  const checkAuthStatus = async () => {
    try {
      // TODO: 나중에 실제 인증 로직으로 교체
      // 예시:
      // - http-only 쿠키 확인
      // - 로컬스토리지 토큰 확인
      // - API 호출로 토큰 검증

      // 현재는 로컬스토리지에서 임시로 확인
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 함수
  const login = async (credentials?: any) => {
    try {
      // TODO: 나중에 실제 로그인 로직으로 교체
      // 예시:
      // - 일반 로그인: 이메일/비밀번호
      // - 간편 로그인: 카카오, 구글, 네이버 등

      // 현재는 임시 토큰 저장
      const token = 'temp_token_' + Date.now();
      localStorage.setItem('auth_token', token);
      setIsLoggedIn(true);

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error };
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      // TODO: 나중에 실제 로그아웃 로직으로 교체
      // 예시:
      // - 서버에 로그아웃 요청
      // - 쿠키 삭제
      // - 로컬스토리지 정리

      localStorage.removeItem('auth_token');
      setIsLoggedIn(false);

      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error };
    }
  };

  return {
    isLoggedIn,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };
};
