import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useState } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

interface PropsType {
  mapCenter: {
    lat: number;
    lng: number;
  };
  markerPosition: { lat: number; lng: number };
  googleMapsApiKey: string | undefined;
  setMapCenter: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setMarkerPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const GoogleMapComponent = ({
  mapCenter,
  markerPosition,
  googleMapsApiKey,
  setMapCenter,
  setMarkerPosition,
}: PropsType) => {
  const [markerAnimation, setMarkerAnimation] =
    useState<google.maps.Animation | null>(null);

  // 사용자가 지도를 클릭하면 해당 위치로 마커 이동
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setMarkerPosition(clickedLocation);
      setMarkerAnimation(google.maps.Animation.BOUNCE); // 클릭 시 마커 애니메이션 설정

      // 2초 후 애니메이션 해제
      setTimeout(() => {
        setMarkerAnimation(null);
      }, 100);
    }
  };

  return (
    <div className="relative w-full h-full">
      {googleMapsApiKey && (
        <LoadScriptNext
          googleMapsApiKey={googleMapsApiKey}
          libraries={["places"]}
        >
          {/* Google 지도 렌더링 */}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick} // 지도 클릭 이벤트 추가
          >
            {/* 선택한 위치에 마커 표시 */}
            <Marker
              position={markerPosition}
              animation={markerAnimation ?? undefined}
            />
          </GoogleMap>
        </LoadScriptNext>
      )}
    </div>
  );
};

export default GoogleMapComponent;
