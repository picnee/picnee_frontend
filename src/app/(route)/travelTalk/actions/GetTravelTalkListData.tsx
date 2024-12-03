"use client";
import { TravelTalkRequestParams } from "@/api/travelTalk/query-options";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";

export const GetTravelTalkListData = (
  requestParams: TravelTalkRequestParams
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getTravelTalkList(requestParams),
  });
};
