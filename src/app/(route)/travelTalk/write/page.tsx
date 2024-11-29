"use client";
import SelectBox from "@/components/common/select/SelectBox";
import TravelTalkHeader from "../_components/TravelTalkHeader";
import { useEffect, useState } from "react";
import InputBox from "@/components/common/input/InputBox";
import Textarea from "@/components/common/input/Textarea";

const TravelTalkWrite = () => {
  const [selectedCityOption, setSelectedCityOption] = useState<string>("");
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>("");
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [contentValue, setContentValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false); // 포커스 상태 관리

  const cityOption = [
    { key: 1, value: "도쿄" },
    { key: 2, value: "오사카" },
    { key: 3, value: "교토" },
    { key: 4, value: "후쿠오카" },
    { key: 5, value: "후카이도" },
  ];

  const categoryOption = [
    { key: 1, value: "날씨" },
    { key: 2, value: "숙소" },
    { key: 3, value: "맛집" },
    { key: 4, value: "교통" },
    { key: 5, value: "관광지" },
    { key: 6, value: "자유토크" },
  ];

  useEffect(() => {
    if (
      selectedCityOption !== "" &&
      selectedCategoryOption !== "" &&
      titleValue !== "" &&
      contentValue !== ""
    ) {
      setIsActiveButton(true);
    }
  }, [selectedCityOption, selectedCategoryOption, titleValue, contentValue]);

  return (
    <div className="pt-[72px]">
      <div className="w-[1200px] pt-[35px] fixed bg-white z-[999]">
        <TravelTalkHeader hasFilter={false} isActiveButton={isActiveButton} />
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
                setSelectedOption={setSelectedCityOption}
                optionWidth="490px"
                placeHolder="지역을 선택해 주세요."
              />
            </div>
            <div className="col-span-1">
              <SelectBox
                option={categoryOption}
                setSelectedOption={setSelectedCategoryOption}
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
