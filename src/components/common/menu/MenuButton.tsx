import { useTravelTalkCategoryStore } from "@/store/zustand/useTravelTalkStore";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface PropsType {
  option: {
    key: number;
    value: string;
  }[];
}

const MenuButton = ({ option }: PropsType) => {
  const router = useRouter();
  // 카테고리 전역상태관리
  const { selectCategoryStates, setSelectCategoryState } =
    useTravelTalkCategoryStore();

  return (
    <>
      <>
        {option.map((item, index) => (
          <div
            key={item.key}
            className={`w-full h-auto cursor-pointer pl-[20px] pr-[20px] pt-[10px] pb-[10px] ${
              selectCategoryStates === item.value ? "bg-gray-100" : "bg-white"
            } rounded-sm flex gap-[16px] ${
              index !== option.length - 1 ? "mb-[10px]" : ""
            } hover:bg-gray-100 transition-all duration-300 ease-in-out`}
            onClick={() => {
              setSelectCategoryState(item.value);
              router.push("/travelTalk");
            }}
          >
            <div className="flex gap-[16px]">
              <div className="w-[28px] h-[28px] appearance-none bg-gray-150"></div>
              <p className="text-lg font-600 text-center">{item.value}</p>
            </div>
          </div>
        ))}
      </>
    </>
  );
};
export default memo(MenuButton);
