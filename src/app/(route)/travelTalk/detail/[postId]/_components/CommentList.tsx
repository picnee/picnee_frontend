import { memo } from "react";
import Comment from "./Comment";
import Reply from "./Reply";

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
      <div
        className={`${
          data.length - 1 !== index && "border-b border-b-gray-100"
        }`}
        key={index}
      >
        {/* 댓글 */}
        <Comment commentData={item} commentId={item.commentId} />
        {/* 대댓글 */}
        <Reply reReplyCommentData={item.replies} commentId={item.commentId} />
      </div>
    ))
  );
};

export default memo(CommentList);
