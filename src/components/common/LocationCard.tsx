import React from "react";

const LocationCard = ({ location }: { location: string }) => {
  return (
    <div
      className="w-[288px] h-[376px] bg-[#a1a9ad] rounded-xl hover:-translate-y-1
    transition-all hover:shadow-2xl shadow-lg cursor-pointer"
    >
      <div className="px-5 py-6 flex flex-col justify-between h-full items-start">
        <h4 className="text-2xl text-white  drop-shadow-[3px_3px_1px_rgba(0,0,0,0.3)] ">
          {location}
        </h4>
        <button className="font-semibold text-lg bg-white w-[100px] rounded-lg px-[8px] h-[36px] ">
          지도 보기
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
