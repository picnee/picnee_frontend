"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { MyPostsParamsType } from "@/types/travelTalk";

export const GetMyPostsData = (requestParams: MyPostsParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getMyPostsData(requestParams),
  });
};