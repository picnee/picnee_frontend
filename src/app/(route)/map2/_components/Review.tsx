import { Dispatch, SetStateAction, useState } from "react";
import ReviewList from "./ReviewList";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  GetMapAllReviewListOptions,
  GetMapBestReviewListOptions,
} from "@/api/map/query-options";
import { DeletePropsType } from "../page";

const reviewData = [{}, {}, {}];

export interface BestReviewType {
  touristSpotRes: {
    createdAt: string;
    goodPoints: string;
    lowPoints: string;
    userRes: {
      nickName: string;
      userId: string;
    };
    placeRes: {
      lat: string;
      lng: string;
      placeId: string;
      placeName: string;
      types: string;
    };
    placeTips: string;
    rating: number;
    reviewId: string;
  };
}

export interface AllReviewType {
  content: [
    {
      touristSpotRes: {
        createdAt: string;
        goodPoints: string;
        lowPoints: string;
        userRes: {
          nickName: string;
          userId: string;
        };
        placeRes: {
          lat: string;
          lng: string;
          placeId: string;
          placeName: string;
          types: string;
        };
        placeTips: string;
        rating: number;
        reviewId: string;
      };
    }
  ];
}

interface PropsType {
  setReviewData: Dispatch<SetStateAction<DeletePropsType>>;
}

const Review = ({ setReviewData }: PropsType) => {
  const [activeButton, setActiveButton] = useState<string>("베스트 리뷰");

  const handleClickButton = (type: string) => {
    setActiveButton(type);
  };

  /** 베스트 리뷰 API 호츌 */
  const { data: bestReviewData }: UseQueryResult<BestReviewType[]> = useQuery(
    GetMapBestReviewListOptions({
      placeId: "123456",
    })
  );

  /** 전체 리뷰 API 호츌 */
  const { data: totalReviewData }: UseQueryResult<AllReviewType> = useQuery(
    GetMapAllReviewListOptions({
      placeId: "123456",
    })
  );

  console.log(totalReviewData && totalReviewData.content);

  return (
    <div>
      <div className="ml-[24px] mr-[24px]">
        <p className="text-2xl font-600 mb-[10px]">
          리뷰 <span className="text-gray-300">465</span>
        </p>
        <div className="w-[336px] h-[48px] bg-gray-100 rounded-m mb-[0px]">
          <button
            className={`w-[164px] h-[40px] ${
              activeButton === "베스트 리뷰" && "bg-white shadow-custom"
            } mt-[3.5px] ml-[4px] rounded-sm`}
            onClick={() => handleClickButton("베스트 리뷰")}
          >
            베스트 리뷰
          </button>
          <button
            className={`w-[164px] h-[40px] ${
              activeButton === "리뷰" && "bg-white shadow-custom"
            } mt-[3.5px] rounded-m`}
            onClick={() => handleClickButton("리뷰")}
          >
            리뷰
          </button>
        </div>
        <div className="flex justify-end mt-[8px]">
          <p className="text-sm text-gray-300">
            <input
              type="checkbox"
              className="relative top-[1.5px] right-[5px] appearance-none w-[14px] h-[14px] border border-gray-300 rounded-[2px] checked:bg-primary-skyblue-300 checked:border-primary-skyblue-300"
            />
            장소 태그 숨기기
          </p>
        </div>
      </div>
      {activeButton === "베스트 리뷰" &&
        bestReviewData &&
        bestReviewData.map((item: BestReviewType, index: number) => (
          <ReviewList
            key={item.touristSpotRes.createdAt}
            bestReviewData={item}
            type="베스트 리뷰"
            rank={index}
            setReviewData={setReviewData}
          />
        ))}
      {activeButton === "리뷰" &&
        totalReviewData &&
        totalReviewData.content.map((item: BestReviewType) => (
          <ReviewList
            key={item.touristSpotRes.createdAt}
            bestReviewData={item}
            type="리뷰"
            setReviewData={setReviewData}
          />
        ))}
    </div>
  );
};

export default Review;
