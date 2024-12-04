"use client"
import { Method } from "./types";
import {  TravelTalkDetailPostParamsType, TravelTalkRequestParamsType } from "@/types/travelTalk";
export type ApiEndpoint = {
  url: string;
  method: Method;
  authorization: boolean;
};

export const API_ENDPOINT = {
  travelTalk: {
    getTravelTalkList: (requestParams: TravelTalkRequestParamsType) => {
      return {
        url: `posts?boardCategory=${requestParams.boardCategory}&region=${requestParams.region}&page=${requestParams.page}`,
        method: Method.GET,
        authorization: true,
      }
    },
    getTravelTalkDetail: (requestParams: TravelTalkDetailPostParamsType) => {
      return {
        url: `posts/${requestParams.postId}`,
        method: Method.GET,
        authorization: true,
      }
    }
  },
} as const;
