import RoundButton from "@/components/common/button/RoundButton";
import Icon from "@/public/svgs/Icon";
import { useState } from "react";

const iconList = [{}, {}, {}, {}, {}];
const reviewList = [
  {
    icon: "",
    type: "좋앗던 점",
    content:
      "세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.",
  },
  {
    icon: "",
    type: "아쉬웠던 점",
    content:
      "세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.",
  },
  {
    icon: "",
    type: "장소 팁",
    content:
      "세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다. 세 줄 이상일 때 더 보기 버튼 추가됩니다.",
  },
];
const categoryList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const ReviewList = () => {
  const [showMoreStates, setShowMoreStates] = useState<boolean[]>(
    new Array(reviewList.length).fill(false)
  );

  const handleClickMoreButton = (index: number) => {
    setShowMoreStates(
      showMoreStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <>
      <div className="pt-[24px] mr-[24px] ml-[24px]">
        <div className="flex gap-[8px] items-center mb-[13px]">
          <div className="w-[37px] h-[37px] bg-gray-200 rounded-full"></div>
          <div>피크니</div>
          <div>
            <RoundButton
              text="1등 리뷰"
              hasIcon={false}
              height="22px"
              pt="0px"
              pb="0px"
              pl="8px"
              pr="8px"
              fontSize="12px"
            />
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
          <p className="ml-[4px] text-gray-400 text-sm font-500">• 3일 전</p>
        </div>
        {reviewList.map((item, index) => (
          <div key={item.type}>
            <div className="flex gap-[8px] mb-[8px]">
              <div className="w-[22px] h-[22px] bg-gray-100"></div>
              <p className="font-600 text-xs text-gray-400">{item.type}</p>
            </div>
            <div className="">
              <p
                className={`font-400 text-base ${
                  !showMoreStates[index] && "line-clamp-3"
                }`}
              >
                {item.content}
              </p>
            </div>
            <button
              className="text-primary-skyblue-400 text-base font-600 mb-[12px]"
              onClick={() => handleClickMoreButton(index)}
            >
              {showMoreStates[index] ? "접기" : "더보기"}
            </button>
          </div>
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
