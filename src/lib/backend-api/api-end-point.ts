"use client"
import { Method } from "./types";
import {  CreateTravelTalkParamsType, TravelTalkCommentParamsType, TravelTalkDetailPostParamsType, TravelTalkRequestParamsType } from "@/types/travelTalk";
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
    },
    createTravelTalkPost: (requestParams: CreateTravelTalkParamsType) => {
      return {
        url: `posts/`,
        method: Method.POST,
        authorization: true,
      }
    },
    getTravelTalkComment: (requestParams: TravelTalkCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments`,
        method: Method.GET,
        authorization: true,
      }
    },
  },
} as const;
