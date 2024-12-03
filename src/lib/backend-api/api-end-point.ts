"use client"
import { TravelTalkRequestParams } from "@/api/travelTalk/query-options";
import { Method } from "./types";
export type ApiEndpoint = {
  url: string;
  method: Method;
  authorization: boolean;
};

export const API_ENDPOINT = {
  travelTalk: {
    getTravelTalkList: (requestParams: TravelTalkRequestParams) => {
      return {
        url: `posts?boardCategory=${requestParams.boardCategory}&region=${requestParams.region}&page=${requestParams.page}`,
        method: Method.GET,
        authorization: true,
      }
    } 
  },
} as const;
