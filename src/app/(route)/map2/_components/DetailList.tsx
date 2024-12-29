import Tab from "@/components/common/tab/Tab";
import { memo } from "react";
import TipList from "./TipList";
import InfoWithActions from "./InfoWithActions";
import AboutPlace from "./AboutPlace";
import CommonButton from "@/components/common/button/CommonButton";
import Button from "@/components/common/button/Button";

const DetailList = () => {
  return (
    <div className="w-[384px] h-[670px] 2xl:h-[785px] mt-[130px] ml-[32px] rounded-m bg-white overflow-scroll">
      <div className="h-[180px] bg-gray-100"></div>
      <InfoWithActions />
      <Tab list={["정보", "리뷰", "사진"]} />
      <AboutPlace />
      <div className="w-[384px] h-[8px] bg-gray-100"></div>
      <TipList />
      <div className="border-b-2 border-gray-100"></div>
      <div className="pt-[28px] pl-[24px] pb-[28px] pr-[24px]">
        <Button
          variant="ghost_btn"
          hasIcon={false}
          text="리뷰 작성하기"
          width="336px"
          height="56px"
        />
      </div>
    </div>
  );
};

export default memo(DetailList);
