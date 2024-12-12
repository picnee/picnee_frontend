"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { UpdateReplyCommentParamsType } from "@/types/travelTalk";

export const UpdateReplyCommentData = (
  requestParams: UpdateReplyCommentParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.UpdateReplyComment(requestParams),
    data: {
      content: requestParams.content,
    },
  });
};
