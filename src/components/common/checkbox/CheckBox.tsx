import { Dispatch, SetStateAction, useState } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
  setSelectedOption?: Dispatch<SetStateAction<string>>;
  isDefaultCheck?: boolean; // 초기 option의 첫번째 항목 선택 여부 플래그
}

const CheckBox = ({ option, setSelectedOption, isDefaultCheck }: PropsType) => {
  const [currentOption, setCurrentOption] = useState<string>(
    isDefaultCheck ? option[0].value : ""
  );

  const handleCheckBox = (value: string) => {
    if (setSelectedOption) {
      setSelectedOption(value);
    }
    setCurrentOption(value);
  };

  return (
    <>
      <>
        {option.map((item) => (
          <div
            key={item.key}
            className={`w-full h-auto pl-[20px] pr-[20px] pt-[10px] pb-[10px] ${
              currentOption === item.value ? "bg-gray-100" : "bg-white"
            } rounded-sm flex gap-[16px] mt-[16px] mb-[16px]`}
          >
            <input
              type="radio"
              value={item.value}
              name="group"
              //   checked={currentOption === item.value}
              onChange={() => handleCheckBox(item.value)}
              className="w-[28px] h-[28px] appearance-none bg-gray-150 flex items-center justify-center rounded-none border-2 border-gray-300 checked:bg-gray-500"
            />
            <p className="text-lg font-600">{item.value}</p>
          </div>
        ))}
      </>
    </>
  );
};
export default CheckBox;
