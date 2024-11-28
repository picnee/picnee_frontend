import { Dispatch, FocusEventHandler, SetStateAction } from "react";

interface PropsType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  varient: "default" | "error";
  placeholder: string;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  infoText?: any;
}

const Textarea = ({
  value,
  setValue,
  varient,
  placeholder,
  onFocus,
  onBlur,
  infoText,
}: PropsType) => {
  const handleTextareaValue = (e: any) => {
    if (setValue) setValue(e.target.value);
  };
  return (
    <div className="relative">
      <textarea
        className={`w-[995px] min-h-[320px] border ${
          varient === "default"
            ? "border-gray-150 focus:border-black"
            : "border-red focus:border-red"
        } rounded-sm p-[24px]  focus:outline-none`}
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaValue}
        onFocus={onFocus} // 포커스 상태 true
        onBlur={onBlur} // 포커스 상태 false
      />
      {infoText && infoText}
    </div>
  );
};

export default Textarea;
