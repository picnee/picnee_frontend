const SpeechBubble = ({
  text,
  id,
  hasAvatar,
}: {
  text: string;
  id: string;
  hasAvatar: boolean;
}) => {
  return (
    <div className="relative w-full pl-[12px] pr-[12px] pt-[14px] pb-[14px] bg-[#F1F3F6] text-black rounded-lg">
      {/* 말풍선 꼭지 */}
      <div className="absolute top-[-8px] left-[16px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#F1F3F6]"></div>

      {/* 본체 */}
      <div className="flex gap-[10px]">
        {hasAvatar && (
          <div className="w-[32px] h-[32px] bg-gray-200 rounded-full flex-shrink-0"></div>
        )}
        <p
          title={text}
          className="text-2xs font-400 text-gray-500 line-clamp-2 overflow-hidden text-ellipsis"
        >
          <span className="font-600 text-black">{id} </span>
          {text}
        </p>
      </div>
    </div>
  );
};

export default SpeechBubble;
