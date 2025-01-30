import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

// 📍 도쿄 기본 중심 좌표
const defaultCenter = {
  lat: 35.682839,
  lng: 139.759455,
};

const GoogleMapComponent = () => {
  // 지도 중심 상태 관리 (기본값: 도쿄)
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  // 검색한 위치의 마커 상태
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      {/* Google Maps API 로드 */}
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""}
        libraries={["places"]}
      >
        {/* Google 지도 렌더링 */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
        >
          {/* 선택한 위치에 마커 표시 */}
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default GoogleMapComponent;
