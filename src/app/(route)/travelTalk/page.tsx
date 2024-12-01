"use client";
import Pagination from "@/components/common/Pagination";
import SideBarNav from "./_components/SideBarNav";
import TalkList from "./_components/TalkList";
import TravelTalkHeader from "./_components/TravelTalkHeader";
import { useState } from "react";
import MyCommentTalkList from "./_components/MyCommentTalkList";

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
  // 게시글 더미 데이터
  const dummyData: dataType[] = [
    {
      sticker: "날씨",
      title: "도쿄 이번 주 날씨 어떤가요?",
      content:
        "이번 주에 도쿄 가려고 하는데, 많이 추울까요? 옷을 어떻게 챙겨야 할지 고민이라서요. 날씨 예보에...",
      watch: "3",
      like: "1",
      nickname: "피크니 도쿄",
      time: "1",
    },
    {
      sticker: "날씨",
      title: "오사카 이번 주 날씨 어떤가요?",
      content: "이번 주에 오사카 가려고 하는데, 많이 추울까요?",
      watch: "5",
      like: "3",
      nickname: "피크니 오사카",
      time: "2",
    },
    {
      sticker: "날씨",
      title: "교토 이번 주 날씨 어떤가요?",
      content: "교토 옷을 어떻게 챙겨야 할지 고민이네요...",
      watch: "10",
      like: "1",
      nickname: "피크니 교토",
      time: "3",
    },
    {
      sticker: "날씨",
      title: "후쿠오카 이번 주 날씨 어떤가요?",
      content:
        "이번 주에 후쿠오카 가려고 하는데, 많이 추울까요? 옷을 어떻게 챙겨야 할지 고민이라서요. 날씨 예보에는 별로 안 추울 것 같긴한데 걱정이네요",
      watch: "10",
      like: "8",
      nickname: "피크니 후쿠오카",
      time: "4",
    },
  ];
  // 내가 쓴 댓글 더미 데이터
  const commentDummyData: commentDataType[] = [
    {
      comment: "오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요!",
      sticker: "날씨",
      title: "도쿄 이번 주 날씨 어떤가요?",
      date: "2024. 11. 25.",
    },
    {
      comment: "오늘 후쿠오카 좀 더웠어요.",
      sticker: "날씨",
      title: "이번 주 후쿠오카 날씨 어떤가요?",
      date: "2024. 11. 23.",
    },
    {
      comment: "이번주 교토 날씨 완전 좋아요!.",
      sticker: "날씨",
      title: "교토 이번 주 날씨 좋나요?",
      date: "2024. 11. 22.",
    },
    {
      comment: "오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요.",
      sticker: "날씨",
      title: "이번 주 도쿄 날씨 어떤가요?",
      date: "2024. 11. 21.",
    },
    {
      comment: "이번주 교토 날씨 완전 좋네요!",
      sticker: "날씨",
      title: "교토 이번 주 날씨 좋나요?",
      date: "2024. 11. 19.",
    },
  ];
  // TravelTalkHeader 관련 상태
  const [selectedFilter, setSelectedFilter] = useState<string>("최신순");
  // Pagination 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 선택된 페이지
  const itemsPerPage = 10; // 페이지별 아이템 수
  // SideBarNav 관련 상태
  const [selectedCityOption, setSelectedCityOption] = useState<string>("");
  const [selectedCategoryMenu, setSelectedCategoryMenu] = useState<string>("");
  const [selectedWriteMenu, setSelectedWriteMenu] = useState<string>("");

  // 더미 데이터
  const ITEMS = Array.from(
    { length: dummyData.length },
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
            <TalkList data={dummyData} selectedWriteMenu={selectedWriteMenu} />
          ) : (
            <MyCommentTalkList
              data={commentDummyData}
              selectedWriteMenu={selectedWriteMenu}
            />
          )}
          <Pagination
            totalItems={ITEMS.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelTalk;
