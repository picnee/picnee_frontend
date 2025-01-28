import { API_ENDPOINT } from "@/lib/backend-api/api-end-point";
import { backendApi } from "@/lib/backend-api/client";
import { DeleteReviewParamsType } from "@/types/map";

export const DeleteReviewData = (requestParams: DeleteReviewParamsType) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.map.DeleteReview(requestParams),
  });
};
