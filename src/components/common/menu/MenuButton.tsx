import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
  selectedOption?: string;
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  isDefaultCheck?: boolean; // 초기 option의 첫번째 항목 선택 여부 플래그
}

const MenuButton = ({
  option,
  selectedOption,
  setSelectedOption,
  isDefaultCheck,
}: PropsType) => {
  /** 초기에 선택될 메뉴를 저장 */
  useEffect(() => {
    if (setSelectedOption && isDefaultCheck) {
      setSelectedOption(option[0].value);
    }
  }, []);

  /** 선택된 메뉴 set */
  const handleSelectedMenu = (value: string) => {
    if (setSelectedOption) {
      setSelectedOption(value);
    }
  };

  return (
    <>
      <>
        {option.map((item) => (
          <div
            key={item.key}
            className={`w-full h-auto cursor-pointer pl-[20px] pr-[20px] pt-[10px] pb-[10px] ${
              selectedOption === item.value ? "bg-gray-100" : "bg-white"
            } rounded-sm flex gap-[16px] mt-[16px] mb-[16px] hover:bg-gray-100 transition-all duration-300 ease-in-out`}
            onClick={() => handleSelectedMenu(item.value)}
          >
            <div className="flex gap-[16px]">
              <div className="w-[28px] h-[28px] appearance-none bg-gray-150"></div>
              <p className="text-lg font-600 text-center">{item.value}</p>
            </div>
          </div>
        ))}
      </>
    </>
  );
};
export default MenuButton;
