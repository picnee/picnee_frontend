"use client";

import { fetchData } from "@/lib/axios";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";

import React, { useCallback, useEffect, useState, useRef } from "react";
import SearchBox from './SearchBox';

// Libraries 타입 수정
type Libraries = ("places" | "geometry" | "drawing" | "visualization" | "marker")[];
const LIBRARIES: Libraries = ["places", "marker"];

// PlaceInfo 타입 통합
interface PlaceInfo {
  placeId: string;
  placeName: string;
  url: string;
  formattedAddress: string;
  formattedPhoneNumber: string;
  openingHours: {
    openNow: boolean;
    periods: Array<{
      open: { day: number; time: string; hours: number; minutes: number };
      close: { day: number; time: string; hours: number; minutes: number };
    }>;
    weekdayText: string[];
  };
  userRatingsTotal: number;
  website: string;
  lat: string;
  lng: string;
  types: string[];
  business_status?: string;
  primaryType: string;
  businessStatus: string;
}

// 상단에 맵 ID 환경 변수 추가
const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "YOUR_MAP_ID";

const GoogleMaps = () => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const [currPosition, setCurrPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -3.745, lng: -38.523 });

  const [selectedPlace, setSelectedPlace] = useState<{
    name?: string;
    address?: string;
    phoneNumber?: string;
    rating?: number;
    totalRatings?: number;
    location?: {
      lat: number;
      lng: number;
    };
    types?: string[];
    primaryType?: string;
    businessStatus?: string;
  } | null>(null);

  const containerStyle = {
    width: "85vw",
    height: "85vw",
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete | null>(null);

  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const onSuccess = (geoPosition: GeolocationPosition) => {
    const currentPosition = {
      lat: geoPosition.coords.latitude,
      lng: geoPosition.coords.longitude,
    };
    setCurrPosition(currentPosition);
  };

  const onError = () => {
    alert("Error");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    const initializeMarkers = async () => {
      if (!mapRef.current) return;

      // 기존 마커들 제거
      markers.forEach(marker => marker.map = null);

      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      // 현재 위치 마커
      const currentLocationMarker = new AdvancedMarkerElement({
        map: mapRef.current,
        position: currPosition,
        title: "현재 위치"
      });

      // 선택된 장소 마커
      let selectedLocationMarker = null;
      if (selectedPlace?.location) {
        selectedLocationMarker = new AdvancedMarkerElement({
          map: mapRef.current,
          position: selectedPlace.location,
          title: selectedPlace.name
        });
      }

      setMarkers([currentLocationMarker, ...(selectedLocationMarker ? [selectedLocationMarker] : [])]);
    };

    initializeMarkers();
  }, [currPosition, selectedPlace, mapRef.current]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handlePlaceClick = useCallback((placeId: string) => {
    if (!mapRef.current) return;

    const service = new google.maps.places.PlacesService(mapRef.current);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields: [
        'name',
        'formatted_address',
        'formatted_phone_number',
        'rating',
        'user_ratings_total',
        'geometry',
        'website',
        'opening_hours',
        'url',
        'types',
        'business_status'
      ],
    };

    service.getDetails(request, async (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        console.log('Selected Place Details:', place);

        // PlaceInfo 형식에 맞게 데이터 구성
        const placeInfo: PlaceInfo = {
          placeId: placeId,
          placeName: place.name || '',
          url: place.url || '',
          formattedAddress: place.formatted_address || '',
          formattedPhoneNumber: place.formatted_phone_number || '',
          openingHours: {
            openNow: place.opening_hours?.isOpen() || false,
            periods: place.opening_hours?.periods?.map(period => ({
              open: {
                day: period.open?.day || 0,
                time: period.open?.time || '',
                hours: parseInt(period.open?.time?.substring(0, 2) || '0'),
                minutes: parseInt(period.open?.time?.substring(2) || '0')
              },
              close: {
                day: period.close?.day || 0,
                time: period.close?.time || '',
                hours: parseInt(period.close?.time?.substring(0, 2) || '0'),
                minutes: parseInt(period.close?.time?.substring(2) || '0')
              }
            })) || [],
            weekdayText: place.opening_hours?.weekday_text || []
          },
          userRatingsTotal: place.user_ratings_total || 0,
          website: place.website || '',
          lat: place.geometry?.location?.lat().toString() || '',
          lng: place.geometry?.location?.lng().toString() || '',
          types: place.types || [],
          primaryType: place.types?.[0] || '',
          businessStatus: place.business_status || '',
        };

        // 장소 정보를 서버에 전송
        await addPlace(placeInfo);

        setSelectedPlace({
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          location: place.geometry?.location,
          types: place.types,
          primaryType: place.types?.[0],
          businessStatus: place.business_status,
        });
      } else {
        console.error('Failed to fetch place details:', status);
        setSelectedPlace(null);
      }
    });
  }, []);

  const checkPlace = async (placeId: string): Promise<boolean> => {
    try {
      // 서버와 통신하는 부분을 시뮬레이션
      console.log('connecting to server ...')
      // 여기에 실제 서버 통신 로직을 추가할 수 있습니다
      const response = await fetchData(`/places/${placeId}`, {
        method: 'GET',
        params: {
          placeId
        }
      });
      console.log('response', response)
      console.log('response-- data', response.data)
      if (response.status === 200) {
        setSelectedPlace({
          name: response.data.placeName,
          address: response.data.formattedAddress,
          phoneNumber: response.data.formattedPhoneNumber,
          totalRatings: response.data.userRatingsTotal,
          location: {
            lat: parseFloat(response.data.lat),
            lng: parseFloat(response.data.lng),
          },
          types: response.data.types,
          primaryType: response.data.types?.[0] || '',
          businessStatus: response.data.businessStatus || '',
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking place:', error);
      return false;
    }
  }

  const addPlace = async (placeInfo: object) => {
    try {
      const response = await fetchData('/places', {
        method: 'POST',
        data: placeInfo
      })
      console.log('addPlace response', response)
    } catch (error) {
      console.error('addPlace error', error)
    }
  }

  /**
   * 지도를 클릭했을 때 실행되는 핸들러 함수
   * @param {google.maps.MapMouseEvent & { placeId?: string }} e - 구글맵 마우스 이벤트 객체 (placeId 속성이 추가된 형태)
   */
  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent & { placeId?: string }) => {
    // 지도가 로드되지 않았거나 클릭한 위치에 장소 ID가 없으면 종료
    if (!mapRef.current || !e.placeId) return;
    console.log('handle map click ! ')


    // checkPlace 실행 후 결과에 따라 처리

    // const test = 'testid1'
    // const isOnDb = await checkPlace(test);
    const isOnDb = await checkPlace(e.placeId);


    if (isOnDb) {

      // db 에 있을경우 
      console.log('This place is available data  ! ');

      // db 에서 데이터 받아서 뿌리기
    } else {
      //없을경우
      console.log('This place is not available data  ! ');

      // detail 받아서 db로 보내기 
      handlePlaceClick(e.placeId);
    }
  }, [handlePlaceClick]);

  const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchBox(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchBox) {
      const place = searchBox.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        setCurrPosition(location);
        mapRef.current?.panTo(location);
        mapRef.current?.setZoom(17);

        // 검색된 장소 정보 설정
        if (place.place_id) {
          handlePlaceClick(place.place_id);
        }
      }
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetchData(`/places/${placeId}`, {
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error("장소 상세 정보 조회 실패:", error);
      return null;
    }
  };

  const getBusinessStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      OPERATIONAL: '정상 영업중',
      CLOSED_TEMPORARILY: '일시 휴업',
      CLOSED_PERMANENTLY: '폐업',
    };
    return statusMap[status] || status;
  };

  return (
    <div>
      {googleMapsApiKey && (
        <LoadScriptNext
          googleMapsApiKey={googleMapsApiKey}
          libraries={LIBRARIES}
        >
          <div>
            <SearchBox
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            />
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={currPosition}
              zoom={16}
              onLoad={handleMapLoad}
              onClick={handleMapClick}
              mapId={mapId}
              options={{
                mapId: mapId,
                disableDefaultUI: false,
                clickableIcons: true,
                scrollwheel: true,
              }}
            />
          </div>
        </LoadScriptNext>
      )}

      {/* 선택한 장소 정보 표시 */}
      <div className="mt-4 p-4 bg-white rounded shadow">
        {selectedPlace && (
          <div>
            <h3 className="text-xl font-bold mb-2">선택한 가게 정보</h3>
            <p><strong>이름:</strong> {selectedPlace.name}</p>
            <p><strong>주소:</strong> {selectedPlace.address}</p>
            {selectedPlace.phoneNumber && (
              <p><strong>전화번호:</strong> {selectedPlace.phoneNumber}</p>
            )}
            {selectedPlace.rating && (
              <p><strong>평점:</strong> {selectedPlace.rating} / 5
                ({selectedPlace.totalRatings}개의 평가)</p>
            )}
            {selectedPlace.types && selectedPlace.types.length > 0 && (
              <p><strong>카테고리:</strong> {selectedPlace.types.join(', ')}</p>
            )}
            {selectedPlace.primaryType && (
              <p><strong>주요 업종:</strong> {selectedPlace.primaryType}</p>
            )}
            {selectedPlace.businessStatus && (
              <p><strong>영업 상태:</strong> {getBusinessStatusText(selectedPlace.businessStatus)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMaps;
