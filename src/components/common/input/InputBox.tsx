import { Dispatch, SetStateAction, memo, useCallback } from "react";

interface InputBoxProps {
  type: string;
  placeholder: string;
  varient: "default" | "error";
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  showTextLength?: boolean;
  width: string;
  height: string;
  fontSize: string;
}

const InputBox = ({
  type,
  placeholder,
  varient,
  value,
  setValue,
  maxLength,
  showTextLength = false,
  width,
  height,
  fontSize,
}: InputBoxProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) setValue(e.target.value);
  };

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`pl-[24px] rounded-sm box-border text-${fontSize} ${
          varient === "default"
            ? "border border-gray-150 placeholder-text-gray-300 focus:border-black focus:outline-none"
            : "border border-red focus:border-red focus:outline-none"
        } text-black`}
        onChange={handleChangeValue}
        maxLength={maxLength}
        style={{ width, height }}
      />
      {showTextLength && (
        <div className="absolute right-[24px] bottom-[18px] text-2xl text-gray-400">
          {value?.length || 0} / {maxLength || 0}
        </div>
      )}
    </>
  );
};

export default memo(InputBox);
