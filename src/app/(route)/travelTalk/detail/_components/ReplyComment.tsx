import Like from "@/components/common/Like";
import Textarea from "@/components/common/input/Textarea";
import Icon from "@/public/svgs/Icon";
import { Dispatch, SetStateAction } from "react";

interface PropsData {
  listData: any;
  showReplyBox: boolean; // 대글창 현재 상태
  setShowReplyBox: (value: SetStateAction<boolean>) => void; // 댓글창 show/hide
  replyComment: string; // 댓글 내용
  setReplyComment: Dispatch<SetStateAction<string>>; // 댓글 내용 저장
  showReplyMenu: boolean; // 더보기 메뉴 현재 상태
  setShowReplyMenu: (value: SetStateAction<boolean>) => void; // 더보기 메뉴 show/hide
}
const ReplyComment = ({
  listData,
  showReplyMenu,
  setShowReplyBox,
  replyComment,
  setReplyComment,
  showReplyBox,
  setShowReplyMenu,
}: PropsData) => {
  // 내가 작성한 글 플래그
  const isMyComment = false;

  const handleClickModifyButton = () => {
    setShowReplyMenu!(false);
  };

  const handleClickDeleteButton = () => {
    setShowReplyMenu!(false);
  };

  const handleClickReportButton = () => {
    setShowReplyMenu!(false);
  };
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <div className="w-[45px] h-[45px] bg-gray-150 rounded-full"></div>
        </div>
        <div className="col-span-10">
          <p className="font-600 text-lg text-gray-900 mb-[5px]">
            {listData.id}
            {isMyComment && (
              <span className="ml-[8px] pl-[8px] pr-[8px] pt-[3px] pb-[3px] border border-green rounded-[50px] font-500 text-sm text-green">
                작성자
              </span>
            )}
          </p>
          <p className="font-400 text-lg mb-[6px]">{listData.comment}</p>
          <div className="flex gap-[20px] font-400 text-sm text-gray-500 mb-[24px]">
            <p>{listData.time}시간 전</p>
            <Like likeNum={listData.Like} />
            <p
              className="cursor-pointer"
              onClick={() => setShowReplyBox((prev) => !prev)}
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
              <div
                className="absolute z-[9999] w-[120px] h-[auto] p-[20px] top-[20px] right-[0px] 
        shadow-[0px_2px_16px_rgba(0,0,0,0.25)] rounded-m bg-white"
              >
                {isMyComment ? (
                  <>
                    <p
                      className="mb-[10px] cursor-pointer"
                      onClick={handleClickModifyButton}
                    >
                      수정
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={handleClickDeleteButton}
                    >
                      삭제
                    </p>
                  </>
                ) : (
                  <p
                    className="cursor-pointer"
                    onClick={handleClickReportButton}
                  >
                    신고
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showReplyBox && (
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

export default ReplyComment;
