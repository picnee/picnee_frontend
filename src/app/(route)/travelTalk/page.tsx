"use client";
import Pagination from "@/components/common/Pagination";
import SideBarNav from "./_components/SideBarNav";
import TalkList from "./_components/TalkList";
import TravelTalkHeader from "./_components/TravelTalkHeader";
import { useEffect, useState } from "react";
import MyCommentTalkList from "./_components/MyCommentTalkList";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { GetTravelTalkListOptions } from "@/api/travelTalk/query-options";

interface dataType {
  sticker: string;
  title: string;
  content: string;
  watch: string;
  like: string;
  nickname: string;
  time: string;
}

interface commentDataType {
  comment: string;
  sticker: string;
  title: string;
  date: string;
}
const TravelTalk = () => {
  // TravelTalkHeader 관련 상태
  const [selectedFilter, setSelectedFilter] = useState<string>("최신순");
  // Pagination 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 선택된 페이지
  const itemsPerPage = 10; // 페이지별 아이템 수
  // SideBarNav 관련 상태
  const [selectedCityOption, setSelectedCityOption] = useState<string>("");
  const [selectedCategoryMenu, setSelectedCategoryMenu] = useState<string>("");
  const [selectedWriteMenu, setSelectedWriteMenu] = useState<string>("");
  // api 호출
  const { data: getTravelTalkList }: UseQueryResult<any> = useQuery(
    GetTravelTalkListOptions({
      boardCategory:
        selectedCategoryMenu === "전체글" ? "" : selectedCategoryMenu,
      region: selectedCityOption === "전체" ? "" : selectedCityOption,
      page: 0,
    })
  );

  // 더미 데이터
  const ITEMS = Array.from(
    { length: getTravelTalkList && getTravelTalkList.content.length },
    (_, i) => `Item ${i + 1}`
  );

  return (
    <div className="pt-[72px]">
      <div className="w-[1200px] pt-[35px] fixed bg-white z-[999]">
        <TravelTalkHeader
          hasFilter={true}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          isActiveButton={true}
        />
      </div>
      <div className="grid grid-cols-4 gap-[24px] pt-[120px]">
        <div className="col-span-1">
          <SideBarNav
            selectedCityOption={selectedCityOption}
            setSelectedCityOption={setSelectedCityOption}
            selectedCategoryMenu={selectedCategoryMenu}
            setSelectedCategoryMenu={setSelectedCategoryMenu}
            selectedWriteMenu={selectedWriteMenu}
            setSelectedWriteMenu={setSelectedWriteMenu}
          />
        </div>
        <div className="col-span-3">
          {selectedWriteMenu !== "내가 쓴 댓글" ? (
            <TalkList
              data={getTravelTalkList && getTravelTalkList.content}
              selectedWriteMenu={selectedWriteMenu}
            />
          ) : (
            <MyCommentTalkList
              data={getTravelTalkList && getTravelTalkList.content}
            />
          )}
          <div className="mt-[30px]">
            <Pagination
              totalItems={ITEMS.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTalk;
