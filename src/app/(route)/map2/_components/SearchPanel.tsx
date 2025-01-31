import RoundButton from "@/components/common/button/RoundButton";
import SearchBox from "@/components/common/input/SearchBox";
import SearchList from "./SearchList";
import { Dispatch, SetStateAction, memo, useRef, useState } from "react";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";

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
  googleMapsApiKey: string | undefined;
  setMapCenter: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setMarkerPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

// 📍 도쿄 기본 중심 좌표
const defaultCenter = {
  lat: 35.682839,
  lng: 139.759455,
};

const SearchPanel = ({
  handleSelectedSearchList,
  googleMapsApiKey,
  setMapCenter,
  setMarkerPosition,
}: PropsType) => {
  // Autocomplete input 참조
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // 장소 검색 시 호출될 함수
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location?.lat() || defaultCenter.lat,
          lng: place.geometry.location?.lng() || defaultCenter.lng,
        };
        setMapCenter(newLocation);
        setMarkerPosition(newLocation);
      }
    }
  };

  return (
    <div className="w-[440px] pt-[20px] h-[100vh] bg-white overflow-scroll">
      {googleMapsApiKey && (
        <div className="mb-[40px] pl-[20px] pr-[20px]">
          <LoadScriptNext
            googleMapsApiKey={googleMapsApiKey}
            libraries={["places"]}
          >
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={onPlaceChanged}
            >
              <SearchBox
                width="100%"
                height="50px"
                placeholder="지도 검색"
                sticker="도쿄"
              />
            </Autocomplete>
          </LoadScriptNext>
        </div>
      )}
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
