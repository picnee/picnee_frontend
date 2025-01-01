import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'gray-30' : '#FBFCFE',
		    'gray-50' : '#F8F9FC',
        'gray-100':'#F2F4F7',
        'gray-150': '#E7EAEF', // 버튼 비활성화 색상
        'gray-200':'#D3D8DE', // 버튼 비활성화 border 색상
        'gray-300': '#B8BEC7', // 버튼 비활성화 텍스트 색상
        'gray-400':'#9DA5AF',
        'gray-500':'#7C8897',
        'gray-600':'#63707D',
        'gray-700':'#4B535D',
        'gray-800':'#32373E',
		    'gray-900':'#23252A',
		    'red' : '#FF0000',
		    'green' : '#00D900',
        'skyblue' : '#1AB6FF',
      semantic: {
        'green': '#00C73C',
        'blue': '#3D84FF',
        'red': '#FF4D4D',
        'yellow': '#FFE433',
      },
      primary: {
        'skyblue-30': '#F5FCFF',
        'skyblue-50': '#E5F7FF',
        'skyblue-100': '#B3E7FF',
        'skyblue-200': '#80D7FF',
        'skyblue-300': '#53CBFE',
        'skyblue-400': '#1AB6FF',
        'skyblue-500': '#00A5FE',
        'skyblue-600': '#0091E5',
        'skyblue-700': '#0573B8',
        'skyblue-800': '#0B4065',
        'skyblue-900': '#0F293D',
      }, 
      },
      fontSize: {
        '6xl': [
          '42px',
          {
            lineHeight: '54px',
          },
        ],
        '5xl': [
          '32px',
          {
            lineHeight: '46px',
          },
        ],
        '4xl': [
          '24px',
          {
            lineHeight: '34px',
          },
        ],
        '3xl': [
          '20px',
          {
            lineHeight: '30px',
          },
        ],
        '2xl': [
          '18px',
          {
            lineHeight: '28px',
          },
        ],
        xl: [
          '17px',
          {
            lineHeight: '27px',
          },
        ],
        lg: [
          '16px',
          {
            lineHeight: '26px',
          },
        ],
        base: [
          '15px',
          {
            lineHeight: '25px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '21px',
          },
        ],
        xs: [
          '13px',
          {
            lineHeight: '20px',
          },
        ],
        '2xs': [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
      },
      borderRadius: {
        md: '20px',
        m: '10px',
        sm: '8px',
        xs: '4px',
        base: '16px',
      },
      fontWeight: {
        600: '600',
        400: '400',
      },
      boxShadow: {
        selectShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        custom: '0px 1px 4px 0px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // line-clamp 플러그인
    require('tailwind-scrollbar-hide'), // scrollbar-hide 플러그인
  ],
};
export default config;
