import { Method } from "./types";
import {  DeletePostParamsType, DeleteReplyCommentParamsType, InsertCommentParamsType, InsertPostParamsType, InsertReplyCommentParamsType, TravelTalkCommentParamsType, TravelTalkDetailPostParamsType, TravelTalkRequestParamsType, UpdatePostParamsType, UpdateReplyCommentParamsType } from "@/types/travelTalk";
export type ApiEndpoint = {
  url: string;
  method: Method;
};

export const API_ENDPOINT = {
  travelTalk: {
    // 여행토크 리스트 조회
    getTravelTalkList: (requestParams: TravelTalkRequestParamsType) => {
      return {
        url: `posts?boardCategory=${requestParams.boardCategory}&region=${requestParams.region}&page=${requestParams.page}`,
        method: Method.GET,
      }
    },
    // 여행토크 게시글 등록
    InsertPost: (requestParams: InsertPostParamsType) => {
      return {
        url: `posts`,
        method: Method.POST,
      }
    },
     // 여행토크 게시글 수정
     UpdatePost: (requestParams: UpdatePostParamsType) => {
      return {
        url: `posts/${requestParams.postId}`,
        method: Method.PATCH,
      }
    },
    
    // 여행토크 게시글 삭제
    DeletePost: (requestParams:DeletePostParamsType) => {
      return {
        url: `posts/${requestParams.postId}`,
        method: Method.DELETE,
      }
    },
    // 여행토크 싱세 데이터 조회
    getTravelTalkDetail: (requestParams: TravelTalkDetailPostParamsType) => {
      return {
        url: `posts/${requestParams.postId}`,
        method: Method.GET,
      }
    },
    // 여행토크 댓글 조회
    getTravelTalkComment: (requestParams: TravelTalkCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments`,
        method: Method.GET,
      }
    },
    // 여행토크 댓글 등록
    InsertComment: (requestParams: InsertCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments`,
        method: Method.POST,
      }
    },
    // 여행토크 댓글/대댓글 - 답글 달기 등록
    InsertReplyComment: (requestParams: InsertReplyCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments/${requestParams.commentId}`,
        method: Method.POST,
      }
    },
    // 여행토크 댓글 삭제
    DeleteReplyComment: (requestParams: DeleteReplyCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments/${requestParams.commentId}`,
        method: Method.DELETE,
      }
    },
    // 여행토크 댓글 수정
    UpdateReplyComment: (requestParams: UpdateReplyCommentParamsType) => {
      return {
        url: `posts/${requestParams.postId}/comments/${requestParams.commentId}`,
        method: Method.PATCH,
      }
    },
  },
} as const;
