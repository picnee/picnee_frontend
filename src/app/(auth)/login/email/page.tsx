'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import FormInput from "@/app/components/common/FormInput";
import Cookies from 'js-cookie';
import { fetchData } from "@/app/lib/axios";

interface FieldValue {
  email: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValue>();

  const loginEvent = async (data: FieldValue) => {
    try {
      const response = await fetchData('/users/login', {
        method: 'POST',
        data
      });

      console.log('로그인 응답:', response);

      if (response.accessToken) {
        Cookies.set('accessToken', response.accessToken, {
          expires: 7, // 7일간 유지
          secure: true, // HTTPS에서만 작동
          sameSite: 'strict' // CSRF 방지
        });

        Cookies.set('refreshToken', response.refreshToken, {
          expires: 30, // 30일간 유지
          secure: true,
          sameSite: 'strict'
        });

        console.log('로그인 성공, 홈으로 이동 시도');
        router.push('/');
      } else {
        console.log('로그인 실패: 토큰이 없습니다');
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[394px]">
        <h1 className="text-center text-2xl font-bold mb-[56px]">
          이메일로 로그인
        </h1>

        <form onSubmit={handleSubmit(loginEvent)} className="">

          <FormInput
            name="email"
            placeholder="이메일 입력"
            type="email"
            register={register}

            rules={{
              required: "이메일은 필수입니다",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다"
              }
            }}
            error={errors.email}
          />
          <div className="mb-4"></div>
          <FormInput
            name="password"
            placeholder="비밀번호 입력"
            type="password"
            register={register}
            rules={{
              required: "비밀번호는 필수입니다",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상이어야 합니다"
              }
            }}
            error={errors.password}
          />

          {/* Remember Me */}
          <div className="flex items-center mt-2">
            <input
              {...register("remember")}
              type="checkbox"
              id="remember"
              className="w-4 h-4 border border-[#697175] rounded"
            />
            <label htmlFor="remember" className="text-sm text-[#697175]">
              로그인 저장
            </label>
          </div>

          {/* 버튼들을 감싸는 div 추가 */}
          <div className="flex flex-col">
            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#F3F4F6] text-[#697175] rounded-lg mt-12"
            >
              로그인
            </button>

            {/* Sign Up Link */}
            <button
              type="button"
              onClick={() => router.push('/sign')}
              className="w-full h-[48px] border border-[#E8E9EB] text-[#697175] rounded-lg mt-4"
            >
              이메일로 회원가입
            </button>
          </div>

          {/* Find ID/PW Links */}
          <div className="flex justify-center gap-4 text-sm text-[#697175] mt-8">
            <button type="button" className="hover:underline">
              아이디 찾기
            </button>
            <span className="text-[#E8E9EB]">|</span>
            <button type="button" className="hover:underline">
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
