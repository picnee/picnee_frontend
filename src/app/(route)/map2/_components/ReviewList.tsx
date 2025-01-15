import RoundButton from "@/components/common/button/RoundButton";
import Icon from "@/public/svgs/Icon";
import { useCallback, useState } from "react";
import { BestReviewType } from "./Review";
import ReviewByTypeData from "./ReviewByTypeData";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";

const iconList = [{}, {}, {}, {}, {}];
const categoryList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const ReviewList = ({
  bestReviewData,
  type,
}: {
  bestReviewData: BestReviewType;
  type: string;
}) => {
  const ReviewListByType = useCallback(() => {
    return [
      {
        icon: "",
        type: "좋앗던 점",
        content: `${bestReviewData.touristSpotRes.goodPoints}${bestReviewData.touristSpotRes.goodPoints}${bestReviewData.touristSpotRes.goodPoints}${bestReviewData.touristSpotRes.goodPoints}${bestReviewData.touristSpotRes.goodPoints}${bestReviewData.touristSpotRes.goodPoints}`,
      },
      {
        icon: "",
        type: "아쉬웠던 점",
        content: `${bestReviewData.touristSpotRes.lowPoints}`,
      },
      {
        icon: "",
        type: "장소 팁",
        content: `${bestReviewData.touristSpotRes.placeTips}`,
      },
    ];
  }, [bestReviewData]);

  return (
    <>
      <div className="pt-[24px] mr-[24px] ml-[24px]">
        <div className="flex gap-[8px] items-center mb-[13px]">
          <div className="w-[37px] h-[37px] bg-gray-200 rounded-full"></div>
          <div>{bestReviewData.touristSpotRes.userRes.nickName}</div>
          <div>
            {type === "베스트 리뷰" && (
              <RoundButton
                text="1등 리뷰"
                hasIcon={false}
                height="22px"
                pt="0px"
                pb="0px"
                pl="8px"
                pr="8px"
                fontSize="12px"
                borderColor="#1AB6FF"
                textColor="#1AB6FF"
                bgColor="#E5F7FF"
              />
            )}
          </div>
          <div className="ml-auto">
            <Icon iconName="moreIcon" />
          </div>
        </div>
        <div className="flex gap-[2px] items-center mb-[16px]">
          {iconList.map((item, index) => (
            <span
              key={index}
              className="w-[20px] h-[20px] border border-gray-400 rounded-[4px]"
            ></span>
          ))}
          <p className="ml-[4px] text-gray-400 text-sm font-500">
            • {useFormatTimeAgo(bestReviewData.touristSpotRes.createdAt)}
          </p>
        </div>
        {ReviewListByType().map((item, index) => (
          <ReviewByTypeData item={item} key={index} />
        ))}
      </div>
      <div className="w-full overflow-x-auto mb-[22px] mt-[10px] ml-[24px] scrollbar-hide">
        <div className="flex flex-wrap gap-[px] w-[600px]">
          {categoryList.map((item, index) => (
            <span
              key={index}
              className="font-500 text-xs text-gray-300 inline-block pr-[6px]"
            >
              <span className="font-500 text-xs bg-gray-100 px-[12px] py-[2px] inline-block rounded-[6px] mb-[6px]">
                일이삼사오육칠팔구십
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="w-[full] h-[224px] bg-gray-100"></div>

      <div>
        <button className="font-600 text-lg w-[192px] h-[51px] border-r border-r-gray-100 border-b border-b-gray-100">
          도움 되었어요 <span className="font-500 text-sm">40</span>
        </button>
        <button className="font-600 text-lg w-[192px] h-[51px] border-b border-b-gray-100">
          별로에요 <span className="font-500 text-sm text-gray-300">0</span>
        </button>
      </div>
    </>
  );
};

export default ReviewList;
