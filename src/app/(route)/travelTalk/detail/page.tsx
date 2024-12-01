"use client";
import { useState } from "react";
import SideBarNav from "../_components/SideBarNav";
import TravelTalkHeader from "../_components/TravelTalkHeader";
import Sticker from "@/components/common/Sticker";
import Watch from "@/components/common/Watch";
import RoundButton from "@/components/common/button/RoundButton";
import Textarea from "@/components/common/input/Textarea";
import CommentList from "./_components/CommentList";

const TravelTalkListDetailPage = () => {
  // SideBarNav 관련 상태
  const [selectedCityOption, setSelectedCityOption] = useState<string>("");
  const [selectedCategoryMenu, setSelectedCategoryMenu] = useState<string>("");
  const [selectedWriteMenu, setSelectedWriteMenu] = useState<string>("");
  // 댓글 관련 상태
  const [comment, setComment] = useState<string>("");

  const commentListData = [
    {
      id: "일본 여행 초심자",
      comment: "오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요!",
      time: "3",
      like: "13",
    },
    {
      id: "일본 여행 초심자",
      comment: "오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요!",
      time: "3",
      like: "13",
    },
  ];

  const replyCommentData = [
    {
      id: "피크니",
      comment: "답변 감사합니다~",
      time: "3",
      like: "1",
    },
    {
      id: "피크니",
      comment: "답변 감사합니다~",
      time: "3",
      like: "1",
    },
  ];

  return (
    <div className="pt-[72px]">
      <div className="w-[1200px] pt-[35px] fixed bg-white z-[999]">
        <TravelTalkHeader hasFilter={false} isActiveButton={true} />
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
          <div className="border border-gray-150 box-border pt-[24px] pb-[0px] rounded-sm">
            <div className="pl-[24px] pr-[24px]">
              <div className="mb-[24px]">
                <Sticker title="날씨" />
              </div>
              <div>
                <p className="font-600 text-4xl mb-[7px]">
                  도쿄 이번 주 날씨 어떤가요?
                </p>
                <div className="flex gap-[8px] text-sm text-gray-500 items-center mb-[24px]">
                  <div className="w-[28px] h-[28px] bg-gray-150 rounded-full"></div>
                  <p>피크니</p>
                  <p>•</p>
                  <p>3시간 전</p>
                </div>
                <div className="mb-[40px]">
                  <div className="text-lg font-400">
                    <p>이번 주에 도쿄 가려고 하는데, 많이 추울까요?</p>
                    <p>옷을 어떻게 챙겨야 할지 고민이라서요. </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 mb-[16px] pl-[24px] pr-[24px]">
              <div className="col-span-3 mt-[10px]">
                <Watch watchNum={50} />
              </div>
              <div className="col-span-1 flex gap-[10px] justify-end">
                <RoundButton text="공유" hasIcon={true} />
                <RoundButton text="신고" hasIcon={false} />
              </div>
            </div>
            <div className="ml-[24px] mr-[24px] mb-[20px] mt-[32px] border border-gray-100"></div>
            <div className="flex gap-[8px] mb-[16px] pl-[24px] pr-[24px]">
              <div className="w-[24px] h-[24px] bg-gray-150"></div>
              <p>댓글 1</p>
            </div>
            <div className="mb-[0px] pl-[24px] pr-[24px]">
              <Textarea
                varient="default"
                value={comment}
                setValue={setComment}
                placeholder="댓글을 기입해 주세요."
                backgroundColor="#F1F3F6"
                paddingTop="45px"
                isShowPressInput={true}
                infoText={
                  <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                    <p className="text-sm text-gray-600 font-600">아이디</p>
                  </div>
                }
              />
            </div>
            <div>
              <CommentList
                data={commentListData}
                replyCommentData={replyCommentData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTalkListDetailPage;
