import {
  Dispatch,
  FocusEventHandler,
  SetStateAction,
  useState,
  useEffect,
  memo,
  useCallback,
} from "react";

interface PropsType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setReply?: Dispatch<SetStateAction<boolean>>;
  varient: "default" | "error";
  placeholder: string;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  infoText?: any;
  width?: string;
  height?: string;
  backgroundColor?: string;
  paddingTop?: string;
  minHeight?: string; // 최소 높이 추가
  maxHeight?: string; // 최대 높이 추가
  isShowCancelInput?: boolean;
  isShowPressInput?: boolean;
  handleClickInsertButton?: () => void;
  handleClickCancelButton?: () => void;
}

const Textarea = ({
  value,
  setValue,
  setReply,
  varient,
  placeholder,
  onFocus,
  onBlur,
  infoText,
  width = "100%",
  height,
  backgroundColor = "white",
  paddingTop = "24px",
  isShowCancelInput = false,
  isShowPressInput = false,
  handleClickInsertButton,
  handleClickCancelButton,
}: PropsType) => {
  useEffect(() => {
    const textarea = document.getElementById(
      "dynamic-textarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = `${height ? `${height}px` : "auto"}`; // 자동 높이 조정을 위해 우선 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰 높이를 설정
    }
  }, [value]);

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setValue) setValue(e.target.value);
  };

  const onClickInsertButton = () => {
    if (handleClickInsertButton) {
      handleClickInsertButton();
    }
  };

  return (
    <div className="relative">
      <textarea
        id="dynamic-textarea"
        className={`border ${
          varient === "default"
            ? "border-gray-150 focus:border-black"
            : "border-red focus:border-red"
        } rounded-sm p-[24px] ${
          isShowPressInput && "pb-[24px]" // 입력이 있을 때, padding-bottom을 유지하도록 수정
        } focus:outline-none`}
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaValue}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width,
          backgroundColor,
          paddingTop,
          height: "auto",
        }}
      />
      {infoText && (
        <div className="mt-2 text-sm text-gray-500 flex justify-between">
          <div>{infoText}</div>
          {isShowCancelInput && (
            <p
              className={`text-sm text-gray-300 font-600 relative top-[-59px] left-[340px] cursor-pointer`}
              onClick={() => {
                if (handleClickCancelButton) handleClickCancelButton();
              }}
            >
              취소
            </p>
          )}
          {isShowPressInput && (
            <p
              className={`text-sm ${
                value.length > 0 ? "text-black" : "text-gray-300"
              } font-600 relative top-[-59px] right-[24px] ${
                value.length > 0 ? "cursor-pointer" : "cursor-default"
              } `}
              onClick={onClickInsertButton}
            >
              등록
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Textarea);
