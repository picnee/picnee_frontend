import Icon from "@/public/svgs/Icon";
import { memo } from "react";

interface PropsType {
  text?: string;
  hasIcon: boolean;
  iconName?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  fontSize?: string;
  borderColor?: string;
  textColor?: string;
  bgColor?: string;
}

const RoundButton = ({
  text = "",
  hasIcon = false,
  iconName = "",
  onClick,
  width = "auto",
  height = "40px",
  pt = "4px",
  pb = "4px",
  pl = "16px",
  pr = "16px",
  fontSize,
  borderColor,
  textColor,
  bgColor,
}: PropsType) => {
  const onClickButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      style={{
        height: height,
        paddingTop: pt,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
        border: `1px solid ${borderColor}`,
        color: textColor,
        backgroundColor: bgColor,
      }}
      className="h-[40px] flex items-center text-gray-500 border border-gray-150 rounded-[50px] pt-[4px] pl-[16px] pb-[4px] pr-[16px]"
      onClick={onClickButton}
    >
      {hasIcon && (
        <span
          className={`${`w-[20px] h-[20px] ${
            text && "mr-[4px]"
          } inline-block`}`}
        >
          {iconName && <Icon iconName={iconName} />}
        </span>
      )}
      {text && (
        <p className={`whitespace-nowrap`} style={{ fontSize: fontSize }}>
          {text}
        </p>
      )}
    </button>
  );
};

export default memo(RoundButton);
