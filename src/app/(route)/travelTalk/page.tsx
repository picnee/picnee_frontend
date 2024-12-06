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
import {
  useTravelTalkCategoryStore,
  useTravelTalkStore,
} from "@/store/zustand/useTravelTalkStore";

const TravelTalk = () => {
  // TravelTalkHeader 관련 상태
  const [selectedFilter, setSelectedFilter] = useState<string>("최신순");
  // Pagination 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 선택된 페이지
  const itemsPerPage = 10; // 페이지별 아이템 수
  // sideBar 지역 전역상태
  const { selectBoxStates } = useTravelTalkStore();
  // sideBar 카테고리 전역상태
  const { selectCategoryStates } = useTravelTalkCategoryStore();

  // api 호출
  const { data: getTravelTalkList }: UseQueryResult<any> = useQuery(
    GetTravelTalkListOptions({
      boardCategory:
        selectCategoryStates === "전체글" ? "" : selectCategoryStates,
      region:
        selectBoxStates["sideBarRegion"] === "전체"
          ? ""
          : selectBoxStates["sideBarRegion"],
      page: 0,
    })
  );

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
          <SideBarNav />
        </div>
        <div className="col-span-3">
          {selectBoxStates["sideBarCategory"] !== "내가 쓴 댓글" ? (
            <TalkList
              data={getTravelTalkList && getTravelTalkList.content}
              selectedWriteMenu={selectBoxStates["sideBarCategory"]}
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
