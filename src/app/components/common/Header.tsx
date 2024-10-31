"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

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
  // 사용자 정보
  const { data: session } = useSession();
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
      <div className="border-b w-[100vw] flex justify-center">
        <nav className="w-[1280px] h-[81px]  flex items-center justify-between px-[40px] ">
          <ul className="w-[600px] grid grid-cols-5 gap-8 font-semibold  h-10 items-center text-center">
            <li className="cursor-pointer">
              <div className=" h-10 bg-neutral-200 rounded-lg text-sm flex justify-center items-center">
                Picnee
              </div>
            </li>
            <li
              className="cursor-pointer transition-all duration-200 text-neutral-600  hover:text-black "
              onClick={() => handleNav("/")}
            >
              지도
            </li>
            <li className="cursor-pointer transition-all duration-200   group relative text-neutral-600 hover:text-black">
              <div className="flex  items-center justify-center gap-1 ">
                <span>여행</span>
                <div className="group-hover:rotate-180 transition-transform">
                  <IoIosArrowDown />
                </div>
              </div>
              <LocalNavBar type="T" onClick={handleNav} />
            </li>
            <li className="cursor-pointer transition-all duration-200  group relative text-neutral-600 hover:text-black">
              <div className="flex  items-center justify-center gap-1 ">
                <span>리뷰</span>
                <div className="group-hover:rotate-180 transition-transform">
                  <IoIosArrowDown />
                </div>
              </div>
              <LocalNavBar type="R" onClick={handleNav} />
            </li>
            <li
              className="cursor-pointer transition-all duration-200 hover:text-black text-neutral-600"
              onClick={() => handleNav("/")}
            >
              소셜 라운지
            </li>
          </ul>
          <div>
            {session ? (
              <div>
                <p>안녕하세요, {session.user!.name}님!</p>
                <button
                  className="border border-black rounded-md p-[5px]"
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="border border-neutral-300 rounded-md py-2 px-3 hover:bg-neutral-100 transition-colors font-semibold hover:border-black/30"
              >
                로그인 및 회원가입
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
