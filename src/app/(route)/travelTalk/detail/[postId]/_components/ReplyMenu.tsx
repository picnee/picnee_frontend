import { memo, useEffect, useRef } from "react";

interface PropsType {
  isMyComment: boolean;
  handleClickModifyButton: () => void;
  handleClickDeleteButton: () => void;
  handleClickReportButton: () => void;
  handleCloseMenu: () => void;
}

const ReplyMenu = ({
  isMyComment,
  handleClickModifyButton,
  handleClickDeleteButton,
  handleClickReportButton,
  handleCloseMenu,
}: PropsType) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMenu(); // 외부 클릭 시 메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseMenu]);

  return (
    <div
      ref={menuRef}
      className="reply-menu absolute z-[99] w-[120px] h-[auto] p-[20px] top-[20px] right-[0px] 
        shadow-[0px_2px_16px_rgba(0,0,0,0.25)] rounded-m bg-white"
    >
      {isMyComment ? (
        <>
          <p
            className="mb-[10px] cursor-pointer"
            onClick={handleClickModifyButton}
          >
            수정
          </p>
          <p className="cursor-pointer" onClick={handleClickDeleteButton}>
            삭제
          </p>
        </>
      ) : (
        <p className="cursor-pointer" onClick={handleClickReportButton}>
          신고
        </p>
      )}
    </div>
  );
};

export default memo(ReplyMenu);
