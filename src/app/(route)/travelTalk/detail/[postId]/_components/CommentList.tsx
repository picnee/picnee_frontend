import { useState } from "react";
import ReplyComment from "./ReplyComment";
import ReReplyComment from "./ReReplyComment";

interface dataType {
  id: string;
  comment: string;
  time: string;
  like: string;
}

interface PropsType {
  data: dataType[];
  replyCommentData: dataType[];
}

const CommentList = ({ data, replyCommentData }: PropsType) => {
  // 댓글 달기 플래그
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false); // 댓글창 show/hide
  const [replyComment, setReplyComment] = useState<string>(""); // 댓글 내용 저장
  // 대댓글 플래그
  const [showReReplyBox, setShowReReplyBox] = useState<boolean>(false); // 대댓글창 show/hide
  const [reReplyCommentValue, setReReplyCommentValue] = useState<string>(""); // 대댓글 내용 저장
  // 더보기 메뉴 플래그
  const [showReplyMenu, setShowReplyMenu] = useState<boolean>(false); // 댓글 더보기
  const [showReReplydMenu, setShowReReplydMenu] = useState<boolean>(false); // 대댓글 더보기
  // 내가 작성한 글 플래그
  const isMyComment = true;

  return data.map((item, index) => (
    <div className="border-b border-b-gray-100" key={index}>
      {/* 댓글 */}
      <ReplyComment
        listData={item}
        showReplyBox={showReplyBox}
        setShowReplyBox={setShowReplyBox}
        replyComment={replyComment}
        setReplyComment={setReplyComment}
        showReplyMenu={showReplyMenu}
        setShowReplyMenu={setShowReplyMenu}
      />
      {/* 대댓글 */}
      <ReReplyComment
        reReplyCommentData={replyCommentData}
        showReReplyBox={showReReplyBox}
        setShowReReplyBox={setShowReReplyBox}
        showReReplydMenu={showReReplydMenu}
        setShowReReplydMenu={setShowReReplydMenu}
        reReplyCommentValue={reReplyCommentValue}
        setReReplyCommentValue={setReReplyCommentValue}
      />
    </div>
  ));
};

export default CommentList;
