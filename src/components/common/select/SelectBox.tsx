"use client";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction, useState } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  optionWidth?: string;
}

const SelectBox = ({ option, setSelectedOption, optionWidth }: PropsType) => {
  // 옵션 show/hide 플래크
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
      {showOption && (
        <div
          className={`absolute w-[${optionWidth}] h-auto bg-white border border-gray-200 mt-[10px] rounded-m pt-[8px] pb-[32px] pl-[24px] pr-[24px] shadow-selectShadow`}
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

export default SelectBox;
