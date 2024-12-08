import { memo, useState } from "react";
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
  replyCommentData: any[];
}

const CommentList = ({ data, replyCommentData }: PropsType) => {
  // 댓글 달기 플래그
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false); // 댓글창 show/hide

  // 대댓글 플래그
  const [showReReplyBox, setShowReReplyBox] = useState<boolean>(false); // 대댓글창 show/hide
  const [reReplyCommentValue, setReReplyCommentValue] = useState<string>(""); // 대댓글 내용 저장

  return (
    data &&
    data.map((item, index) => (
      <div className="border-b border-b-gray-100" key={index}>
        {/* 댓글 */}
        <ReplyComment
          commentData={item}
          showReplyBox={showReplyBox}
          setShowReplyBox={setShowReplyBox}
        />
        {/* 대댓글 */}
        <ReReplyComment
          reReplyCommentData={replyCommentData}
          showReReplyBox={showReReplyBox}
          setShowReReplyBox={setShowReReplyBox}
          reReplyCommentValue={reReplyCommentValue}
          setReReplyCommentValue={setReReplyCommentValue}
        />
      </div>
    ))
  );
};

export default memo(CommentList);
