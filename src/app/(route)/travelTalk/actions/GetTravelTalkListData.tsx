"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { TravelTalkRequestParamsType } from "@/types/travelTalk";

export const GetTravelTalkListData = (
  requestParams: TravelTalkRequestParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getTravelTalkList(requestParams),
  });
};
