import type { Metadata } from "next";
import "@/styles/global.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Picnee - 로그인",
  description: "일본 여행을 하는 한국인 대상의 리뷰 서비스 및 정보 공유 플랫폼",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* Header */}
        <header className="flex items-center h-20 border-b border-[#E8E9EB]">
          <div className="mx-auto w-full max-w-[1200px] px-[120px]">
            <div className="flex items-center gap-2">
              <Image
                src="/Logo/picnee.jpg"
                alt="피크니 로고"
                width={80}
                height={40}
                priority
              />

              <span className="text-gray-600 text-sm">로그인 및 회원가입</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white">
          <div className="w-full  px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
} 