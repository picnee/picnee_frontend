import type { Metadata } from "next";
import AuthProvider from "@/providers/AuthProvider";
import "@/styles/global.css";
import Header from "../../components/common/Header";

export const metadata: Metadata = {
  title: "Picnee",
  description: "일본 여행을 하는 한국인 대상의 리뷰 서비스 및 정보 공유 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[100vw]">
        <AuthProvider>
          <Header />
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-[1440px] pl-[120px] pr-[120px] pb-[100px]">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
