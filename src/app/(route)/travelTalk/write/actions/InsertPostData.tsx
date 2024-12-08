"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { InsertPostParamsType } from "@/types/travelTalk";

export const InsertPostData = (requestParams: InsertPostParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.InsertPost(requestParams),
    data: {
      title: requestParams.title,
      content: requestParams.content,
      region: requestParams.region,
      boardCategory: requestParams.boardCategory,
    },
  });
};
