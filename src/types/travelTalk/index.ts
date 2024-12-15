export interface TravelTalkRequestParamsType {
  boardCategory: string;
  region: string;
  sort: string
  page: number;
  }

export interface MyPostsParamsType {
  boardCategory: string;
}

export interface MyPostDataType {
  boardRes: {
    boardCategory: string;
    boardId: string;
    region: string;
  };
  commentsCount: number;
  content: string;
  createdAt: string;
  postId: string;
  title: string;
  userRes: {
    nickName: string;
    userId: string;
  };
  viewed: 1;
}

export interface TravelTalkDetailPostParamsType {
  postId: string;
}
  
export interface CreateTravelTalkParamsType {
  title: string
  content: string
  region: string
  boardCategory: string
}

export interface TravelTalkCommentParamsType {
  postId: string
}

export interface InsertCommentParamsType {
  postId: string
  content: string
}

export interface InsertReplyCommentParamsType {
  postId: string
  commentId: string
  content: string
}

export interface InsertPostParamsType {
  title: string
  content: string,
  region: string,
  boardCategory: string,
}
export interface UpdatePostParamsType {
  postId: string
  title: string
  content: string,
  region: string,
  boardCategory: string,
}

export interface DeleteReplyCommentParamsType {
  postId: string
  commentId: string
}

export interface DeletePostParamsType {
  postId: string
}

export interface UpdateReplyCommentParamsType {
  postId: string
  commentId: string
  content: string
}

export interface LikeCommentParamsType {
  postId: string
  commentId: string
}