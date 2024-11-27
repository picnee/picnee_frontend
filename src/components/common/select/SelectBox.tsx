"use client";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  optionWidth?: string;
}

const SelectBox = ({ option, setSelectedOption, optionWidth }: PropsType) => {
  // 옵션 show/hide 플래그
  const [showOption, setShowOption] = useState<boolean>(false);
  // 현재 선택된 옵션
  const [currentOption, setCurrentOption] = useState<string>(option[0].value);

  const handleSelectBox = () => {
    setShowOption((prev) => !prev);
  };

  const handleSelectedOption = (value: string) => {
    if (setSelectedOption) {
      setSelectedOption(value); // 선택된 옵션 부모 컴포넌트에 전달
    }
    setCurrentOption(value);
    setShowOption(false); // 옵션 hide
  };

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤을 내리면 옵션 숨기기
      if (showOption) {
        setShowOption(false);
      }
    };

    // window에 scroll 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // cleanup 함수: 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showOption]); // showOption 값이 변경될 때마다 re-run

  return (
    <>
      <div className="relative w-full cursor-pointer">
        <div
          className="w-full h-[50px] border border-gray-150 rounded-m pl-[24px] pt-[10px] appearance-none"
          onClick={handleSelectBox}
        >
          <p className="font-600 text-3xl">{currentOption}</p>
          <span className="absolute right-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
            {showOption ? (
              <Icon iconName="upArrow" />
            ) : (
              <Icon iconName="downArrow" />
            )}
          </span>
        </div>
      </div>
      <div
        className={`absolute h-auto bg-white border border-gray-200 mt-[10px] rounded-m pt-[8px] pb-[32px] pl-[24px] pr-[24px] shadow-selectShadow transition-all duration-300 ease-out transform ${
          showOption ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: optionWidth }}
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
    </>
  );
};

export default SelectBox;
