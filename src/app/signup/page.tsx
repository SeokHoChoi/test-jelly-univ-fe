'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@/components/common/Text';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { useAuthContext } from '@/contexts/AuthContext';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>();
  const { register: registerUser, isLoading } = useAuthContext();
  // const router = useRouter();
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setSubmitError('');
      setSubmitSuccess('');

      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        setSubmitSuccess('회원가입 성공! 잠시 후 홈으로 이동합니다...');
        // 성공 메시지를 보여준 후 Header의 useEffect가 리다이렉트 처리하도록 약간의 지연
        setTimeout(() => {
          // Header의 useEffect가 처리하도록 빈 함수 (실제 리다이렉트는 Header에서)
        }, 1500);
      } else {
        setSubmitError(result.error || '회원가입에 실패했습니다.');
      }
    } catch {
      setSubmitError('회원가입 중 오류가 발생했습니다.');
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
                  회원가입
                </Text>
                <Text variant="body" className="text-gray-600 mt-2">
                  <span className="font-semibold tracking-wide mr-[0.2px]">Jelly University</span>와 함께 시작하세요
                </Text>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>이름
              </label>
              <input
                {...register('name', { required: '이름을 입력해주세요' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="홍길동"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>이메일
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
                <span className="text-red-500 mr-1">*</span>비밀번호
              </label>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다'
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
                    message: '비밀번호는 영문과 숫자를 포함해야 합니다'
                  }
                })}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="8자 이상, 영문+숫자 포함"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>비밀번호 확인
              </label>
              <input
                {...register('confirmPassword', {
                  required: '비밀번호 확인을 입력해주세요',
                  validate: (value) => value === password || '비밀번호가 일치하지 않습니다'
                })}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="비밀번호를 다시 입력하세요"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  {...register('agreeTerms', { required: '이용약관에 동의해주세요' })}
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  <span className="text-red-500 mr-1">*</span>
                  <Link href="/terms" className="text-brand-blue hover:text-brand-blue-dark">
                    이용약관
                  </Link>
                  에 동의합니다 (필수)
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>
              )}

              <label className="flex items-start">
                <input
                  {...register('agreePrivacy', { required: '개인정보처리방침에 동의해주세요' })}
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  <span className="text-red-500 mr-1">*</span>
                  <Link href="/privacy" className="text-brand-blue hover:text-brand-blue-dark">
                    개인정보처리방침
                  </Link>
                  에 동의합니다 (필수)
                </span>
              </label>
              {errors.agreePrivacy && (
                <p className="text-red-500 text-sm">{errors.agreePrivacy.message}</p>
              )}
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
              {isLoading ? '회원가입 중...' : '회원가입'}
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
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-brand-blue hover:text-brand-blue-dark font-medium">
                로그인하기
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
