'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from 'react';

export default function LoginPage() {
  const router = useRouter();

  const goLoginPage = (provider: string) => {
    window.open(`http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/${provider}`, '_self');
  }

  return (

    <main className="flex flex-col items-center px-4 mt-[60px]">
      <h1 className="text-center text-2xl font-bold mb-[56px]">
        일본 여행을 위한<br />
        리뷰 서비스, 피크니
      </h1>



      {/* Social Login Buttons */}
      <div className="space-y-3 w-full max-w-[384px]">
        <button
          onClick={() => goLoginPage('kakao')}
          className="w-full h-[48px] bg-[#FEE500] rounded-lg flex items-center justify-center gap-2"
        >
          <Image src="/Logo/kakao.svg" alt="카카오 로고" width={24} height={24} />
          <span className="text-[#191919]">카카오로 시작하기</span>
        </button>

        <button
          onClick={() => goLoginPage('naver')}
          className="w-full h-[48px] bg-[#03C75A] rounded-lg flex items-center justify-center gap-2"
        >
          <Image src="/Logo/naver.svg" alt="네이버 로고" width={24} height={24} />
          <span className="text-white">네이버로 시작하기</span>
        </button>

        <button
          onClick={() => goLoginPage('google')}
          className="w-full h-[48px] bg-white border border-[#E8E9EB] rounded-lg flex items-center justify-center gap-2"
        >
          <Image src="/Logo/google.svg" alt="구글 로고" width={24} height={24} />
          <span className="text-[#191919]">구글로 시작하기</span>
        </button>

        <button
          onClick={() => router.push('/login/email')}
          className="w-full h-[48px] bg-white border border-[#E8E9EB] rounded-lg flex items-center justify-center gap-2"
        >
          <span className="text-[#191919]">이메일로 시작하기</span>
        </button>
      </div>


    </main>
  );
}