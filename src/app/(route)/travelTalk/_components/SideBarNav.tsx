"use client";
import MenuButton from "@/components/common/menu/MenuButton";
import SelectBox from "@/components/common/select/SelectBox";
import { memo } from "react";

const cityOption = [
  { key: 1, value: "도쿄" },
  { key: 2, value: "오사카" },
  { key: 3, value: "교토" },
  { key: 4, value: "고베" },
  { key: 5, value: "후쿠오카" },
  { key: 6, value: "삿포로" },
];

const categoryOption = [
  { key: 1, value: "전체글", iconName: "all-content" },
  { key: 2, value: "음식점", iconName: "restaurant" },
  { key: 3, value: "숙박", iconName: "hotel" },
  { key: 4, value: "관광지", iconName: "map" },
  { key: 5, value: "자유 토크", iconName: "talk" },
  { key: 6, value: "날씨", iconName: "weather" },
  { key: 7, value: "교통", iconName: "traffic" },
];

const writeOption = [
  { key: 1, value: "내가 쓴 글", iconName: "my-post" },
  { key: 2, value: "내가 쓴 댓글", iconName: "my-comment" },
];

const SideBarNav = () => {
  return (
    <div>
      <div className="mb-[16px]">
        <SelectBox
          option={cityOption}
          uniqueKey="sideBarRegion"
          optionWidth="283px"
        />
      </div>
      <div className="mb-[16px]">
        <div className="w-[full] h-[auto] p-[16px] border border-gray-150 rounded-m">
          <MenuButton option={categoryOption} />
        </div>
      </div>
      <div>
        <div className="w-[full] h-[auto] p-[16px] border border-gray-150 rounded-m">
          <MenuButton option={writeOption} />
        </div>
      </div>
    </div>
  );
};

export default memo(SideBarNav);
