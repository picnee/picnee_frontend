export interface MapBestRevieParamsType {
  placeId: string;
}

export interface MapAllRevieParamsType {
  placeId: string;
  sort?: string
  page?: string
}
  
export interface DeleteReviewParamsType {
  reviewId: string
}