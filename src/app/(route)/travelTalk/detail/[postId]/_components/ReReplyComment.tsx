import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { memo, useCallback, useState } from "react";
import ReplyMenu from "./ReplyMenu";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";
import { useUserStore } from "@/store/zustand/useUserStore";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InsertReplyCommentData } from "../actions/InsertReplyCommentData";
import { useParams } from "next/navigation";

interface dataType {
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

const ReReplyComment = ({ reReplyCommentData, commentId }: PropsData) => {
  const queryClient = useQueryClient();
  // 현재 활성화된 메뉴와 대댓글 창을 관리하는 상태
  const [showReReplydMenu, setShowReReplydMenu] = useState<string>("");
  const [activeReplyBoxId, setActiveReplyBoxId] = useState<string | null>(null);
  // 대댓글 내용 저장
  const [reReplyCommentValue, setReReplyCommentValue] = useState<string>("");
  // 로그인한 유저 정보
  const { user } = useUserStore();
  // 게시글 고유 번호
  const { postId }: any = useParams();

  // 대댓글 입력창 열기/닫기 핸들러
  const handleToggleReplyBox = useCallback((commentId: string) => {
    setActiveReplyBoxId((prev) => (prev === commentId ? null : commentId));
  }, []);

  const handleClickModifyButton = useCallback(() => {
    setShowReReplydMenu!("");
  }, []);

  const handleClickDeleteButton = useCallback(() => {
    setShowReReplydMenu!("");
  }, []);

  const handleClickReportButton = useCallback(() => {
    setShowReReplydMenu!("");
  }, []);

  /** 대댓글 - 답글 달기 */
  const mutation = useMutation({
    mutationFn: InsertReplyCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      setReReplyCommentValue("");
      setActiveReplyBoxId("");
    },
    onError: () => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  const handleClickInsertButton = () => {
    if (postId && commentId && reReplyCommentValue) {
      mutation.mutate({
        postId: postId,
        commentId: commentId,
        content: reReplyCommentValue,
      });
    }
  };

  return (
    <>
      {reReplyCommentData.map((item, index) => {
        return (
          <div key={index}>
            <div
              className={`grid grid-cols-12 ${
                item.userRes.userId === user?.userId ? "bg-gray-50" : "bg-white"
              } pl-[24px] pr-[24px]`}
            >
              <div className="col-span-1"></div>
              <div className="col-span-11 border-t border-t-gray-150">
                <div className="grid grid-cols-12 mt-[24px]">
                  <div className="col-span-1">
                    <div className="w-[45px] h-[45px] bg-gray-150 rounded-full"></div>
                  </div>
                  <div className="col-span-10">
                    <p className="font-600 text-lg text-gray-900 mb-[5px]">
                      {item.userRes.nickName}
                      {item.userRes.userId === user?.userId && (
                        <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                          작성자
                        </span>
                      )}
                    </p>
                    <p className="font-400 text-lg mb-[6px]">{item.content}</p>
                    <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
                      <p>{useFormatTimeAgo(item.createdAt)}</p>
                      <Like likeNum={item.likes} />
                      <p
                        className="cursor-pointer"
                        onClick={() => handleToggleReplyBox(item.createdAt)}
                      >
                        답글 달기
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <div
                      className="relative w-[17px] h-[6px] cursor-pointer"
                      onClick={() => setShowReReplydMenu(item.createdAt)}
                    >
                      <div>
                        <Icon iconName="moreIcon" />
                      </div>
                      {showReReplydMenu === item.createdAt && (
                        <ReplyMenu
                          isMyComment={item.userRes.userId === user?.userId}
                          handleCloseMenu={() => setShowReReplydMenu("")}
                          handleClickModifyButton={handleClickModifyButton}
                          handleClickDeleteButton={handleClickDeleteButton}
                          handleClickReportButton={handleClickReportButton}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {activeReplyBoxId === item.createdAt && (
              <div className="grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-11 pr-[22px]">
                  <Textarea
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

export default memo(ReReplyComment);
