import Icon from "@/public/svgs/Icon";
import { memo } from "react";

interface PropsType {
  text?: string;
  hasIcon: boolean;
  iconName?: string;
  onClick?: () => void;
}

const RoundButton = ({
  text = "",
  hasIcon = false,
  iconName = "",
  onClick,
}: PropsType) => {
  const onClickButton = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button className="h-[40px] flex items-center text-gray-500 border border-gray-150 rounded-[50px] pt-[4px] pl-[16px] pb-[4px] pr-[16px]">
      {hasIcon && (
        <span
          className={`${
            iconName === "" &&
            "w-[24px] h-[24px] mr-[4px] inline-block bg-gray-150"
          }`}
        >
          {iconName && <Icon iconName={iconName} />}
        </span>
      )}
      {text && (
        <p className={`whitespace-nowrap`} onClick={onClickButton}>
          {text}
        </p>
      )}
    </button>
  );
};

export default memo(RoundButton);
