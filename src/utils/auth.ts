// 인증 관련 API 서비스 함수들

const INTERNAL_API_BASE_URL = '/api';

// 사용자 정보 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string | null;
  provider: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

// API 응답 타입 정의
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// 토큰 관리 함수들
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  // localStorage에서 먼저 찾고, 없으면 sessionStorage에서 찾기
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};

export const setToken = (token: string, rememberMe: boolean = false): void => {
  if (typeof window === 'undefined') return;

  if (rememberMe) {
    // 로그인 상태 유지: localStorage에 저장 (영구 저장)
    localStorage.setItem('auth_token', token);
  } else {
    // 세션만 유지: sessionStorage에 저장 (브라우저 탭 닫으면 삭제)
    sessionStorage.setItem('auth_token', token);
  }
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token');
};

// API 요청 헬퍼 함수
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${INTERNAL_API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// 회원가입 API (내부 API Routes 사용)
export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// 로그인 API (내부 API Routes 사용)
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// 현재 사용자 정보 조회 API (내부 API Routes 사용)
export const getCurrentUser = async (): Promise<UserResponse> => {
  return apiRequest<UserResponse>('/auth/me', {
    method: 'GET',
  });
};

// 로그아웃 API (내부 API Routes 사용)
export const logout = async (): Promise<LogoutResponse> => {
  return apiRequest<LogoutResponse>('/auth/logout', {
    method: 'POST',
  });
};

// JWT 토큰 디코딩 (만료 시간 체크용)
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// 토큰 유효성 검증 (만료 시간 체크 포함)
export const validateToken = async (): Promise<boolean> => {
  try {
    const token = getToken();
    if (!token) return false;

    // JWT 토큰 디코딩하여 만료 시간 체크
    const decoded = decodeJWT(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= decoded.exp) {
        // 토큰이 만료되었으면 제거
        removeToken();
        return false;
      }
    }

    // 토큰이 유효하면 사용자 정보 조회
    await getCurrentUser();
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    removeToken();
    return false;
  }
};
