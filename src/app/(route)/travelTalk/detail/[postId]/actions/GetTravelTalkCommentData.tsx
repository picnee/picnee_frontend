'use client';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';
import { TravelTalkCommentParamsType } from '@/types/travelTalk';

export const GetTravelTalkCommentData = (
  requestParams: TravelTalkCommentParamsType
) => {
  return backendApi<any>({
    endpoint: API_ENDPOINT.travelTalk.getTravelTalkComment(requestParams),
  });
};
