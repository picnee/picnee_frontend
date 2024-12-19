"use client";

import CommonButton from "@/components/common/button/CommonButton";
import { URL } from "@/constants/url";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PropsType {
  hasFilter: boolean;
  selectedFilter?: string;
  setSelectedFilter?: Dispatch<SetStateAction<string>>;
  isActiveButton?: boolean;
  onClick?: () => void;
  hasEditableData?: boolean;
  onClickModifyButton?: () => void;
}

const TravelTalkHeader = ({
  hasFilter,
  selectedFilter,
  setSelectedFilter,
  isActiveButton,
  onClick,
  hasEditableData,
  onClickModifyButton,
}: PropsType) => {
  const navigator = useRouter();
  const pathname = usePathname();

  // 검색필터
  const filter = ["최신순", "조회순", "댓글순"];
  // 버튼 text
  const [buttonText, setButtonText] = useState<string>("");

  const handleFilter = useCallback((filterType: string) => {
    if (setSelectedFilter) setSelectedFilter(filterType);
  }, []);

  useEffect(() => {
    if (pathname === URL.TRAVELTALK.WRITE && !hasEditableData) {
      setButtonText("등록하기");
    } else if (hasEditableData) {
      setButtonText("수정하기");
    } else {
      setButtonText("글쓰기");
    }
  }, [pathname, hasEditableData]);

  const onClickButton = () => {
    if (buttonText === "글쓰기") {
      navigator.push(URL.TRAVELTALK.WRITE);
    } else if (buttonText === "수정하기") {
      if (onClickModifyButton) return onClickModifyButton();
    } else {
      // 등록하기
      if (onClick) return onClick();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-8">
        <p className="text-5xl font-bold mr-[155px]">여행 토크</p>
        {hasFilter && (
          <div className="text-lg flex gap-2 mt-[18px]">
            {filter.map((item) => (
              <div key={item}>
                <p
                  className={`cursor-pointer ${
                    selectedFilter === item
                      ? "text-black font-bold"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleFilter(item)}
                >
                  {item} &nbsp;
                  {item !== "댓글순" && (
                    <span className="text-gray-150">⎟</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <CommonButton
          variant={isActiveButton ? "solid_btn" : "disabled_btn"}
          size="m"
          onClick={onClickButton}
        >
          {buttonText}
        </CommonButton>
      </div>
    </div>
  );
};

export default memo(TravelTalkHeader);
