'use client';

import { useState, useEffect } from 'react';
import {
  login as loginAPI,
  logout as logoutAPI,
  register as registerAPI,
  getCurrentUser,
  // validateToken,
  getToken,
  setToken,
  removeToken,
  User
} from '@/utils/auth';

// 로그인 상태 관리 훅
export const useAuth = () => {
  // Hydration 불일치 방지를 위한 마운트 상태
  const [isMounted, setIsMounted] = useState(false);

  // 초기 상태는 항상 false로 설정 (서버와 클라이언트 일치)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // 컴포넌트 마운트 후 인증 상태 확인
  useEffect(() => {
    setIsMounted(true);
    checkAuthStatus();
  }, []);

  // 로그인 상태 확인 함수
  const checkAuthStatus = async () => {
    try {
      // 토큰이 없으면 즉시 로그아웃 상태로 설정
      const token = getToken();
      if (!token) {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      // 토큰이 있으면 사용자 정보 조회 (이 과정에서 토큰 유효성도 검증됨)
      const userResponse = await getCurrentUser();
      setUser(userResponse.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      // 토큰이 유효하지 않으면 제거
      removeToken();
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 함수
  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      setIsLoading(true);

      // API에는 rememberMe를 보내지 않음 (스펙에 없음)
      const response = await loginAPI({
        email: credentials.email,
        password: credentials.password
      });

      // 토큰 저장 (rememberMe 옵션에 따라) - 프론트엔드에서만 처리
      setToken(response.data.token, credentials.rememberMe || false);

      // 사용자 정보 저장
      setUser(response.data.user);
      setIsLoggedIn(true);

      return { success: true };
    } catch (error: unknown) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: (error as Error).message || '로그인에 실패했습니다.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 함수
  const register = async (userData: { email: string; password: string; name: string }) => {
    try {
      setIsLoading(true);

      const response = await registerAPI(userData);

      // 토큰 저장
      setToken(response.data.token);

      // 사용자 정보 저장
      setUser(response.data.user);
      setIsLoggedIn(true);

      return { success: true };
    } catch (error: unknown) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: (error as Error).message || '회원가입에 실패했습니다.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      setIsLoading(true);

      // 서버에 로그아웃 요청
      await logoutAPI();

      // 로컬 토큰 제거
      removeToken();

      // 상태 초기화
      setUser(null);
      setIsLoggedIn(false);

      return { success: true };
    } catch (error: unknown) {
      console.error('Logout failed:', error);

      // 서버 요청이 실패해도 로컬 상태는 초기화
      removeToken();
      setUser(null);
      setIsLoggedIn(false);

      return {
        success: false,
        error: (error as Error).message || '로그아웃에 실패했습니다.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
    register,
    checkAuthStatus,
    isMounted
  };
};
