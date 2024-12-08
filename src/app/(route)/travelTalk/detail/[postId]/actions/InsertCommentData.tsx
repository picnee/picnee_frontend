"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { InsertCommentParamsType } from "@/types/travelTalk";

export const InsertCommentData = (requestParams: InsertCommentParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.InsertComment(requestParams),
    data: {
      content: requestParams.content,
    },
  });
};
