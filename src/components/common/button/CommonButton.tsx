import Icon from "@/public/svgs/Icon";
import { memo, useCallback, useMemo } from "react";

export type ButtonVariant =
  | "solid_btn"
  | "ghost_btn"
  | "ghost_btn_gray"
  | "disabled_btn";

interface Props {
  variant: ButtonVariant;
  hasIcon?: boolean;
  iconName?: string;
  onClick?: () => void;
  text: string;
  width: string;
  height: string;
  isClicked?: boolean;
}

const getButtonTypeCSS = (variant: ButtonVariant, isClicked?: boolean) => {
  switch (variant) {
    case "ghost_btn":
      return `
      text-primary-skyblue-400 border border-primary-skyblue-400 hover:bg-gray-50 transition-colors duration-300
    `;
    case "ghost_btn_gray":
      return `
        text-black font-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-300 ${
          isClicked && "text-primary-skyblue-400"
        }
      `;
    case "solid_btn":
      return `
      text-white bg-primary-skyblue-400
    `;
    case "disabled_btn":
      return `
       text-gray-200 border border-gray-200 cursor-not-allowed
    `;
    default:
      return ``;
  }
};

const CommonButton = memo(
  ({
    variant,
    hasIcon = false,
    iconName = "",
    onClick,
    text,
    width,
    height,
    isClicked = false,
  }: Props) => {
    const handleClickButton = useCallback(() => {
      if (onClick && variant !== "disabled_btn") {
        onClick();
      }
    }, [onClick, variant]);

    const style = useMemo(() => ({ width, height }), [width, height]);

    return (
      <button
        className={`w-[${width}] h-[${height}] rounded-m ${getButtonTypeCSS(
          variant,
          isClicked
        )}`}
        style={style}
        onClick={handleClickButton}
      >
        <div className="flex justify-center gap-[6px] align-middle">
          {hasIcon && (
            <span
              className={`${
                iconName === "" &&
                `w-[24px] h-[24px] inline-block ${
                  isClicked
                    ? "border border-primary-skyblue-400"
                    : "bg-gray-150"
                } `
              }`}
            >
              {iconName && <Icon iconName={iconName} />}
            </span>
          )}
          <p>{text}</p>
        </div>
      </button>
    );
  }
);

export default CommonButton;
