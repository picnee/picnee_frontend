import { memo } from "react";

interface PropsType {
  likeNum: number | string;
}

const Like = ({ likeNum }: PropsType) => {
  return (
    <div className="flex gap-[10px]">
      <span className="block w-[24px] h-[24px] bg-gray-200"></span>
      <span>{likeNum}</span>
    </div>
  );
};

export default memo(Like);
