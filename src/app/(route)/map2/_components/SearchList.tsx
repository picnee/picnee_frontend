import SpeechBubble from "@/components/common/speechBubble/SpeechBubble";
import Icon from "@/public/svgs/Icon";
import { memo } from "react";

interface DataType {
  searchListData: {
    title: string;
    category: string;
    openState: string;
    score: string;
    review: string;
    id: string;
    reviewText: string;
  };
  handleSelectedSearchList: (value: string) => void;
}

const SearchList = ({ searchListData, handleSelectedSearchList }: DataType) => {
  return (
    <div
      className="pl-[20px] pr-[20px] pt-[16px] pb-[16px] hover:bg-[#F1F3F666] transition-colors duration-[300ms] cursor-pointer"
      onClick={() => handleSelectedSearchList(searchListData.id)}
    >
      <div className="flex justify-between">
        <div className="w-[80px] h-[80px] bg-gray-150 rounded-sm"></div>
        <div className="mt-[5px]">
          <p
            title={searchListData.title}
            className="text-lg font-500 w-[265px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {searchListData.title}
          </p>
          <p className="text-sm font-500 text-gray-500">
            {searchListData.category}
          </p>
          <div className="flex gap-[10px]">
            <p className="text-sm font-500 text-[#00CA00]">
              {searchListData.openState}
            </p>
            <div className="flex">
              <div className="mt-[3px] mr-[3px]">
                <Icon iconName="star" />
              </div>
              <p className="text-sm font-600"> {searchListData.score}</p>
            </div>
            <p className="text-sm font-500 text-gray-500">
              리뷰
              <span className="text-sm font-600 text-black">
                &nbsp;{searchListData.review}
              </span>
            </p>
          </div>
        </div>
        <div>
          <Icon iconName="bookmark" />
        </div>
      </div>
      <div className="mt-[16px]">
        <SpeechBubble
          hasAvatar={true}
          id={searchListData.id}
          text={searchListData.reviewText}
        />
      </div>
    </div>
  );
};

export default memo(SearchList);
