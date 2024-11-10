interface PropsType {
  index: number;
  item: any;
}

const CardUI = ({ index, item }: PropsType) => {
  return (
    <>
      <div className="w-[384px] h-[184px] border rounded-base bg-gray-200 mb-[16px]"></div>
      <div>
        <p className="text-lg font-semibold mb-[3px]">{item.restaurant}</p>
        <div className="flex gap-[4px] text-2xs text-gray-500">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              // 각 span을 반환하며 ReactNode로 인정되도록 합니다.
              <div
                key={index}
                className=" w-[14px] h-[14px] mt-[0px] rounded-full bg-gray-400"
              ></div>
            ))}
          <span className="ml-[8px]">리뷰 {item.review}</span>
        </div>
        <p className="text-gray-500 text-xs">{item.place}</p>
      </div>
    </>
  );
};

export default CardUI;
