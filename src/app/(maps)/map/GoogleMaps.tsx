"use client";

import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";

type PR = google.maps.places.PlaceResult;
const GoogleMaps = () => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  const [currPosition, setCurrPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: -3.745, lng: -38.523 });

  const [clickedInfo, setClickedInfo] = useState<{
    address?: string;
    places?: PR[] | null;
  }>({});

  const containerStyle = {
    width: "85vw",
    height: "85vw",
  };

  const onSuccess = (geoPosition: GeolocationPosition) => {
    setCurrPosition({
      lat: geoPosition.coords.latitude,
      lng: geoPosition.coords.longitude,
    });
  };

  const onError = () => {
    alert("Error");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    const latitude = e.latLng?.lat();
    const longitude = e.latLng?.lng();
    if (latitude && longitude) {
      fetchNearbyPlaces({ lat: latitude, lng: longitude });
      fetchPlaceDetails({ lat: latitude, lng: longitude });
    }
  };
  const fetchPlaceDetails = useCallback(
    (location: { lat: number; lng: number }) => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 50, // 클릭 위치에서 반경 50m
        type: "establishment", // 장소 유형 필터링
      };

      service.nearbySearch(request, (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results?.length
        ) {
          const placeId = results[0].place_id; // 가장 가까운 장소의 place_id 가져오기
          if (placeId) fetchDetailedInfo(placeId);
        } else {
          console.error("No places found:", status);
        }
      });
    },
    []
  );
  const fetchDetailedInfo = useCallback((placeId: string) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields: [
        "name",
        "formatted_address",
        "formatted_phone_number",
        "rating",
        "user_ratings_total",
      ],
    };

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        console.log("Place Details:", place);
      } else {
        console.error("Failed to fetch place details:", status);
      }
    });
  }, []);
  const fetchNearbyPlaces = useCallback(
    (location: { lat: number; lng: number }) => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 500, // 반경 500m
        type: "restaurant", // 음식점 유형 필터링
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log("Nearby Places:", results);
        } else {
          console.error("Failed to fetch nearby places:", status);
        }
      });
    },
    []
  );
  return (
    <div>
      {googleMapsApiKey && (
        <LoadScriptNext
          googleMapsApiKey={googleMapsApiKey}
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currPosition}
            zoom={16}
            onClick={(e) => handleClick(e)}
          />
        </LoadScriptNext>
      )}

      {/* 클릭한 위치의 정보 표시 */}
      {clickedInfo.address && (
        <div>
          <h3>클릭한 위치 정보</h3>
          <p>주소: {clickedInfo.address}</p>
          <h4>주변 장소</h4>
          <ul>
            {clickedInfo.places?.map((place, index) => (
              <li key={index}>
                {place.name} - {place.vicinity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleMaps;
