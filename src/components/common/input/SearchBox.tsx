import Icon from "@/public/svgs/Icon";

interface SearchBoxProps {
  width: string;
  height: string;
  placeholder: string;
  sticker?: string;
}

export default function SearchBox({
  width,
  height,
  placeholder,
  sticker = "",
}: SearchBoxProps) {
  return (
    <div
      className={`flex items-center w-[${width}] h-[${height}] bg-white border-[3px] border-[#F0EBFF] rounded-lg overflow-hidden"`}
    >
      {sticker !== "" && (
        <div className="ml-[10px] whitespace-nowrap bg-[#F0EBFF] text-[#8000FF] pt-[3px] pb-[3px] pl-[12px] pr-[12px] rounded-[5px]">
          도쿄
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-3 bg-transparent border-none outline-none placeholder-[#9FA1A7] text-lg"
      />
      <div className="w-[52px] h-[52px] flex items-center justify-center">
        <Icon iconName="searchIcon" />
      </div>
    </div>
  );
}
