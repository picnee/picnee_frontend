"use client";
import { useEffect, useState } from "react";
import SideBarNav from "../../_components/SideBarNav";
import TravelTalkHeader from "../../_components/TravelTalkHeader";
import Sticker from "@/components/common/Sticker";
import Watch from "@/components/common/Watch";
import RoundButton from "@/components/common/button/RoundButton";
import Textarea from "@/components/common/input/Textarea";
import CommentList from "./_components/CommentList";
import { useParams, useRouter } from "next/navigation";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetTravelTalkCommentOptions,
  GetTravelTalkDetailPostOptions,
} from "@/api/travelTalk/query-options";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";
import { InsertCommentData } from "./actions/InsertCommentData";
import { useUserStore } from "@/store/zustand/useUserStore";
import { DeletePostData } from "./actions/DeletePostData";
import { URL } from "@/constants/url";

const TravelTalkListDetailPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // 댓글 관련 상태
  const [comment, setComment] = useState<string>("");
  // 게시글 고유 번호
  const { postId }: any = useParams();
  // 로그인한 유저 정보
  const { user } = useUserStore();
  // 내 게시글 확인 플래그
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  // 상세 데이터 조회 API 호출
  const { data: getDetailPostData }: UseQueryResult<any> = useQuery(
    GetTravelTalkDetailPostOptions({
      postId: postId,
    })
  );
  // 댓글 조회 API 호출
  const { data: getCommentData }: UseQueryResult<any> = useQuery(
    GetTravelTalkCommentOptions({
      postId: postId,
    })
  );

  useEffect(() => {
    if (user && getDetailPostData) {
      setIsMyPost(user?.userId === getDetailPostData.userRes.userId);
    }
  }, [user, getDetailPostData]);

  // 댓글 등록 API 호출
  const mutation = useMutation({
    mutationFn: InsertCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkComment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["travelTalkDetailData"],
      });
      setComment("");
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 게시글 삭제 API 호출
  const deletePostMutation = useMutation({
    mutationFn: DeletePostData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["travelTalkList"],
      });
      router.push(URL.TRAVELTALK.BASE);
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const onClickInsertButton = () => {
    if (comment && postId) {
      mutation.mutate({ postId: postId, content: comment });
    }
  };

  const deletePost = () => {
    console.log("게시글 삭제");
    if (postId) {
      deletePostMutation.mutate({ postId: postId });
    }
  };

  return (
    <div className="pt-[72px]">
      <div className="w-[1200px] pt-[35px] fixed bg-white z-[999]">
        <TravelTalkHeader hasFilter={false} isActiveButton={true} />
      </div>
      <div className="grid grid-cols-4 gap-[24px] pt-[120px]">
        <div className="col-span-1">
          <SideBarNav />
        </div>
        <div className="col-span-3">
          <div className="border border-gray-150 box-border pt-[24px] pb-[0px] rounded-sm">
            <div className="pl-[24px] pr-[24px]">
              <div className="mb-[24px]">
                <Sticker
                  title={
                    getDetailPostData &&
                    getDetailPostData.boardRes.boardCategory
                  }
                />
              </div>
              <div>
                <p className="font-600 text-4xl mb-[7px]">
                  {getDetailPostData && getDetailPostData.title}
                </p>
                <div className="flex gap-[8px] text-sm text-gray-500 items-center mb-[24px]">
                  <div className="w-[28px] h-[28px] bg-gray-150 rounded-full"></div>
                  <p>
                    {getDetailPostData && getDetailPostData.userRes.nickName}
                  </p>
                  <p>•</p>
                  <p>
                    {getDetailPostData &&
                      useFormatTimeAgo(getDetailPostData.createdAt)}
                  </p>
                </div>
                <div className="mb-[40px]">
                  <div className="text-lg font-400">
                    <p>{getDetailPostData && getDetailPostData.content}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 mb-[16px] pl-[24px] pr-[24px]">
              <div className="col-span-3 mt-[10px]">
                <Watch
                  watchNum={getDetailPostData && getDetailPostData.viewed}
                />
              </div>
              <div className="col-span-1 flex gap-[10px] justify-end">
                <RoundButton text="공유" hasIcon={true} />
                {isMyPost ? (
                  <>
                    <RoundButton text="수정" hasIcon={false} />
                    <RoundButton
                      text="삭제"
                      hasIcon={false}
                      onClick={deletePost}
                    />
                  </>
                ) : (
                  <RoundButton text="신고" hasIcon={false} />
                )}
              </div>
            </div>
            <div className="ml-[24px] mr-[24px] mb-[20px] mt-[32px] border border-gray-100"></div>
            <div className="flex gap-[8px] mb-[16px] pl-[24px] pr-[24px]">
              <div className="w-[24px] h-[24px] bg-gray-150"></div>
              <p>댓글 {getDetailPostData && getDetailPostData.commentsCount}</p>
            </div>
            <div className="mb-[0px] pl-[24px] pr-[24px]">
              <Textarea
                varient="default"
                value={comment}
                setValue={setComment}
                handleClickInsertButton={onClickInsertButton}
                placeholder="댓글을 기입해 주세요."
                backgroundColor="#F1F3F6"
                paddingTop="45px"
                isShowPressInput={true}
                infoText={
                  <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                    <p className="text-sm text-gray-600 font-600">
                      {getDetailPostData && getDetailPostData.userRes.nickName}
                    </p>
                  </div>
                }
              />
            </div>
            <div>
              <CommentList data={getCommentData && getCommentData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTalkListDetailPage;
