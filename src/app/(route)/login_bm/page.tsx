'use client'

import GrayButtonBox from "@/app/components/common/GrayButtonBox";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Divider from "@/app/components/common/Divider";
import FormInput from "@/app/components/common/FormInput";
import Cookies from 'js-cookie';
import { fetchData } from "@/app/lib/axios";



interface FieldValue {
  email: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  // todo: 서버주소 관리 할 곳 찾아보기
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValue>();

  const goLoginPage = (provider: string) => {
    window.open(`http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/${provider}`, '_self');
  }

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
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center h-20 border-b border-[#E8E9EB]">
        <div className="mx-auto w-full max-w-[1200px] px-[120px] flex flex-row gap-5">
          <div className="w-[152px] h-10 bg-[#E8E9EB] flex items-center justify-center">
          </div>
          <span className="text-sm">로그인 및 회원가입</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 mt-[60px] ">
        <h1 className="text-center text-lg mb-[40px]">
          일본 여행을 위한<br />
          리뷰 서비스, 피크니
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(loginEvent)} className="w-full max-w-[393px] space-y-4">
          <FormInput
            name="email"
            placeholder="이메일"
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
          <FormInput
            name="password"
            placeholder="비밀번호"
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
          <div className="flex items-center gap-2">
            <input
              {...register("remember")}
              type="checkbox"
              id="remember"
              className="w-4 h-4 border border-[#697175] rounded"
            />
            <label htmlFor="remember" className="text-sm text-[#697175]">
              로그인 유지
            </label>
          </div>

          {/* Login Button */}
          <GrayButtonBox width="394px" height="48px" text="로그인" type="submit" />

          {/* Find ID/PW */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-[#697175] hover:underline"
            >
              아이디 및 비밀번호 찾기
            </button>
          </div>

          {/* Divider */}
          <Divider text="또는" />

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/sign')}
              className="flex h-12 py-[11px] justify-center items-center gap-2.5 w-full text-sm text-[#697175] hover:underline rounded-lg border border-[#E8E9EB]"
            >
              이메일로 회원가입
            </button>
          </div>
        </form>

        {/* Social Login Buttons */}
        <div className="space-y-3 mt-[40px]">
          <GrayButtonBox width="394px" height="48px" text="카카오로 계속하기" onClick={() => goLoginPage('kakao')} />
          <GrayButtonBox width="394px" height="48px" text="네이버로 계속하기" onClick={() => goLoginPage('naver')} />
          <GrayButtonBox width="394px" height="48px" text="구글로 계속하기" onClick={() => goLoginPage('google')} />
        </div>
      </main>
    </div>
  );
}