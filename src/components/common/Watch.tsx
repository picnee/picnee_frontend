import Icon from "@/public/svgs/Icon";
import { memo } from "react";

interface PropsType {
  watchNum: number | string;
}

const Watch = ({ watchNum }: PropsType) => {
  return (
    <div className="flex gap-[10px]">
      <span className="block w-[24px] h-[24px]">
        <Icon iconName="watch" />
      </span>
      <span>{watchNum}</span>
    </div>
  );
};

export default memo(Watch);
