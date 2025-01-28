"use client";

import { useCallback, useState } from "react";
import SideMenu from "./_components/SideMenu";
import SearchPanel from "./_components/SearchPanel";
import DetailList from "./_components/DetailList";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteReviewData } from "./actions/DeleteReviewData";

export interface DeletePropsType {
  isShowConfirmModal: boolean;
  reviewId: string;
}
const map = () => {
  const queryClient = useQueryClient();
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSearchList, setSelectedSearchList] = useState<string>("");
  // 리뷰 데이터 - 모달 활성화 여부, 리뷰ID
  const [reviewData, setReviewData] = useState<DeletePropsType>({
    isShowConfirmModal: false,
    reviewId: "",
  });

  const handleSelectedSearchList = useCallback((value: string) => {
    setSelectedSearchList(value);
  }, []);

  // 리뷰 삭제 API 호출
  const mutation = useMutation({
    mutationFn: DeleteReviewData,
    onSuccess: () => {
      // 베스트 리뷰 업데이트
      queryClient.invalidateQueries({
        queryKey: ["mapBestReviewList"],
      });
      // 전체 리뷰 업데이트
      queryClient.invalidateQueries({
        queryKey: ["mapAllReviewList"],
      });
    },
    onError: (error) => {
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteButton = () => {
    if (reviewData.reviewId) {
      mutation.mutate({ reviewId: reviewData.reviewId });
    }
  };

  return (
    <>
      <div className="w-[100vw] mt-[-73px] bg-gray-600">
        <div className="flex">
          <SideMenu
            setSelectedMenu={setSelectedMenu}
            setShowSearchPanel={setShowSearchPanel}
          />
          {showSearchPanel && (
            <SearchPanel handleSelectedSearchList={handleSelectedSearchList} />
          )}
          {selectedSearchList && (
            <DetailList
              handleSelectedSearchList={handleSelectedSearchList}
              setReviewData={setReviewData}
            />
          )}
        </div>
      </div>
      {/* 삭제 확인용 모달 */}
      {reviewData.isShowConfirmModal && (
        <ConfirmModal
          text="댓글을 삭제하시겠습니까?"
          setReviewData={setReviewData}
          onClick={handleDeleteButton}
        />
      )}
    </>
  );
};

export default map;
