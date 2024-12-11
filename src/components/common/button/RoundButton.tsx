import { memo } from "react";

interface PropsType {
  text: string;
  hasIcon: boolean;
}

const RoundButton = ({ text, hasIcon }: PropsType) => {
  return (
    <button className="h-[40px] flex items-center text-gray-500 border border-gray-150 rounded-[50px] pt-[4px] pl-[16px] pb-[4px] pr-[16px]">
      {hasIcon && (
        <span
          className={`w-[24px] h-[24px] mr-[4px] inline-block bg-gray-150`}
        ></span>
      )}
      <p className={`whitespace-nowrap`}>{text}</p>
    </button>
  );
};

export default memo(RoundButton);
