import Icon from "@/public/svgs/Icon";

export type ButtonVariant = "solid_btn" | "ghost_btn" | "disabled_btn";

interface Props {
  variant: ButtonVariant;
  hasIcon: boolean;
  iconName?: string;
  onClick?: () => void;
  text: string;
  width: string;
  height: string;
}

const getButtonTypeCSS = (variant: ButtonVariant) => {
  switch (variant) {
    case "ghost_btn":
      return `
      text-primary-skyblue-400 border border-primary-skyblue-400 hover:bg-gray-50
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

const Button = ({
  variant,
  hasIcon,
  iconName = "",
  onClick,
  text,
  width,
  height,
}: Props) => {
  const handleClickButton = () => {
    if (onClick && variant !== "disabled_btn") {
      onClick();
    }
  };

  return (
    <button
      className={`w-[${width}] h-[${height}] rounded-m ${getButtonTypeCSS(
        variant
      )}`}
      style={{ width: width, height: height }}
      onClick={handleClickButton}
    >
      <div className="flex justify-center gap-[6px] align-middle">
        {hasIcon && (
          <span
            className={`${
              iconName === "" && "w-[24px] h-[24px] inline-block bg-gray-150"
            }`}
          >
            {iconName && <Icon iconName={iconName} />}
          </span>
        )}
        <p>{text}</p>
      </div>
    </button>
  );
};

export default Button;
