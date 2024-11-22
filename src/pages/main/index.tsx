"use client";

import BestReviewRestaurant from "./_components/BestReviewRestaurant";
import LocationBox from "./_components/LocationBox";
import MainCategoryBox from "./_components/MainCategoryBox";
import MainInputBox from "./_components/MainInputBox";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "@/lib/axios";
import { useUserStore } from "@/store/zustand/useUserStore"
import { useAuth } from "@/hooks/useAuth"


const Main = () => {

  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser)
  const { setCookies } = useAuth();
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
        setCookies(response.data.accessToken, response.data.refreshToken)
        setUser({
          name: response.data.userRes.nickName,
        });
        // 로그인 성공 시 히스토리 정리 후 홈으로 이동
        // oauth 페이지에서 의도치 않은 에러방지 
        window.history.replaceState(null, '', '/');
        router.replace('/');
      } else {
        console.error('로그인 실패:', response.data);
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }, [router, setUser, setCookies]);

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
