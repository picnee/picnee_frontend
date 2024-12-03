import { GetTravelTalkListData } from "@/app/(route)/travelTalk/actions/GetTravelTalkListData";

export interface TravelTalkRequestParams {
  boardCategory: string;
  region: string;
  page: number;
}

/** 여행 토크 게시글 리스트 GET */
export function GetTravelTalkListOptions(
  requestParams: TravelTalkRequestParams
) {
  return {
    queryKey: ["travelTalkList", requestParams],
    queryFn: () => GetTravelTalkListData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
  };
}
