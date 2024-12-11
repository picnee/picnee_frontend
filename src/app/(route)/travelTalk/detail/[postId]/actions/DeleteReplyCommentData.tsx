"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { DeleteReplyCommentParamsType } from "@/types/travelTalk";

export const DeleteReplyCommentData = (
  requestParams: DeleteReplyCommentParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.DeleteReplyComment(requestParams),
  });
};
