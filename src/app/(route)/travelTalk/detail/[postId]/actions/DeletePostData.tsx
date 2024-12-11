"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { DeletePostParamsType } from "@/types/travelTalk";

export const DeletePostData = (requestParams: DeletePostParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.DeletePost(requestParams),
  });
};
