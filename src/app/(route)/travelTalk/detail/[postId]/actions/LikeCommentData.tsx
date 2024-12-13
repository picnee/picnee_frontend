"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { LikeCommentParamsType } from "@/types/travelTalk";

export const LikeCommentData = (requestParams: LikeCommentParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.LikeComment(requestParams),
  });
};
