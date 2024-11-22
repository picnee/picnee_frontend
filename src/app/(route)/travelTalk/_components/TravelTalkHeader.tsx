"use client";
import CommonButton from "@/components/common/CommonButton";
import { useState } from "react";

const TravelTalkHeader = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("최신순");
  // 검색필터
  const filter = ["최신순", "조회순", "댓글순"];

  const handleFilter = (filterType: string) => {
    setSelectedFilter(filterType);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-8">
        <p className="text-5xl font-bold mr-[155px]">여행 토크</p>
        <div className="text-lg flex gap-2 mt-[18px]">
          {filter.map((item) => (
            <div key={item}>
              <p
                className={`cursor-pointer ${
                  selectedFilter === item
                    ? "text-black font-bold"
                    : "text-gray-400"
                }`}
                onClick={() => handleFilter(item)}
              >
                {item} &nbsp;
                {item !== "댓글순" && <span className="text-gray-150">⎟</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <CommonButton variant="solid_btn" size="m">
          글쓰기
        </CommonButton>
      </div>
    </div>
  );
};

export default TravelTalkHeader;
