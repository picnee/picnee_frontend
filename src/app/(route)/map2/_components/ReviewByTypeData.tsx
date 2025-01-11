import { useEffect, useRef, useState } from "react";

const ReviewByTypeData = ({ item }: any) => {
  const isOver = item.content.length > 91; // 내용이 3줄 넘어가는지 체크
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [showMoreState, setShowMoreState] = useState<boolean>(false);

  useEffect(() => {
    if (
      paragraphRef.current &&
      paragraphRef.current.classList.contains("line-clamp-3")
    ) {
      setShowMoreButton(true);
    } else {
      setShowMoreButton(false);
    }
  }, []);

  return (
    <div>
      <div className="flex gap-[8px] mb-[8px]">
        <div className="w-[22px] h-[22px] bg-gray-100"></div>
        <p className="font-600 text-xs text-gray-400">{item.type}</p>
      </div>
      <div className="">
        <p
          ref={paragraphRef}
          className={`font-400 text-base mb-[10px] ${
            isOver && !showMoreState && "line-clamp-3"
          }`}
        >
          {item.content}
        </p>
      </div>
      {showMoreButton && (
        <button
          className="text-primary-skyblue-400 text-base font-600 mb-[12px]"
          onClick={() => setShowMoreState((prev) => !prev)}
        >
          {showMoreState ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
};

export default ReviewByTypeData;
