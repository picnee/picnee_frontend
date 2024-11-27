"use client";
import MenuBox from "@/components/common/menu/MenuBox";
import SelectBox from "@/components/common/select/SelectBox";
import { useEffect, useState } from "react";

const SideBarNav = () => {
  const [selectedCityOption, setSelectedCityOption] = useState<string>("");
  const [selectedCategoryMenu, setSelectedCategoryMenu] = useState<string>("");
  const [selectedWriteMenu, setSelectedWriteMenu] = useState<string>("");

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
    { key: 2, value: "댓글 단 글" },
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
          <MenuBox
            option={categoryOption}
            selectedOption={selectedCategoryMenu}
            setSelectedOption={setSelectedCategoryMenu}
            isDefaultCheck={true}
          />
        </div>
      </div>
      <div>
        <div className="w-[full] h-[auto] p-[16px] border border-gray-150 rounded-m">
          <MenuBox
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
