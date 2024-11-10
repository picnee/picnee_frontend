const MainInputBox = () => {
  return (
    <article className="w-full px-[40px] flex flex-col items-center">
      <h1 className="mb-[36px] font-semibold text-[40px]">
        솔직한 리뷰를 찾고 계신가요?
      </h1>
      {/* input box */}
      <div className="flex rounded-md overflow-hidden border">
        <div className="w-[56px] h-[56px] bg-neutral-200"></div>
        <input
          type="text"
          className="w-[582px] px-2"
          placeholder="리뷰가 궁금한 장소나 위치를 입력해 주세요"
        />
        <div className="w-[56px] h-[56px] bg-neutral-200"></div>
      </div>
    </article>
  );
};

export default MainInputBox;
