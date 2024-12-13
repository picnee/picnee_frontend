import { memo } from "react";

interface PropsType {
  likeNum: number | string;
  onClick?: () => void;
}

const Like = ({ likeNum, onClick }: PropsType) => {
  const handleClickButton = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className="flex gap-[10px]">
      <span
        className="block w-[24px] h-[24px] bg-gray-200 cursor-pointer"
        onClick={handleClickButton}
      ></span>
      <span>{likeNum}</span>
    </div>
  );
};

export default memo(Like);
