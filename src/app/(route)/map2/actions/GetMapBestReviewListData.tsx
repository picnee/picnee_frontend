import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { MapBestRevieParamsType } from "@/types/map";

export const GetMapBestReviewListData = (
  requestParams: MapBestRevieParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.map.BastReview(requestParams),
  });
};
