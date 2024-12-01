import Sticker from "@/components/common/Sticker";
import Watch from "@/components/common/Watch";
import { URL } from "@/constants/url";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface dataType {
  sticker: string;
  title: string;
  content: string;
  watch: string;
  like: string;
  nickname: string;
  time: string;
}

interface TalkListProps {
  data: dataType[];
  selectedWriteMenu: string;
}

const TalkList = ({ data, selectedWriteMenu }: TalkListProps) => {
  const navigator = useRouter();
  return (
    <>
      {data.map((item: dataType) => (
        <div className="mb-[16px]" key={item.title}>
          <div
            className="w-[100%] h-[192px] border border-gray-150 rounded-m p-[24px] box-border cursor-pointer hover:border-black  transition-colors duration-300"
            onClick={() => {
              navigator.push(URL.TRAVELTALK.DETAIL);
            }}
          >
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <Sticker title={item.sticker} />
                <div className="mt-[16px] mb-[32px]">
                  <p className="font-600 text-2xl truncate max-w-[633px] whitespace-nowrap">
                    {item.title}
                  </p>
                  <p
                    title={item.content}
                    className="font-400 text-lg text-gray-500  truncate max-w-[633px] whitespace-nowrap"
                  >
                    {item.content}
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-gray-100 w-[88px] h-[88px] rounded-sm float-right"></div>
              </div>
            </div>
            <div className="flex items-center justify-between h-">
              <div className="flex gap-[40px]">
                <Watch watchNum={item.watch} />
                <div className="flex gap-[10px]">
                  <span className="block w-[24px] h-[24px] bg-gray-200"></span>
                  <span>{item.like}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {selectedWriteMenu !== "내가 쓴 글" && `${item.nickname}  ・ `}
                {item.time}시간 전
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(TalkList);
