import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

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
}
const GoogleMapComponent = ({
  mapCenter,
  markerPosition,
  googleMapsApiKey,
}: PropsType) => {
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
          >
            {/* 선택한 위치에 마커 표시 */}
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScriptNext>
      )}
    </div>
  );
};

export default GoogleMapComponent;
