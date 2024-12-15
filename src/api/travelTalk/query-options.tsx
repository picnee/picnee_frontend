"use client";
import { GetTravelTalkDetailData } from "@/app/(route)/travelTalk/detail/[postId]/actions/GetTravelTalkDetailData";
import { GetTravelTalkListData } from "@/app/(route)/travelTalk/actions/GetTravelTalkListData";
import {
  MyPostsParamsType,
  TravelTalkCommentParamsType,
  TravelTalkDetailPostParamsType,
  TravelTalkRequestParamsType,
} from "@/types/travelTalk";
import { GetTravelTalkCommentData } from "@/app/(route)/travelTalk/detail/[postId]/actions/GetTravelTalkCommentData";
import { GetMyPostsData } from "@/app/(route)/travelTalk/actions/GetMyPostsData";
import { GetMyCommentsData } from "@/app/(route)/travelTalk/actions/GetMyCommentsData";

/** 여행 토크 카테고리별 게시글 리스트 GET */
export function GetTravelTalkListOptions(
  requestParams: TravelTalkRequestParamsType
) {
  return {
    queryKey: ["travelTalkList", requestParams],
    queryFn: () => GetTravelTalkListData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
    enabled: !(
      requestParams.boardCategory === "내가 쓴 글" ||
      requestParams.boardCategory === "내가 쓴 댓글"
    ),
  };
}

/** 여행 토크 내가 쓴 게시글 리스트 GET */
export function GetMyPostsOptions(requestParams: MyPostsParamsType) {
  return {
    queryKey: ["myTravelTalkPostsData"],
    queryFn: () => GetMyPostsData(),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
    enabled: requestParams.boardCategory === "내가 쓴 글",
  };
}

/** 여행 토크 내가 쓴 댓글 리스트 GET */
export function GetMyCommentsOptions(requestParams: MyPostsParamsType) {
  return {
    queryKey: ["myTravelTalkCommentData"],
    queryFn: () => GetMyCommentsData(),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
    enabled: requestParams.boardCategory === "내가 쓴 댓글",
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

/** 여행 토크 게시글 댓글 데이터 GET */
export function GetTravelTalkCommentOptions(
  requestParams: TravelTalkCommentParamsType
) {
  return {
    queryKey: ["travelTalkComment", requestParams],
    queryFn: () => GetTravelTalkCommentData(requestParams),
    staleTime: 1000 * 60 * 10, // 10분
    catchTime: 1000 * 60 * 60 * 24, // 24시간
  };
}
