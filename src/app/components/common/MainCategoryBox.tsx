import React from "react";

const Category = ({ category }: { category: string }) => {
  return (
    <div className="w-[80px] h-[104px] flex flex-col justify-center items-center gap-1 cursor-pointer hover:-translate-y-1 transition-transform ">
      <div className="w-[56px] h-[56px] bg-neutral-200 flex justify-center items-center rounded-md">
        Icon
      </div>
      <span className="text-sm">{category}</span>
    </div>
  );
};

const MainCategoryBox = () => {
  return (
    <div className="w-full flex justify-center gap-10">
      <Category category="전체 리뷰" />
      <Category category="맛집" />
      <Category category="숙소" />
      <Category category="관광지" />
    </div>
  );
};

export default MainCategoryBox;
