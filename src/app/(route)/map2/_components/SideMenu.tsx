"use client";

import { URL } from "@/constants/url";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, memo } from "react";

const menuList = [
  {
    menu: "저장됨",
  },
  {
    menu: "죄근",
  },
  {
    menu: "리뷰 작성",
  },
  {
    menu: "내 리뷰",
  },
];

interface PropsType {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  setShowSearchPanel: Dispatch<SetStateAction<boolean>>;
}
const SideMenu = ({ setSelectedMenu, setShowSearchPanel }: PropsType) => {
  const navigator = useRouter();
  const onClickMenu = (selectedMenu: string) => {
    setShowSearchPanel((prev) => !prev);
    setSelectedMenu(selectedMenu);
  };

  return (
    <div className="bg-white border border-gray-150 pt-[25px] h-[100vh]">
      <div onClick={() => navigator.push(URL.MAIN.BASE)}>
        <span className="block w-[28px] h-[28px] bg-gray-100 m-auto mb-[10px]"></span>
        <p className="text-center pb-[10px] border-b border-b-gray-100 text-2xs font-400">
          홈
        </p>
      </div>
      {menuList.map((list) => (
        <div
          key={list.menu}
          className="mt-[20px] cursor-pointer"
          onClick={() => onClickMenu(list.menu)}
        >
          <span className="block w-[28px] h-[28px] bg-gray-100 m-auto mb-[10px]"></span>
          <p className="text-center pb-[10px] text-2xs font-400">{list.menu}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(SideMenu);
