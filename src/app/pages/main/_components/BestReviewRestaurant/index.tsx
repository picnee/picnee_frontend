"use client";

import ArrowButton from "@/app/components/common/ArrowButton";
import GrayButtonBox from "@/app/components/common/GrayButtonBox";

const BestReviewRestaurant = () => {
  const bestReviewData = [
    {
      restaurant: "이치란 신주쿠카부키초점",
      review: "1,000",
      place: "Tokyo, Shinjuku City",
    },
    {
      restaurant: "이치란 신주쿠카부키초점2",
      review: "1,100",
      place: "Tokyo, Shinjuku City2",
    },
    {
      restaurant: "이치란 신주쿠카부키초점3",
      review: "1,200",
      place: "Tokyo, Shinjuku City3",
    },
  ];

  /**
   * 화살표 클릭 액션
   */
  const handleClickArrowButton = () => {
    console.log("화살표 클릭");
  };

  return (
    <div className="h-auto">
      <div className="flex w-[100%] h-[32px] mb-[24px]">
        <h1 className="text-4xl font-semibold  pr-[10px]">베스트 리뷰 맛집</h1>
        <div className="">
          <select className="border text-sm border-gray-300 rounded-sm h-[32px] pl-[5px]">
            <option>도쿄 시부야</option>
            <option>도쿄 시부야2</option>
          </select>
        </div>
        <div className="ml-auto">
          <ArrowButton onClick={handleClickArrowButton} />
        </div>
      </div>
      <div className="flex w-[100%] h-[auto] mb-[24px] gap-[24px]">
        {bestReviewData.map((item, index) => (
          <div key={index}>
            <div className="w-[384px] h-[184px] border rounded-base bg-gray-200 mb-[16px]"></div>
            <div>
              <p className="text-lg font-semibold mb-[3px]">
                {item.restaurant}
              </p>
              <div className="flex gap-[4px] text-2xs text-gray-500">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    // 각 span을 반환하며 ReactNode로 인정되도록 합니다.
                    <div
                      key={index}
                      className=" w-[14px] h-[14px] mt-[0px] rounded-full bg-gray-400"
                    ></div>
                  ))}
                <span className="ml-[8px]">리뷰 {item.review}</span>
              </div>
              <p className="text-gray-500 text-xs">{item.place}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-[30px] pb-[60px]">
        <GrayButtonBox
          width="100%"
          height="48px"
          text="모아보기"
        ></GrayButtonBox>
      </div>
    </div>
  );
};

export default BestReviewRestaurant;