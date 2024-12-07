'use client';
import { useState } from 'react';
import SideBarNav from '../../_components/SideBarNav';
import TravelTalkHeader from '../../_components/TravelTalkHeader';
import Sticker from '@/components/common/Sticker';
import Watch from '@/components/common/Watch';
import RoundButton from '@/components/common/button/RoundButton';
import Textarea from '@/components/common/input/Textarea';
import CommentList from './_components/CommentList';
import { useParams } from 'next/navigation';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  GetTravelTalkCommentOptions,
  GetTravelTalkDetailPostOptions,
} from '@/api/travelTalk/query-options';
import useFormatTimeAgo from '@/hooks/useFormatTimeAgo';

const commentListData = [
  {
    id: '일본 여행 초심자',
    comment: '오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요!',
    time: '3',
    like: '13',
  },
  {
    id: '일본 여행 초심자',
    comment: '오늘 도쿄 좀 추웠어요. 목도리에 두꺼운 아우터 입었어요!',
    time: '3',
    like: '13',
  },
];

const replyCommentData = [
  {
    id: '피크니',
    comment: '답변 감사합니다~',
    time: '3',
    like: '1',
  },
  {
    id: '피크니',
    comment: '답변 감사합니다~',
    time: '3',
    like: '1',
  },
];

const TravelTalkListDetailPage = () => {
  // 댓글 관련 상태
  const [comment, setComment] = useState<string>('');
  // 게시글 고유 번호
  const { postId }: any = useParams();
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

  console.log(getCommentData && getCommentData);

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
                <RoundButton text="신고" hasIcon={false} />
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
                placeholder="댓글을 기입해 주세요."
                backgroundColor="#F1F3F6"
                paddingTop="45px"
                isShowPressInput={true}
                infoText={
                  <div className="absolute left-[24px] top-[0px] pt-[18px] text-2xl text-gray-400">
                    <p className="text-sm text-gray-600 font-600">아이디</p>
                  </div>
                }
              />
            </div>
            <div>
              <CommentList
                data={getCommentData && getCommentData}
                replyCommentData={replyCommentData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTalkListDetailPage;
