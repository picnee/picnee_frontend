"use client";

import BestReviewRestaurant from "./_components/BestReviewRestaurant";
import LocationBox from "./_components/LocationBox";
import MainCategoryBox from "./_components/MainCategoryBox";
import MainInputBox from "./_components/MainInputBox";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "@/lib/axios";
import { useAuthStore } from '@/store/zustand/useAuthStore'
import Cookies from 'js-cookie';


const Main = () => {

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser)
  const loginEvent = useCallback(async (code: string) => {
    try {
      const response = await fetchData('/tokens', {
        method: 'POST',
        data: {
          authUUID: code
        }
      });

      if (!response) {
        console.error('응답이 없습니다.');
        alert('로그인에 실패했습니다.');
        return;
      }

      if (response.status === 201 || response.status === 200) {
        alert('로그인에 성공했습니다.');
        setTimeout(() => {
          console.log('===================================')
          const accessToken = Cookies.get('JSESSIONID');
          const refreshToken = Cookies.get('REFRESH_TOKEN');
          console.log('accessToken', accessToken)
          console.log('refreshToken', refreshToken)
          setUser({
            name: response.data.nickName,
            accessToken: accessToken as string,
            refreshToken: refreshToken as string
          });
          console.log('==================================')
          router.push('/');
        }, 1000);

      } else {
        console.error('로그인 실패:', response.data);
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }, [router, setUser]);

  useEffect(() => {
    const code = window.location.pathname.split("/")[1].replace('code=', '');
    if (code) {
      loginEvent(code);
    }
  }, [loginEvent]);


  return (
    <div className="w-[100vw] flex flex-col items-center ">
      <section className="w-[1280px] px-[40px] flex flex-col justify-center  gap-10 mt-16">
        <MainInputBox />
        <MainCategoryBox />
        <LocationBox />
      </section>
      <section className="w-[1280px] h-auto px-[40px] flex flex-col justify-center  gap-10 mt-16 ">
        <BestReviewRestaurant />
      </section>
    </div>
  );
};

export default Main;
