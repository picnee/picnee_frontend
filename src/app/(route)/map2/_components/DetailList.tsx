import Tab from "@/components/common/tab/Tab";
import { memo, useEffect, useRef, useState } from "react";
import TipList from "./TipList";
import InfoWithActions from "./InfoWithActions";
import AboutPlace from "./AboutPlace";
import CommonButton from "@/components/common/button/CommonButton";
import Review from "./Review";
import RoundButton from "@/components/common/button/RoundButton";
import ScrollHeader from "./ScrollHeader";

interface Props {
  handleSelectedSearchList: (value: string) => void;
}

const DetailList = ({ handleSelectedSearchList }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className="w-[384px] h-[670px] 2xl:h-[785px] mt-[130px] ml-[32px] rounded-m bg-white overflow-y-scroll overflow-x-hidden"
    >
      <ScrollHeader
        divRef={divRef}
        handleSelectedSearchList={handleSelectedSearchList}
      />
      <InfoWithActions />
      <Tab list={["정보", "리뷰", "사진"]} />
      <AboutPlace />
      <div className="w-[384px] h-[8px] bg-gray-100"></div>
      <TipList />
      <div className="border-b-2 border-gray-100"></div>
      <div className="pt-[28px] pl-[24px] pb-[20px] pr-[24px]">
        <CommonButton
          variant="ghost_btn"
          hasIcon={false}
          text="리뷰 작성하기"
          width="336px"
          height="56px"
        />
      </div>
      <Review />
    </div>
  );
};

export default memo(DetailList);
