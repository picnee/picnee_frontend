"use client";
import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";

export const GetMyPostsData = () => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getMyPostsData(),
  });
};
