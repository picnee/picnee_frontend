"use client";
import SelectBox from "@/components/common/select/SelectBox";
import TravelTalkHeader from "../_components/TravelTalkHeader";
import { useEffect, useState } from "react";
import InputBox from "@/components/common/input/InputBox";
import Textarea from "@/components/common/input/Textarea";
import {
  useTravelTalkPostDetailDataStore,
  useTravelTalkStore,
} from "@/store/zustand/useTravelTalkStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertPostData } from "./actions/InsertPostData";
import { useRouter } from "next/navigation";
import { URL } from "@/constants/url";
import { UpdatePostData } from "./actions/UpdatePostData";

const cityOption = [
  { key: 1, value: "도쿄" },
  { key: 2, value: "오사카" },
  { key: 3, value: "교토" },
  { key: 4, value: "고베" },
  { key: 5, value: "후쿠오카" },
  { key: 6, value: "삿포로" },
];

const categoryOption = [
  { key: 1, value: "음식점" },
  { key: 2, value: "숙박" },
  { key: 5, value: "관광지" },
  { key: 6, value: "자유 토크" },
  { key: 3, value: "날씨" },
  { key: 4, value: "교통" },
];

const TravelTalkWrite = () => {
  // 게시글 수정으로 들어온 경우 게시글 상세 데이터 조회
  const { selectedPostData } = useTravelTalkPostDetailDataStore();
  const hasEditableData =
    Object.keys(selectedPostData).length > 0 ? true : false;
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>(
    hasEditableData ? selectedPostData.title : ""
  );
  const [contentValue, setContentValue] = useState<string>(
    hasEditableData ? selectedPostData.content : ""
  );
  const [isFocused, setIsFocused] = useState<boolean>(false); // 포커스 상태 관리
  const { selectBoxStates, setSelectBoxState } = useTravelTalkStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (hasEditableData) {
      setSelectBoxState("writeRegion", selectedPostData.boardRes.region);
      setSelectBoxState(
        "writeCategory",
        selectedPostData.boardRes.boardCategory
      );
    }
  }, []);

  useEffect(() => {
    if (
      selectBoxStates["writeRegion"] !== "" &&
      selectBoxStates["writeCategory"] !== "" &&
      titleValue !== "" &&
      contentValue !== ""
    ) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [selectBoxStates, titleValue, contentValue]);

  /** 게시글 등록 API 호출 */
  const mutation = useMutation({
    mutationFn: InsertPostData,
    onSuccess: () => {
      router.push(URL.TRAVELTALK.BASE);
      queryClient.invalidateQueries({
        queryKey: ["travelTalkList"],
      });
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const registerPost = () => {
    mutation.mutate({
      title: titleValue,
      content: contentValue,
      region: selectBoxStates["writeRegion"],
      boardCategory: selectBoxStates["writeCategory"],
    });
  };

  /** 게시글 수정 */
  const updatePostMutation = useMutation({
    mutationFn: UpdatePostData,
    onSuccess: () => {
      router.push(`${URL.TRAVELTALK.DETAIL}/${selectedPostData.postId}`);
      setSelectBoxState("writeRegion", "");
      setSelectBoxState("writeCategory", "");
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const onClickModifyButton = () => {
    updatePostMutation.mutate({
      postId: selectedPostData.postId,
      title: titleValue,
      content: contentValue,
      region: selectBoxStates["writeRegion"],
      boardCategory: selectBoxStates["writeCategory"],
    });
  };

  return (
    <div className="pt-[72px]">
      <div className="w-[1200px] pt-[35px] fixed bg-white z-[999]">
        <TravelTalkHeader
          hasFilter={false}
          isActiveButton={isActiveButton}
          onClick={registerPost}
          onClickModifyButton={onClickModifyButton}
          hasEditableData={hasEditableData}
        />
      </div>
      <div className="grid grid-cols-6 gap-[24px] pt-[120px]">
        <div className="col-span-1">
          <div className="h-[56px] flex items-center mb-[20px]">
            <p className="text-lg font-600">토크 유형 *</p>
          </div>
          <div className="h-[56px] mb-[20px] flex items-center">
            <p>제목 *</p>
          </div>
          <div className="h-[320px]">
            <p className="mt-[30px]">내용 *</p>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="grid grid-cols-2 gap-[16px] h-[56px] mb-[20px]">
            <div className="col-span-1">
              <SelectBox
                option={cityOption}
                uniqueKey="writeRegion"
                optionWidth="490px"
                placeHolder="지역을 선택해 주세요."
              />
            </div>
            <div className="col-span-1">
              <SelectBox
                option={categoryOption}
                uniqueKey="writeCategory"
                optionWidth="490px"
                placeHolder="카테고리를 선택해 주세요."
              />
            </div>
          </div>
          <div className="w-full h-auto mb-[20px]">
            <div className="relative">
              <InputBox
                type="text"
                placeholder="제목을 입력해 주세요."
                varient="default"
                value={titleValue}
                setValue={setTitleValue}
                maxLength={50}
                showTextLength={true}
                width="995px"
                height="64px"
                fontSize="4xl"
              />
            </div>
          </div>
          <div className="">
            <Textarea
              value={contentValue}
              setValue={setContentValue}
              varient="default"
              placeholder="내용을 입력해 주세요."
              height="320"
              onFocus={() => setIsFocused(true)} // 포커스 상태 true
              onBlur={() => setIsFocused(false)} // 포커스 상태 false
              infoText={
                !isFocused &&
                contentValue.length === 0 && (
                  <div className="absolute left-[24px] top-[66px] text-2xl text-gray-400">
                    <p className="text-lg text-gray-600 font-600">작성 안내</p>
                    <p className="text-lg text-gray-600 font-400">
                      광고/홍보 목적의 글, 비방글, 허위 정보 기입 시 글이 내려갈
                      수 있으니 주의해 주세요.
                    </p>
                  </div>
                )
              }
            />
          </div>
          <div className="pt-[24px]">
            <div className="border border-gray-200 w-[88px] h-[88px] mb-[24px] rounded-sm bg-gray-150"></div>
            <div>
              <p className="text-gray-500 text-lg">
                • 30MB 이하의 이미지만 업로드해 주세요.
              </p>
              <p className="text-gray-500 text-lg">
                • 사진은 최대 5장까지 업로드 가능해요.
              </p>
              <p className="text-gray-500 text-lg">
                • 음란 및 불법 도용 이미지는 삭제 될 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTalkWrite;
