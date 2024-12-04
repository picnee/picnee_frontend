import { GetTravelTalkDetailData } from "@/app/(route)/travelTalk/actions/GetTravelTalkDetailData";
import { GetTravelTalkListData } from "@/app/(route)/travelTalk/actions/GetTravelTalkListData";
import {
  TravelTalkDetailPostParamsType,
  TravelTalkRequestParamsType,
} from "@/types/travelTalk";

/** 여행 토크 게시글 리스트 GET */
export function GetTravelTalkListOptions(
  requestParams: TravelTalkRequestParamsType
) {
  return {
    queryKey: ["travelTalkList", requestParams],
    queryFn: () => GetTravelTalkListData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
  };
}

/** 여행 토크 게시글 상세데이터 GET */
export function GetTravelTalkDetailPostOptions(
  requestParams: TravelTalkDetailPostParamsType
) {
  return {
    queryKey: ["travelTalkDetailData", requestParams],
    queryFn: () => GetTravelTalkDetailData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
  };
}
