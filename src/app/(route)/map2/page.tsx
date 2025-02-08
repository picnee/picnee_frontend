"use client";

import { useCallback, useState } from "react";
import SideMenu from "./_components/SideMenu";
import SearchPanel from "./_components/SearchPanel";
import DetailList from "./_components/DetailList";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteReviewData } from "./actions/DeleteReviewData";
import GoogleMapComponent from "./_components/GoogleMap";

export interface DeletePropsType {
  isShowConfirmModal: boolean;
  id?: string;
}

// 📍 도쿄 기본 중심 좌표
const defaultCenter = {
  lat: 35.682839,
  lng: 139.759455,
};

const map = () => {
  const queryClient = useQueryClient();
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSearchList, setSelectedSearchList] = useState<string>("");
  // 리뷰 데이터 - 모달 활성화 여부, 리뷰ID
  const [reviewData, setReviewData] = useState<DeletePropsType>({
    isShowConfirmModal: false,
    id: "",
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
    if (reviewData.id) {
      mutation.mutate({ reviewId: reviewData.id });
    }
  };

  // 지도 API key
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  // 지도 중심 상태 관리 (기본값: 도쿄)
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  // 검색한 위치의 마커 상태
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  return (
    <>
      <div className="relative w-[100vw] h-[100vh] mt-[-72px]">
        {/* Google Map을 배경으로 설정 (클릭 가능) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
          <GoogleMapComponent
            googleMapsApiKey={googleMapsApiKey}
            mapCenter={mapCenter}
            markerPosition={markerPosition}
            setMapCenter={setMapCenter}
            setMarkerPosition={setMarkerPosition}
          />
        </div>

        {/* Foreground UI (앞쪽 UI, 클릭 차단 X) */}
        <div className="relative flex z-10 border border-red pointer-events-none">
          <div className="pointer-events-auto">
            <SideMenu
              setSelectedMenu={setSelectedMenu}
              setShowSearchPanel={setShowSearchPanel}
            />
          </div>
          {showSearchPanel && (
            <div className="pointer-events-auto">
              <SearchPanel
                handleSelectedSearchList={handleSelectedSearchList}
                googleMapsApiKey={googleMapsApiKey}
                setMapCenter={setMapCenter}
                setMarkerPosition={setMarkerPosition}
              />
            </div>
          )}
          {selectedSearchList && (
            <div className="pointer-events-auto">
              <DetailList
                handleSelectedSearchList={handleSelectedSearchList}
                setReviewData={setReviewData}
              />
            </div>
          )}
        </div>
      </div>
      {/* 삭제 확인용 모달 */}
      {reviewData.isShowConfirmModal && (
        <ConfirmModal
          text="리뷰를 삭제하시겠습니까?"
          setConfirmData={setReviewData}
          onClick={handleDeleteButton}
        />
      )}
    </>
  );
};

export default map;
