import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import ReplyMenu from "./ReplyMenu";

interface dataType {
  id: string;
  comment: string;
  time: string;
  like: string;
}

interface PropsData {
  reReplyCommentData: dataType[]; // 대댓글 데이터
  showReReplyBox: boolean; // 대댓글창 현재 상태
  setShowReReplyBox: Dispatch<SetStateAction<boolean>>; // 대댓글창 show/hide
  reReplyCommentValue: string; // 대댓글 내용
  setReReplyCommentValue: Dispatch<SetStateAction<string>>; // 대댓글 내용 저장
}

const ReReplyComment = ({
  reReplyCommentData,
  showReReplyBox,
  setShowReReplyBox,
  reReplyCommentValue,
  setReReplyCommentValue,
}: PropsData) => {
  // 내가 작성한 글 플래그
  const isMyComment = true;
  // 현재 활성화된 메뉴와 대댓글 창을 관리하는 상태
  const [showReReplydMenu, setShowReReplydMenu] = useState<boolean>(false);
  const [activeReplyBoxId, setActiveReplyBoxId] = useState<string | null>(null);

  // 대댓글 입력창 열기/닫기 핸들러
  const handleToggleReplyBox = useCallback((commentId: string) => {
    setActiveReplyBoxId((prev) => (prev === commentId ? null : commentId));
  }, []);

  const handleClickModifyButton = useCallback(() => {
    setShowReReplydMenu!(false);
  }, []);

  const handleClickDeleteButton = useCallback(() => {
    setShowReReplydMenu!(false);
  }, []);

  const handleClickReportButton = useCallback(() => {
    setShowReReplydMenu!(false);
  }, []);

  return (
    <>
      {reReplyCommentData.map((item, index) => {
        const { id, comment, time, like } = item;
        return (
          <div key={index}>
            <div
              className={`grid grid-cols-12 ${
                isMyComment ? "bg-gray-50" : "bg-white"
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
                      {id}
                      {isMyComment && (
                        <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                          작성자
                        </span>
                      )}
                    </p>
                    <p className="font-400 text-lg mb-[6px]">{comment}</p>
                    <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
                      <p>{time}시간 전</p>
                      <Like likeNum={like} />
                      <p
                        className="cursor-pointer"
                        onClick={() => handleToggleReplyBox(item.id)}
                      >
                        답글 달기
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <div
                      className="relative w-[17px] h-[6px] cursor-pointer"
                      onClick={() => setShowReReplydMenu((prev) => !prev)}
                    >
                      <div>
                        <Icon iconName="moreIcon" />
                      </div>
                      {showReReplydMenu && (
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
              </div>
            </div>
            {activeReplyBoxId === item.id && (
              <div className="grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-11">
                  <Textarea
                    varient="default"
                    value={reReplyCommentValue}
                    setValue={setReReplyCommentValue}
                    setReply={setShowReReplyBox}
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
