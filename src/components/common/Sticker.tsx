import { memo } from "react";

interface PropsType {
  title: string;
}
const Sticker = ({ title }: PropsType) => {
  return (
    <div className="text-sm pl-[8px] pr-[8px] text-gray-400 bg-gray-100 rounded-xs inline-block h-[24px]">
      <p className="text-center">{title}</p>
    </div>
  );
};

export default memo(Sticker);
