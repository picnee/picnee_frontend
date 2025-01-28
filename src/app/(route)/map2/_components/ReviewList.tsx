import RoundButton from "@/components/common/button/RoundButton";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { BestReviewType } from "./Review";
import ReviewByTypeData from "./ReviewByTypeData";
import MoreMenu from "../../travelTalk/detail/[postId]/_components/MoreMenu";
import { useUserStore } from "@/store/zustand/useUserStore";
import { DeletePropsType } from "../page";
import FormatTimeAgo from "@/utils/FormatTimeAgo";

const iconList = [{}, {}, {}, {}, {}];
const categoryList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const ReviewList = ({
  bestReviewData,
  type,
  rank,
  setReviewData,
}: {
  bestReviewData: BestReviewType;
  type: string;
  rank?: number;
  setReviewData: Dispatch<SetStateAction<DeletePropsType>>;
}) => {
  // 현재 활성화된 리뷰 더보기 메뉴 show/hide 상태 관리
  const [showMoreMenu, setShowMoreMenu] = useState<string>("");
  // 로그인한 유저 정보
  const { user } = useUserStore();

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
                text={
                  rank === 0 ? "1등 리뷰" : rank === 1 ? "2등 리뷰" : "3등 리뷰"
                }
                hasIcon={false}
                height="22px"
                pt="0px"
                pb="0px"
                pl="8px"
                pr="8px"
                fontSize="12px"
                borderColor={rank === 0 ? "#1AB6FF" : "#0DDBFF"}
                textColor={rank === 0 ? "#1AB6FF" : "#00CCF5"}
                bgColor={rank === 0 ? "#E5F7FF" : "#E0FBFF"}
              />
            )}
          </div>
          <div
            className="relative w-[17px] h-[6px] ml-auto cursor-pointer"
            onClick={() =>
              setShowMoreMenu(bestReviewData.touristSpotRes.reviewId)
            }
          >
            <div>
              <Icon iconName="moreIcon" />
            </div>
            {showMoreMenu === bestReviewData.touristSpotRes.reviewId && (
              <MoreMenu
                isMyComment={
                  bestReviewData.touristSpotRes.userRes.userId === user?.userId
                  // true
                }
                handleCloseMenu={() => setShowMoreMenu("")}
                handleClickModifyButton={() => {
                  console.log("수정");
                }}
                handleClickDeleteButton={() =>
                  setReviewData({
                    isShowConfirmModal: true,
                    id: bestReviewData.touristSpotRes.reviewId,
                  })
                }
                handleClickReportButton={() => console.log("신고요")}
              />
            )}
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
            • {FormatTimeAgo(bestReviewData.touristSpotRes.createdAt)}
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
