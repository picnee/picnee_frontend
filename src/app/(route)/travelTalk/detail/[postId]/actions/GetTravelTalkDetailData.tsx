"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { TravelTalkDetailPostParamsType } from "@/types/travelTalk";

export const GetTravelTalkDetailData = (
  requestParams: TravelTalkDetailPostParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getTravelTalkDetail(requestParams),
  });
};
