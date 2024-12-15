import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { memo, useCallback, useState } from "react";
import ReplyMenu from "./ReplyMenu";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { InsertReplyCommentData } from "../actions/InsertReplyCommentData";
import { useUserStore } from "@/store/zustand/useUserStore";
import { DeleteReplyCommentData } from "../actions/DeleteReplyCommentData";
import { UpdateReplyCommentData } from "../actions/UpdateReplyCommentData";
import { LikeCommentData } from "../actions/LikeCommentData";

interface commentDataType {
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
  commentId: string;
}

const Comment = ({ commentData, commentId }: commentDataType) => {
  const queryClient = useQueryClient();
  // 게시글 고유 번호
  const { postId }: any = useParams();
  // 로그인한 유저 정보
  const { user } = useUserStore();
  // 현재 활성화된 메뉴와 대댓글 창을 관리하는 상태
  const [showReplyMenu, setShowReplyMenu] = useState<boolean>(false);
  const [activeReplyBoxId, setActiveReplyBoxId] = useState<string | null>(null);
  // 댓글 내용 저장
  const [replyComment, setReplyComment] = useState<string>("");
  // 수정 댓글 창 플래그
  const [isOpenUpdateReplyBox, setIsOpenUpdateReplyBox] =
    useState<boolean>(false);
  // 수정 댓글 내용
  const [updateComment, setUpdateComment] = useState<string>(
    commentData.content
  );

  /** 댓글 - 답글 달기 API */
  const mutation = useMutation({
    mutationFn: InsertReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
      setReplyComment("");
      setActiveReplyBoxId("");
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 댓글 - 삭제 API */
  const deleteReplyCommentMutation = useMutation({
    mutationFn: DeleteReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
      setShowReplyMenu(false);
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 댓글 - 수정 API */
  const updateReplyCommentMutation = useMutation({
    mutationFn: UpdateReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      setIsOpenUpdateReplyBox(false);
      setShowReplyMenu(false);
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 댓글 - 좋아요 API */
  const likeCommentMutaion = useMutation({
    mutationFn: LikeCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 대댓글 입력창 열기/닫기 핸들러
  const handleToggleReplyBox = useCallback((commentId: string) => {
    setActiveReplyBoxId((prev) =>
      prev === commentData.commentId ? null : commentData.commentId
    );
  }, []);

  const handleClickModifyButton = useCallback(() => {
    setShowReplyMenu!(false);
    setIsOpenUpdateReplyBox(true);
  }, []);

  const handleClickReportButton = useCallback(() => {
    setShowReplyMenu!(false);
  }, []);

  const handleClickDeleteButton = useCallback(() => {
    setShowReplyMenu!(false);
    if (postId && commentId) {
      deleteReplyCommentMutation.mutate({
        postId: postId,
        commentId: commentId,
      });
    }
  }, [postId, commentId]);

  const handleClickInsertButton = useCallback(() => {
    if (postId && commentId && replyComment) {
      mutation.mutate({
        postId: postId,
        commentId: commentId,
        content: replyComment,
      });
    }
  }, [postId, commentId, replyComment]);

  const handleClickUpdateButton = useCallback(() => {
    if (postId && commentId && updateComment) {
      updateReplyCommentMutation.mutate({
        postId: postId,
        commentId: commentId,
        content: updateComment,
      });
    }
  }, [postId, commentId, updateComment]);

  const onClickLike = useCallback(() => {
    if (postId && commentId) {
      likeCommentMutaion.mutate({
        postId: postId,
        commentId: commentId,
      });
    }
  }, [postId, commentId]);

  return (
    <>
      <div
        className={`grid grid-cols-12 pt-[24px] pl-[24px] pr-[24px] ${
          user?.userId === commentData.userRes.userId
            ? "bg-gray-50"
            : "bg-white"
        } last:rounded-sm`}
      >
        <div className="col-span-1">
          <div className="w-[45px] h-[45px] bg-gray-150 rounded-full"></div>
        </div>
        {!isOpenUpdateReplyBox ? (
          <div className="col-span-10">
            <p className="font-600 text-lg text-gray-900 mb-[5px]">
              {commentData.userRes.nickName}
              {user?.userId === commentData.userRes.userId && (
                <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                  작성자
                </span>
              )}
            </p>
            <p className="font-400 text-lg mb-[6px]">{commentData.content}</p>
            <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
              <p>{useFormatTimeAgo(commentData.createdAt)}</p>
              <Like likeNum={commentData.likes} onClick={onClickLike} />
              <p
                className="cursor-pointer"
                onClick={() => handleToggleReplyBox(commentData.commentId)}
              >
                답글 달기
              </p>
            </div>
          </div>
        ) : (
          // 수정 버튼 클릭 시 보이는 댓글 창
          <div className="col-span-11">
            <Textarea
              id="update-comment"
              varient="default"
              value={updateComment}
              setValue={setUpdateComment}
              handleClickInsertButton={handleClickInsertButton}
              handleClickCancelButton={() => {
                setIsOpenUpdateReplyBox(false);
                setShowReplyMenu(false);
              }}
              handleClickUpdateButton={handleClickUpdateButton}
              placeholder="댓글을 기입해 주세요."
              backgroundColor="#F1F3F6"
              paddingTop="45px"
              isShowCancelInput={true}
              isShowPressInput={false}
              isShowUpdateInput={true}
              infoText={
                <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                  <p className="text-sm text-gray-600 font-600">
                    {commentData.userRes.nickName}
                  </p>
                </div>
              }
            />
          </div>
        )}
        {!isOpenUpdateReplyBox && (
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
                  isMyComment={user?.userId === commentData.userRes.userId}
                  handleCloseMenu={() => setShowReplyMenu(false)}
                  handleClickModifyButton={handleClickModifyButton}
                  handleClickDeleteButton={handleClickDeleteButton}
                  handleClickReportButton={handleClickReportButton}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {activeReplyBoxId === commentData.commentId && (
        <div className="grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-11 pr-[22px] pt-[24px]">
            <Textarea
              id="comment"
              varient="default"
              value={replyComment}
              setValue={setReplyComment}
              handleClickInsertButton={handleClickInsertButton}
              handleClickCancelButton={() => setActiveReplyBoxId("")}
              placeholder="댓글을 기입해 주세요."
              backgroundColor="#F1F3F6"
              paddingTop="45px"
              isShowCancelInput={true}
              isShowPressInput={true}
              infoText={
                <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                  <p className="text-sm text-gray-600 font-600">
                    {commentData.userRes.nickName}
                  </p>
                </div>
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Comment);
