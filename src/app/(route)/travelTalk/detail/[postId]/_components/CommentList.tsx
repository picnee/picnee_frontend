import { memo } from "react";
import ReplyComment from "./ReplyComment";
import ReReplyComment from "./ReReplyComment";

interface dataType {
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: [];
  userRes: {
    nickName: string;
    userId: string;
  };
}

interface PropsType {
  data: dataType[];
}

const CommentList = ({ data }: PropsType) => {
  return (
    data &&
    data.map((item, index) => (
      <div className="border-b border-b-gray-100" key={index}>
        {/* 댓글 */}
        <ReplyComment commentData={item} commentId={item.commentId} />
        {/* 대댓글 */}
        <ReReplyComment reReplyCommentData={item.replies} />
      </div>
    ))
  );
};

export default memo(CommentList);
