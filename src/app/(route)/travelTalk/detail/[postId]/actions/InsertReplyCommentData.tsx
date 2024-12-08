"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { InsertReplyCommentParamsType } from "@/types/travelTalk";

export const InsertReplyCommentData = (
  requestParams: InsertReplyCommentParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.InsertReplyComment(requestParams),
    data: {
      content: requestParams.content,
    },
  });
};
