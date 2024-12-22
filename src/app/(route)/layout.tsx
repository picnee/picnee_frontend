"use client";

import type { Metadata } from "next";
import AuthProvider from "@/providers/AuthProvider";
import "@/styles/global.css";
import Header from "../../components/common/Header";
import QueryProvider from "@/providers/QueryProvider";
import { usePathname } from "next/navigation";
import { URL } from "@/constants/url";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="w-[100vw]">
        <QueryProvider>
          <AuthProvider>
            <Header />
            <div className="flex justify-center items-center w-full h-full">
              <div
                className={`${
                  pathname !== URL.MAP.BASE &&
                  "w-[1440px] pl-[120px] pr-[120px] pb-[100px]"
                } mt-[73px]`}
              >
                {children}
              </div>
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
