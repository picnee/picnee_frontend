import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 프론트엔드 요청 경로
        destination: 'http://www.picknee.co.kr:8080/:path*', // 백엔드 API 경로
      },
    ];
  },
};

export default nextConfig;