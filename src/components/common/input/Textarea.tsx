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
  isShowUpdateInput?: boolean;
  handleClickInsertButton?: () => void;
  handleClickCancelButton?: () => void;
  handleClickUpdateButton?: () => void;
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
  isShowUpdateInput = false,
  handleClickInsertButton,
  handleClickCancelButton,
  handleClickUpdateButton,
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

  const onClickUpdateButton = () => {
    if (handleClickUpdateButton) {
      handleClickUpdateButton();
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
          isShowPressInput && "pb-[24px]"
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
        <div className="mt-[-45px] mb-[45px] pr-[24px] text-sm text-gray-500 flex justify-end items-center w-full">
          {isShowCancelInput && (
            <p
              className={`text-sm text-gray-300 font-600 cursor-pointer ml-4`}
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
              } font-600 ${
                value.length > 0 ? "cursor-pointer" : "cursor-default"
              } ml-4`}
              onClick={onClickInsertButton}
            >
              등록
            </p>
          )}
          {isShowUpdateInput && (
            <p
              className={`text-sm ${
                value.length > 0 ? "text-black" : "text-gray-300"
              } font-600 ${
                value.length > 0 ? "cursor-pointer" : "cursor-default"
              } ml-4`}
              onClick={onClickUpdateButton}
            >
              수정
            </p>
          )}
          {infoText}
        </div>
      )}
    </div>
  );
};

export default memo(Textarea);
