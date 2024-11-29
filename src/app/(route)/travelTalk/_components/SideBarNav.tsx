"use client";
import MenuButton from "@/components/common/menu/MenuButton";
import SelectBox from "@/components/common/select/SelectBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PropsType {
  selectedCityOption: string;
  setSelectedCityOption: Dispatch<SetStateAction<string>>;
  selectedCategoryMenu: string;
  setSelectedCategoryMenu: Dispatch<SetStateAction<string>>;
  selectedWriteMenu: string;
  setSelectedWriteMenu: Dispatch<SetStateAction<string>>;
}

const SideBarNav = ({
  selectedCityOption,
  setSelectedCityOption,
  selectedCategoryMenu,
  setSelectedCategoryMenu,
  selectedWriteMenu,
  setSelectedWriteMenu,
}: PropsType) => {
  useEffect(() => {
    if (selectedCategoryMenu !== "") {
      setSelectedWriteMenu("");
    }
  }, [selectedCategoryMenu]);

  useEffect(() => {
    if (selectedWriteMenu !== "") {
      setSelectedCategoryMenu("");
    }
  }, [selectedWriteMenu]);

  const cityOption = [
    { key: 1, value: "도쿄" },
    { key: 2, value: "오사카" },
    { key: 3, value: "교토" },
    { key: 4, value: "후쿠오카" },
    { key: 5, value: "후카이도" },
  ];

  const categoryOption = [
    { key: 1, value: "전체글" },
    { key: 2, value: "날씨" },
    { key: 3, value: "숙소" },
    { key: 4, value: "맛집" },
    { key: 5, value: "교통" },
    { key: 6, value: "관광지" },
    { key: 7, value: "자유토크" },
  ];

  const writeOption = [
    { key: 1, value: "내가 쓴 글" },
    { key: 2, value: "내가 쓴 댓글" },
  ];

  return (
    <div>
      <div className="mb-[16px]">
        <SelectBox
          option={cityOption}
          setSelectedOption={setSelectedCityOption}
          optionWidth="283px"
        />
      </div>
      <div className="mb-[16px]">
        <div className="w-[full] h-[auto] p-[16px] border border-gray-150 rounded-m">
          <MenuButton
            option={categoryOption}
            selectedOption={selectedCategoryMenu}
            setSelectedOption={setSelectedCategoryMenu}
            isDefaultCheck={true}
          />
        </div>
      </div>
      <div>
        <div className="w-[full] h-[auto] p-[16px] border border-gray-150 rounded-m">
          <MenuButton
            option={writeOption}
            selectedOption={selectedWriteMenu}
            setSelectedOption={setSelectedWriteMenu}
            isDefaultCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
