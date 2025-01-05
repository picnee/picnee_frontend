import RoundButton from "@/components/common/button/RoundButton";
import SearchBox from "@/components/common/input/SearchBox";
import SearchList from "./SearchList";
import { Dispatch, SetStateAction, memo } from "react";

const dummy = [
  {
    title: "Rojiura Curry SAMURAI - Harajuku",
    category: "음식점",
    openState: "영업 중",
    score: "4.5",
    review: "50",
    id: "피크니1",
    reviewText:
      "도쿄와서 먹은 음식 중에 제일 맛있었어요! 웨이팅이 있었는데, 그래도 기다렸다 먹어도 후회 없을 정도의 맛이였네요. 근처에 백화...",
  },
  {
    title: "Rojiura Curry SAMURAI - Harajuku",
    category: "음식점",
    openState: "영업 중",
    score: "4.5",
    review: "50",
    id: "피크니2",
    reviewText:
      "도쿄와서 먹은 음식 중에 제일 맛있었어요! 웨이팅이 있었는데, 그래도 기다렸다 먹어도 후회 없을 정도의 맛이였네요. 근처에 백화...",
  },
  {
    title: "Rojiura Curry SAMURAI - Harajuku",
    category: "음식점",
    openState: "영업 중",
    score: "4.5",
    review: "50",
    id: "피크니3",
    reviewText:
      "도쿄와서 먹은 음식 중에 제일 맛있었어요! 웨이팅이 있었는데, 그래도 기다렸다 먹어도 후회 없을 정도의 맛이였네요. 근처에 백화...",
  },
  {
    title: "Rojiura Curry SAMURAI - Harajuku",
    category: "음식점",
    openState: "영업 중",
    score: "4.5",
    review: "50",
    id: "피크니4",
    reviewText:
      "도쿄와서 먹은 음식 중에 제일 맛있었어요! 웨이팅이 있었는데, 그래도 기다렸다 먹어도 후회 없을 정도의 맛이였네요. 근처에 백화...",
  },
  {
    title: "Rojiura Curry SAMURAI - Harajuku",
    category: "음식점",
    openState: "영업 중",
    score: "4.5",
    review: "50",
    id: "피크니5",
    reviewText:
      "도쿄와서 먹은 음식 중에 제일 맛있었어요! 웨이팅이 있었는데, 그래도 기다렸다 먹어도 후회 없을 정도의 맛이였네요. 근처에 백화...",
  },
];

interface PropsType {
  handleSelectedSearchList: (value: string) => void;
}
const SearchPanel = ({ handleSelectedSearchList }: PropsType) => {
  return (
    <div className="w-[440px] pt-[20px] h-[100vh] bg-white overflow-scroll">
      <div className="mb-[40px] pl-[20px] pr-[20px]">
        <SearchBox
          width="100%"
          height="50px"
          placeholder="지도 검색"
          sticker="도쿄"
        />
      </div>
      <div className="mb-[20px] pl-[20px] pr-[20px]">
        <p className="font-600 text-3xl mb-[10px]">도쿄에 방문 예정이신가요?</p>
        <div className="flex gap-[6px]">
          <RoundButton hasIcon={true} iconName="filterIcon" />
          <RoundButton text="리뷰 많은 순" hasIcon={false} />
          <RoundButton text="평점 순" hasIcon={false} />
        </div>
      </div>
      <div className="border-t border-gray-150">
        {dummy.map((item) => (
          <SearchList
            searchListData={item}
            key={item.id}
            handleSelectedSearchList={handleSelectedSearchList}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(SearchPanel);
