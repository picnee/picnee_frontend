"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/zustand/useUserStore";
import CommonButton from "./CommonButton";

const LocalNavBar = ({
  type,
  onClick,
}: {
  type: string;
  onClick: (path: string) => void;
}) => {
  return (
    <div
      className={`absolute  top-3 mt-10 bg-neutral-50 text-sm group-hover:h-[202px] h-0 overflow-hidden transition-all duration-200 rounded-b-lg group-hover:border
    ${type === "T" ? "w-[115px] -left-2" : "w-[135px] -left-5 "}`}
    >
      <ul className="flex flex-col justify-center gap-2 p-3 ">
        <li
          className="flex gap-2 h-10 items-center "
          onClick={() => onClick("/login")}
        >
          <div className="w-6 h-6 bg-neutral-200"></div>
          {type === "T" ? "맛집" : "리뷰 작성"}
        </li>
        <li className="flex gap-2 h-10 items-center">
          <div className="w-6 h-6 bg-neutral-200"></div>
          {type === "T" ? "숙소" : "마이 리뷰"}
        </li>
        <li className="flex gap-2 h-10 items-center">
          <div className="w-6 h-6 bg-neutral-200"></div>
          {type === "T" ? "관광지" : "저장된 리뷰"}
        </li>
        <li className="flex gap-2 h-10 items-center">
          <div className="w-6 h-6 bg-neutral-200"></div>
          {type === "T" ? "여행기" : "평가한 리뷰"}
        </li>
      </ul>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  // 페이지 이동
  const navigator = useRouter();

  const handleLogin = () => {
    navigator.push("/login");
  };

  const handleNav = (nav: string) => {
    navigator.push(nav);
  };

  return (
    <header className="flex flex-col justify-center ">
      <div className="border-b w-[100vw] flex justify-center pt-[15px] pb-[15px]">
        <nav className="w-[1280px] flex items-center justify-between px-[40px] ">
          <ul className="w-[1280px] flex gap-[32px] font-semibold  h-10 items-center text-center">
            <li className="cursor-pointer">
              <div className="w-[120px] h-[32px] bg-neutral-200 rounded-lg text-sm flex justify-center items-center">
                Picnee
              </div>
            </li>
            <li
              className="cursor-pointer transition-all duration-200 text-neutral-600  hover:text-black "
              onClick={() => handleNav("/")}
            >
              지도
            </li>
            <li
              className="cursor-pointer transition-all duration-200 hover:text-black text-neutral-600"
              onClick={() => handleNav("/travelTalk")}
            >
              여행토크
            </li>
            <div className="flex items-center justify-between mt-[18px] gap-[8px] ml-auto justify-items-end">
              <CommonButton
                variant="solid_btn"
                size="ms"
                bgColor="gray-150"
                fontColor="black"
                fontSize="14px"
              >
                리뷰 생성
              </CommonButton>
              <CommonButton
                variant="ghost_btn"
                onClick={handleLogin}
                size="ls"
                fontSize="14px"
              >
                {isAuthenticated
                  ? `환영합니다! ${user?.name}님`
                  : "로그인 및 회원가입"}
              </CommonButton>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
