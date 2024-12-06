import React from "react";

export type ButtonVariant = "solid_btn" | "ghost_btn" | "disabled_btn";

interface CommonButtonType {
  variant?: ButtonVariant;
  size?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  lineHeight?: string;
  fontWeight?: string;
  marginLeft?: string;
  marginTop?: string;
  marginBottom?: string;
  hoverColor?: string;
  bgColor?: string;
  fontColor?: string;
  onClick?: () => void;
}

const getButtonClasses = (
  variant: ButtonVariant,
  size: string,
  hoverColor?: string,
  bgColor?: string,
  fontColor?: string
) => {
  const sizeClasses =
    size === "xl"
      ? "w-[136px] h-[56px]"
      : size === "l"
      ? "w-[122px] h-[56px]"
      : size === "ls"
      ? "w-[136px] h-[40px]"
      : size === "m"
      ? "w-[106px] h-[48px]"
      : size === "ms"
      ? "w-[84px] h-[40px]"
      : size === "s"
      ? "w-[69px] h-[40px]"
      : "w-[auto]  h-[auto]";
  const bgClass = bgColor ? `bg-${bgColor}` : "";
  const textColor = fontColor ? `text-${fontColor}` : "";

  switch (variant) {
    case "solid_btn":
      return `
        text-white bg-black cursor-pointer 
        disabled:text-gray-300 disabled:bg-gray-150
        ${sizeClasses} ${bgClass} ${textColor}
      `;
    case "ghost_btn":
      return `
        text-black bg-white border border-black
        disabled:text-black disabled:bg-white border disabled:border-gray-200
        ${sizeClasses} ${bgClass} ${textColor} 
      `;
    case "disabled_btn":
      return `
        text-gray-300 bg-gray-150 cursor-not-allowed
        ${sizeClasses} ${bgClass} ${textColor}
      `;
    default:
      return `
        text-white bg-green-700 cursor-pointer 
        disabled:text-gray-300 disabled:bg-gray-150
        ${sizeClasses} ${bgClass} ${textColor}
      `;
  }
};

const CommonButton: React.FC<
  CommonButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  variant = "solid_btn",
  size = "large",
  fontSize = "1rem",
  lineHeight = "1.5",
  fontWeight = "700",
  marginLeft,
  marginTop,
  marginBottom = "16px",
  hoverColor,
  children,
  bgColor,
  fontColor,
  width,
  onClick,
  ...props
}) => {
  // Tailwind 클래스에서 유효한 색상값만 전달
  const buttonTextColor = fontColor ? `text-${fontColor}` : "";

  const handleClickButton = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`
        ${getButtonClasses(variant, size, hoverColor, bgColor, buttonTextColor)}
        rounded-sm box-border outline-none
        transition-all duration-300
      `}
      style={{
        fontSize,
        lineHeight,
        fontWeight,
        marginLeft,
        marginTop,
        marginBottom,
        width,
        // HEX 값이나 기타 색상 값이 들어오는 경우 인라인 스타일로 처리
        color:
          fontColor && !fontColor.startsWith("text-") ? fontColor : undefined,
      }}
      onClick={handleClickButton}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
