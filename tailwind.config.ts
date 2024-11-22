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
        'gray-100':'#F1F3F6',
        'gray-150': '#E8E9EB', // 버튼 비활성화 색상
        'gray-200':'#D2D5D6', // 버튼 비활성화 border 색상
        'gray-300': '#B8BFC2', // 버튼 비활성화 텍스트 색상
        'gray-400':'#A1A9AD',
        'gray-500':'#828A8F'
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

    },
  },
  plugins: [],
};
export default config;
