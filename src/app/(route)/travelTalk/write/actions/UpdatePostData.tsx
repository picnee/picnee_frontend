"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { UpdatePostParamsType } from "@/types/travelTalk";

export const UpdatePostData = (requestParams: UpdatePostParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.UpdatePost(requestParams),
    data: {
      title: requestParams.title,
      content: requestParams.content,
      region: requestParams.region,
      boardCategory: requestParams.boardCategory,
    },
  });
};
