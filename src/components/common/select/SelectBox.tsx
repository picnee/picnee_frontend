"use client";
import Icon from "@/public/svgs/Icon";
import { useTravelTalkStore } from "@/store/zustand/useTravelTalkStore";
import { Dispatch, SetStateAction, useState, useEffect, memo } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  optionWidth?: string;
  placeHolder?: string;
  uniqueKey: string;
}

const SelectBox = ({
  option,
  setSelectedOption,
  optionWidth,
  placeHolder,
  uniqueKey,
}: PropsType) => {
  // 옵션 show/hide 플래그
  const [showOption, setShowOption] = useState<boolean>(false);
  // 지역 전역상태관리
  const { selectBoxStates, setSelectBoxState } = useTravelTalkStore();
  // 현재 선택된 옵션 가져오기
  const currentOption =
    selectBoxStates[uniqueKey] || placeHolder || option[0].value;

  useEffect(() => {
    // 초기 상태 설정
    if (!selectBoxStates[uniqueKey]) {
      setSelectBoxState(uniqueKey, currentOption);
    }
  }, [uniqueKey, currentOption, setSelectBoxState, selectBoxStates]);

  /** 스크롤을 내리면 옵션 숨김 */
  useEffect(() => {
    const handleScroll = () => {
      if (showOption) {
        setShowOption(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showOption]);

  /** option show/hide */
  const handleSelectBox = () => {
    setShowOption((prev) => !prev);
  };

  /** 선택한 option 저장 함수 */
  const handleSelectedOption = (value: string) => {
    // 전역 상태 업데이트
    setSelectBoxState(uniqueKey, value);

    if (setSelectedOption) {
      setSelectedOption(value);
    }
    setShowOption(false);
  };

  return (
    <>
      <div className="relative w-full cursor-pointer">
        <div
          className={`w-full h-[50px] border ${
            showOption ? "border-black" : "border-gray-150"
          } rounded-m pl-[24px] pt-[10px] appearance-none`}
          onClick={handleSelectBox}
        >
          <p
            className={`font-600 text-3xl ${
              currentOption === placeHolder ? "text-gray-400" : "text-black"
            }`}
            style={{
              fontSize: currentOption === placeHolder ? "16px" : "20px",
            }}
          >
            {currentOption}
          </p>
          <span className="absolute right-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
            {showOption ? (
              <Icon iconName="upArrow" />
            ) : (
              <Icon iconName="downArrow" />
            )}
          </span>
        </div>
      </div>
      {showOption && (
        <div
          className={`absolute h-auto bg-white border border-gray-200 mt-[10px] rounded-m pt-[8px] pb-[32px] pl-[24px] pr-[24px] shadow-selectShadow transition-all duration-300 ease-out transform ${
            showOption ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: optionWidth, zIndex: 9999 }}
        >
          {option.map((item) => (
            <div
              key={item.key}
              className="mt-[24px] cursor-pointer"
              onClick={() => handleSelectedOption(item.value)}
            >
              <p className="font-600 text-3xl">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(SelectBox);
