"use client";
import { GetMapBestReviewListData } from "@/app/(route)/map2/actions/GetMapBestReviewListData";
import { MapBestRevieParamsType } from "@/types/map";

/** 지도 - 베스트 리뷰 리스트 GET */
export function GetMapBestReviewListOptions(
  requestParams: MapBestRevieParamsType
) {
  return {
    queryKey: ["mapBestReviewList", requestParams],
    queryFn: () => GetMapBestReviewListData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
  };
}
