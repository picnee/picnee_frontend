import { Dispatch, SetStateAction, memo } from "react";
import CommonButton from "../common/button/CommonButton";
import RoundButton from "../common/button/RoundButton";
import { DeletePropsType } from "@/app/(route)/map2/page";

interface PropsType {
  text: string;
  setReviewData: Dispatch<SetStateAction<DeletePropsType>>;
  onClick: () => void;
}

const ConfirmModal = ({ text, setReviewData, onClick }: PropsType) => {
  return (
    <div className="fixed z-[9999] inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="absolute top-[35%] left-[35%] bg-white w-[440px] h-[177px] rounded-m p-[20px]">
        <p className="text-center font-semibold text-2xl mb-[40px] mt-[26px]">
          {text}
        </p>
        <div className="flex gap-[10px] justify-center">
          <CommonButton
            variant="ghost_btn_gray"
            text="취소"
            width="194px"
            height="40px"
            onClick={() =>
              setReviewData({
                isShowConfirmModal: false,
                reviewId: "",
              })
            }
          />
          <CommonButton
            variant="solid_btn"
            text="확인"
            width="194px"
            height="40px"
            onClick={() => onClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmModal);
