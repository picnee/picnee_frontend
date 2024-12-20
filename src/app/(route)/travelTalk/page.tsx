"use client";
import Pagination from "@/components/common/Pagination";
import SideBarNav from "./_components/SideBarNav";
import TalkList from "./_components/TalkList";
import TravelTalkHeader from "./_components/TravelTalkHeader";
import { useCallback, useEffect, useState } from "react";
import MyCommentTalkList from "./_components/MyCommentTalkList";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  GetMyCommentsOptions,
  GetMyPostsOptions,
  GetTravelTalkListOptions,
} from "@/api/travelTalk/query-options";
import {
  useTravelTalkCategoryStore,
  useTravelTalkStore,
} from "@/store/zustand/useTravelTalkStore";

const TravelTalk = () => {
  // TravelTalkHeader 관련 상태
  const [selectedFilter, setSelectedFilter] = useState<string>("최신순");
  // Pagination 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [myPostsPage, setMyPostsPage] = useState<number>(1);
  const [myCommentsPage, setMyCommentsPage] = useState<number>(1);
  const itemsPerPage = 10; // 페이지별 아이템 수
  // sideBar 지역 전역상태
  const { selectBoxStates } = useTravelTalkStore();
  // sideBar 카테고리 전역상태
  const { selectCategoryStates } = useTravelTalkCategoryStore();

  useEffect(() => {
    // 최신순, 조회순, 댓글순 필터 선택 시 페이지 번호 초기화
    setCurrentPage(1);
    setMyPostsPage(1);
    setMyCommentsPage(1);
  }, [selectedFilter]);

  /** 카테고리, 지역별 여행토크 API 호출 */
  const { data: getTravelTalkList }: UseQueryResult<any> = useQuery(
    GetTravelTalkListOptions({
      boardCategory:
        selectCategoryStates === "전체글" ? "" : selectCategoryStates,
      region: selectBoxStates["sideBarRegion"],
      sort:
        selectedFilter === "최신순"
          ? "new"
          : selectedFilter === "조회순"
          ? "popular"
          : "comment",
      page: currentPage - 1,
    })
  );

  /** 내가 쓴 글 API 호출 */
  const { data: getMyPost }: UseQueryResult<any> = useQuery(
    GetMyPostsOptions({
      boardCategory: selectCategoryStates,
      page: myPostsPage - 1,
    })
  );

  /** 내가 쓴 댓글 API 호출 */
  const { data: getMyComment }: UseQueryResult<any> = useQuery(
    GetMyCommentsOptions({
      boardCategory: selectCategoryStates,
      page: myCommentsPage - 1,
    })
  );

  /** 카테고리별 페이지네이션 데이터 관리 */
  const paginationData = () => {
    if (selectCategoryStates === "내가 쓴 글") {
      return { data: getMyPost, page: myPostsPage, setPage: setMyPostsPage };
    } else if (selectCategoryStates === "내가 쓴 댓글") {
      return {
        data: getMyComment,
        page: myCommentsPage,
        setPage: setMyCommentsPage,
      };
    } else {
      return {
        data: getTravelTalkList,
        page: currentPage,
        setPage: setCurrentPage,
      };
    }
  };

  return (
    <div className="">
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
          {selectCategoryStates === "내가 쓴 댓글" ? (
            <MyCommentTalkList data={getMyComment && getMyComment.content} />
          ) : (
            <TalkList
              data={
                selectCategoryStates === "내가 쓴 글"
                  ? getMyPost && getMyPost.content
                  : getTravelTalkList && getTravelTalkList.content
              }
              selectedWriteMenu={selectCategoryStates}
            />
          )}
          {paginationData().data?.totalElements >= 10 && (
            <div className="mt-[30px]">
              <Pagination
                totalItems={paginationData().data?.totalElements}
                itemsPerPage={itemsPerPage}
                currentPage={paginationData().page}
                setCurrentPage={paginationData().setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelTalk;
