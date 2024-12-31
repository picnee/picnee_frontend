import CommonButton from "@/components/common/button/CommonButton";
import Icon from "@/public/svgs/Icon";
import { useState } from "react";

const InfoWithActions = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <div className="pt-[20px] pb-[10px] pl-[24px] pr-[24px]">
      <p className="font-500 text-3xl">Rojiura Curry SAMURAI - Harajuku</p>
      <div className="flex gap-[10px]">
        <p className="font-500 text-gray-400 text-base mr-[5px]">음식점</p>
        <div className="flex">
          <div className="mt-[4px] mr-[3px]">
            <Icon iconName="star" />
          </div>
          <p className="text-base font-600">4.5</p>
        </div>
        <div className="flex">
          <p className="font-500 text-gray-400 text-base">리뷰</p>
          <p className="text-base font-600 ml-[5px]">24</p>
        </div>
      </div>
      <div className="flex gap-[8px] mt-[22px]">
        <CommonButton
          variant="ghost_btn_gray"
          text="저장"
          width="164px"
          height="40px"
          hasIcon={true}
          iconName=""
          onClick={() => setIsClicked((prev) => !prev)}
          isClicked={isClicked}
        />
        <CommonButton
          variant="ghost_btn_gray"
          text="공유"
          width="164px"
          height="40px"
          hasIcon={true}
          iconName=""
        />
      </div>
    </div>
  );
};

export default InfoWithActions;
