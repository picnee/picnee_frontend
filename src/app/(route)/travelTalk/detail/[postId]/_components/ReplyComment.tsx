import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import ReplyMenu from "./ReplyMenu";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";

interface PropsData {
  commentData: {
    commentId: string;
    content: string;
    createdAt: string;
    likes: number;
    replies: [];
    userRes: {
      nickName: string;
      userId: string;
    };
  };
  showReplyBox: boolean; // 대글창 현재 상태
  setShowReplyBox: (value: SetStateAction<boolean>) => void; // 댓글창 show/hide
}

const ReplyComment = ({ commentData, setShowReplyBox }: PropsData) => {
  // 내가 작성한 글 플래그
  const isMyComment = false;
  // 현재 활성화된 메뉴와 대댓글 창을 관리하는 상태
  const [showReplyMenu, setShowReplyMenu] = useState<boolean>(false);
  const [activeReplyBoxId, setActiveReplyBoxId] = useState<string | null>(null);
  // 댓글 내용 저장
  const [replyComment, setReplyComment] = useState<string>("");

  // 대댓글 입력창 열기/닫기 핸들러
  const handleToggleReplyBox = useCallback((commentId: string) => {
    setActiveReplyBoxId((prev) =>
      prev === commentData.commentId ? null : commentData.commentId
    );
  }, []);

  const handleClickModifyButton = useCallback(() => {
    setShowReplyMenu!(false);
  }, []);

  const handleClickDeleteButton = useCallback(() => {
    setShowReplyMenu!(false);
  }, []);

  const handleClickReportButton = useCallback(() => {
    setShowReplyMenu!(false);
  }, []);

  const handleClickInsertButton = () => {
    console.log("hhhh");
  };

  return (
    <>
      <div
        className={`grid grid-cols-12 pt-[24px] pl-[24px] pr-[24px] ${
          isMyComment ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="col-span-1">
          <div className="w-[45px] h-[45px] bg-gray-150 rounded-full"></div>
        </div>
        <div className="col-span-10">
          <p className="font-600 text-lg text-gray-900 mb-[5px]">
            {commentData.userRes.nickName}
            {isMyComment && (
              <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                작성자
              </span>
            )}
          </p>
          <p className="font-400 text-lg mb-[6px]">{commentData.content}</p>
          <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
            <p>{useFormatTimeAgo(commentData.createdAt)}</p>
            <Like likeNum={commentData.likes} />
            <p
              className="cursor-pointer"
              onClick={() => handleToggleReplyBox("1")}
            >
              답글 달기
            </p>
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <div
            className="relative w-[17px] h-[6px] cursor-pointer"
            onClick={() => setShowReplyMenu((prev) => !prev)}
          >
            <div>
              <Icon iconName="moreIcon" />
            </div>
            {showReplyMenu && (
              <ReplyMenu
                isMyComment={isMyComment}
                handleClickModifyButton={handleClickModifyButton}
                handleClickDeleteButton={handleClickDeleteButton}
                handleClickReportButton={handleClickReportButton}
              />
            )}
          </div>
        </div>
      </div>
      {activeReplyBoxId === commentData.commentId && (
        <div className="grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-11">
            <Textarea
              varient="default"
              value={replyComment}
              setValue={setReplyComment}
              setReply={setShowReplyBox}
              placeholder="댓글을 기입해 주세요."
              backgroundColor="#F1F3F6"
              paddingTop="45px"
              isShowCancelInput={true}
              isShowPressInput={true}
              infoText={
                <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                  <p className="text-sm text-gray-600 font-600">아이디</p>
                </div>
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ReplyComment);
