import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { memo, useCallback, useEffect, useState } from "react";
import ReplyMenu from "./ReplyMenu";
import FormatTimeAgo from "@/utils/FormatTimeAgo";
import { useUserStore } from "@/store/zustand/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertReplyCommentData } from "../actions/InsertReplyCommentData";
import { useParams } from "next/navigation";
import { DeleteReplyCommentData } from "../actions/DeleteReplyCommentData";
import { UpdateReplyCommentData } from "../actions/UpdateReplyCommentData";
import { LikeCommentData } from "../actions/LikeCommentData";
import useQueryParam from "@/hooks/useQueryParam";
import ScrollIntoView from "@/utils/ScrollIntoView";

interface dataType {
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  userRes: {
    nickName: string;
    userId: string;
  };
}

interface PropsData {
  reReplyCommentData: dataType[]; // 대댓글 데이터
  commentId: string;
}

const Reply = ({ reReplyCommentData, commentId }: PropsData) => {
  const queryClient = useQueryClient();
  // 내가 쓴 댓글 아이디
  const myCommentId = useQueryParam("myComment");
  // 로그인한 유저 정보
  const { user } = useUserStore();
  // 게시글 고유 번호
  const { postId }: any = useParams();
  // 현재 활성화된 메뉴와 대댓글 창을 관리하는 상태
  const [showReReplyMenu, setShowReReplyMenu] = useState<string>("");
  const [activeReplyBoxId, setActiveReplyBoxId] = useState<string | null>(null);
  // 대댓글 내용 저장
  const [reReplyCommentValue, setReReplyCommentValue] = useState<string>("");
  // 수정 댓글 창 플래그
  const [isOpenUpdateReReplyBox, setIsOpenUpdateReReplyBox] =
    useState<string>("");
  // 수정 댓글 내용
  const [updateComment, setUpdateComment] = useState<string>("");

  /** 대댓글 - 답글 달기 */
  const mutation = useMutation({
    mutationFn: InsertReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
      // 내가 쓴 댓글 업데이트
      queryClient.invalidateQueries({
        queryKey: ["myTravelTalkCommentData"],
      });
      setReReplyCommentValue("");
      setActiveReplyBoxId("");
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 대댓글 - 삭제 API */
  const deletReReplyCommentMutation = useMutation({
    mutationFn: DeleteReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
      // 내가 쓴 댓글 업데이트
      queryClient.invalidateQueries({
        queryKey: ["myTravelTalkCommentData"],
      });
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 대댓글 - 수정 API */
  const updateReReplyCommenMutation = useMutation({
    mutationFn: UpdateReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      // 내가 쓴 댓글 업데이트
      queryClient.invalidateQueries({
        queryKey: ["myTravelTalkCommentData"],
      });
      setIsOpenUpdateReReplyBox("");
      setShowReReplyMenu("");
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  /** 대댓글 - 좋아요 API */
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

  /** 내가 쓴 대댓글 위치로 스크롤 이동 */
  useEffect(() => {
    if (myCommentId !== null) {
      ScrollIntoView(myCommentId);
    }
  }, [myCommentId]);

  // 대댓글 입력창 열기/닫기
  const handleToggleReplyBox = useCallback((replyId: string) => {
    setActiveReplyBoxId((prev) => (prev === replyId ? null : replyId));
  }, []);

  const handleClickModifyButton = useCallback((id: string) => {
    setShowReReplyMenu!("");
    setIsOpenUpdateReReplyBox(id);
  }, []);

  const handleClickDeleteButton = useCallback(
    (replyId: string) => {
      setShowReReplyMenu!("");
      if (postId && replyId) {
        deletReReplyCommentMutation.mutate({
          postId: postId,
          commentId: replyId,
        });
      }
    },
    [postId]
  );

  const handleClickReportButton = useCallback(() => {
    setShowReReplyMenu!("");
  }, []);

  const handleClickInsertButton = useCallback(() => {
    if (postId && commentId && reReplyCommentValue) {
      mutation.mutate({
        postId: postId,
        commentId: commentId,
        content: reReplyCommentValue,
      });
    }
  }, [postId, commentId, reReplyCommentValue]);

  const handleClickUpdateButton = useCallback(
    (replyId: string) => {
      if (postId && replyId && updateComment) {
        updateReReplyCommenMutation.mutate({
          postId: postId,
          commentId: replyId,
          content: updateComment,
        });
      }
    },
    [postId, updateComment]
  );

  const onClickLike = useCallback(
    (replyId: string) => {
      if (postId && replyId) {
        likeCommentMutaion.mutate({
          postId: postId,
          commentId: replyId,
        });
      }
    },
    [postId]
  );

  return (
    <>
      {reReplyCommentData.map((item) => {
        return (
          <div key={item.commentId} id={item.commentId}>
            <div
              className={`grid grid-cols-12 ${
                myCommentId === item.commentId ? "bg-gray-50" : "bg-white"
              } pl-[24px] pr-[24px]`}
            >
              <div className="col-span-1"></div>
              <div className="col-span-11 border-t border-t-gray-150">
                <div className="grid grid-cols-12 mt-[24px]">
                  <div className="col-span-1">
                    <div className="w-[45px] h-[45px] bg-gray-150 rounded-full"></div>
                  </div>
                  {isOpenUpdateReReplyBox !== item.commentId ? (
                    // 대댓글 내용
                    <>
                      <div className="col-span-10">
                        <p className="font-600 text-lg text-gray-900 mb-[5px]">
                          {item.userRes.nickName}
                          {item.userRes.userId === user?.userId && (
                            <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                              작성자
                            </span>
                          )}
                        </p>
                        <p className="font-400 text-lg mb-[6px]">
                          {item.content}
                        </p>
                        <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
                          <p>{FormatTimeAgo(item.createdAt)}</p>
                          <Like
                            likeNum={item.likes}
                            onClick={() => onClickLike(item.commentId)}
                          />
                          <p
                            className="cursor-pointer"
                            onClick={() => handleToggleReplyBox(item.commentId)}
                          >
                            답글 달기
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <div
                          className="relative w-[17px] h-[6px] cursor-pointer"
                          onClick={() => setShowReReplyMenu(item.commentId)}
                        >
                          <div>
                            <Icon iconName="moreIcon" />
                          </div>
                          {showReReplyMenu === item.commentId && (
                            <ReplyMenu
                              isMyComment={item.userRes.userId === user?.userId}
                              handleCloseMenu={() => setShowReReplyMenu("")}
                              handleClickModifyButton={() => {
                                handleClickModifyButton(item.commentId);
                                setUpdateComment(item.content);
                              }}
                              handleClickDeleteButton={() =>
                                handleClickDeleteButton(item.commentId)
                              }
                              handleClickReportButton={handleClickReportButton}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // 대댓글 수정
                    isOpenUpdateReReplyBox === item.commentId && (
                      <div className="col-span-11">
                        <Textarea
                          id="update-reply"
                          width="708px"
                          varient="default"
                          value={updateComment}
                          setValue={setUpdateComment}
                          handleClickCancelButton={() => {
                            setIsOpenUpdateReReplyBox("");
                            setShowReReplyMenu("");
                          }}
                          handleClickUpdateButton={() =>
                            handleClickUpdateButton(item.commentId)
                          }
                          placeholder="댓글을 기입해 주세요."
                          backgroundColor="#F1F3F6"
                          paddingTop="45px"
                          isShowCancelInput={true}
                          isShowPressInput={false}
                          isShowUpdateInput={true}
                          infoText={
                            <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                              <p className="text-sm text-gray-600 font-600">
                                아이디
                              </p>
                            </div>
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            {activeReplyBoxId === item.commentId && (
              // 댓글 - 답글 달기
              <div className="grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-11 pr-[22px] pt-[24px]">
                  <Textarea
                    id="reply"
                    width="795px"
                    varient="default"
                    value={reReplyCommentValue}
                    setValue={setReReplyCommentValue}
                    handleClickInsertButton={handleClickInsertButton}
                    handleClickCancelButton={() => setActiveReplyBoxId("")}
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
          </div>
        );
      })}
    </>
  );
};

export default memo(Reply);
