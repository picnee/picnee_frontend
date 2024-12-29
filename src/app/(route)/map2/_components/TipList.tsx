import RoundButton from "@/components/common/button/RoundButton";
import { useState } from "react";

const dummyList = [
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
  {
    icon: "",
    content: "일이삼사오육칠팔구십",
  },
];

const TipList = () => {
  const [showAllList, setShowAllList] = useState<boolean>(false);
  return (
    <>
      <div
        className={` ${
          !showAllList ? "overflow-hidden h-[240px]" : "h-[auto]"
        } pt-[32px] pb-[12px] pl-[24px] pr-[24px]`}
      >
        <div className="flex justify-between mb-[20px]">
          <p className="font-600 text-2xl">미리 알아두면 좋아요</p>
          <p className="font-600 text-xs text-primary-skyblue-400 mt-[6px]">
            000명 참여
          </p>
        </div>

        {dummyList.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between ${
              index === 1 ? "mb-[28px]" : "mb-[12px]"
            } `}
          >
            <div>
              <div className="flex gap-[6px]">
                <div
                  className={`w-[24px] h-[24px] ${
                    index === 3 && !showAllList
                      ? "bg-gradient-to-t from-white/0 to-gray-100/100"
                      : "bg-gray-100"
                  }`}
                ></div>
                <p
                  className={`mt-[2px] text-sm ${
                    index === 3 && !showAllList
                      ? "bg-gradient-to-t from-white via-gray-500 to-black bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {item.content}
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-[6px]">
                <div
                  className={`w-[24px] h-[24px] ${
                    index === 3 && !showAllList
                      ? "bg-gradient-to-t from-white/0 to-gray-100/100"
                      : "bg-gray-100"
                  }`}
                ></div>
                <p
                  className={`mt-[2px] text-sm ${
                    index === 3 && !showAllList
                      ? "bg-gradient-to-t from-white via-gray-500 to-black bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div
          className="mb-[20px]"
          onClick={() => setShowAllList((prev) => !prev)}
        >
          <RoundButton hasIcon={true} />
        </div>
      </div>
    </>
  );
};

export default TipList;
