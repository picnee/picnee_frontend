export interface TravelTalkRequestParamsType {
  boardCategory: string;
  region: string;
  page: number;
  }

export interface TravelTalkDetailPostParamsType {
  postId: string;
}
  
export interface CreateTravelTalkParamsType {
  title: "string",
  content: "string",
  region: "오사카",
  boardCategory: "음식점"
}

export interface TravelTalkCommentParamsType {
  postId: string
}