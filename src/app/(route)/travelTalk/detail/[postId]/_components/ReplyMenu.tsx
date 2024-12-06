import { memo } from "react";

interface PropsType {
  isMyComment: boolean;
  handleClickModifyButton: () => void;
  handleClickDeleteButton: () => void;
  handleClickReportButton: () => void;
}

const ReplyMenu = ({
  isMyComment,
  handleClickModifyButton,
  handleClickDeleteButton,
  handleClickReportButton,
}: PropsType) => {
  return (
    <div
      className="absolute z-[9999] w-[120px] h-[auto] p-[20px] top-[20px] right-[0px] 
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
