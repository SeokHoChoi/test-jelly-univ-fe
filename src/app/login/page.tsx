'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { useAuthContext } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginPageContent() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('/');

  // URL 파라미터에서 리다이렉트 URL 읽기
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    console.log('받은 redirect URL:', redirect);
    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError('');
      setSubmitSuccess('');

      const result = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (result.success) {
        if (redirectUrl && redirectUrl !== '/') {
          // 리다이렉트 URL이 있는 경우 즉시 이동 (결제 페이지 포함)
          // 전체 URL을 그대로 사용 (파라미터 포함)
          window.location.href = redirectUrl;
        } else {
          // 리다이렉트 URL이 없는 경우 성공 메시지 표시 후 Header의 useEffect가 처리
          setSubmitSuccess('로그인 성공! 잠시 후 홈으로 이동합니다...');
          setTimeout(() => {
            // Header의 useEffect가 처리하도록 빈 함수
          }, 1500);
        }
      } else {
        setSubmitError(result.error || '로그인에 실패했습니다.');
      }
    } catch {
      setSubmitError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 mb-4">
              <Image
                src="/img/jellyu-logo.png"
                alt="Jelly University Logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <div className="flex flex-col items-center">
                <Text variant="title" className="text-2xl">
                  로그인
                </Text>
                <Text variant="body" className="text-gray-600 mt-2">
                  <span className="font-semibold tracking-wide mr-[0.2px]">Jelly University</span>에 오신 것을 환영합니다
                </Text>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다'
                  }
                })}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              {/* TODO: 비밀번호 찾기 링크는 향후 기능 추가 시 활성화 예정 */}
              {/* <Link href="/forgot-password" className="text-sm text-brand-blue hover:text-brand-blue-dark">
                비밀번호 찾기
              </Link> */}
            </div>

            {/* 에러 메시지 표시 */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            )}

            {/* 성공 메시지 표시 */}
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm">{submitSuccess}</p>
              </div>
            )}

            <Button
              variant="hero-primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Kakao
              </button>
            </div> */}
          </div>

          <div className="mt-6 text-center">
            <Text variant="body" className="text-gray-600">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="text-brand-blue hover:text-brand-blue-dark font-medium">
                회원가입하기
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
