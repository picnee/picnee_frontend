import RoundButton from "@/components/common/button/RoundButton";
import SearchBox from "@/components/common/input/SearchBox";

const SearchPanel = () => {
  return (
    <div className="p-[20px] h-[100vh] bg-white">
      <div className="mb-[40px]">
        <SearchBox
          width="100%"
          height="50px"
          placeholder="지도 검색"
          sticker="도쿄"
        />
      </div>
      <div className="mb-[20px]">
        <p className="font-600 text-3xl mb-[10px]">도쿄에 방문 예정이신가요?</p>
        <div className="flex gap-[6px]">
          <RoundButton text="리뷰 많은 순" hasIcon={false} />
          <RoundButton text="평점 순" hasIcon={false} />
        </div>
      </div>
      <div>리스트 들어갈 예정</div>
    </div>
  );
};

export default SearchPanel;
