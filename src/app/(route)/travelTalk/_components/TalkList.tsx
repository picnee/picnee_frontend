import Like from "@/components/common/Like";
import Sticker from "@/components/common/Sticker";
import Watch from "@/components/common/Watch";
import { URL } from "@/constants/url";
import FormatTimeAgo from "@/utils/FormatTimeAgo";
import { useRouter } from "next/navigation";
import { memo } from "react";
interface dataType {
  postId: string;
  title: string;
  content: string;
  viewed: number;
  commentsCount: number;
  boardRes: {
    boardCategory: string;
    boardId: string;
    region: string;
  };
  userRes: {
    nickName: string;
    userId: string;
  };
  createdAt: string;
}

interface TalkListProps {
  data: dataType[];
  selectedWriteMenu: string;
}

const TalkList = ({ data, selectedWriteMenu }: TalkListProps) => {
  const navigator = useRouter();

  return (
    <>
      {data &&
        data.map((item: dataType) => (
          <div className="mb-[16px]" key={item.postId}>
            <div
              className="w-[100%] h-[192px] border border-gray-150 rounded-m p-[24px] box-border cursor-pointer hover:border-black  transition-colors duration-300"
              onClick={() => {
                navigator.push(`${URL.TRAVELTALK.DETAIL}/${item.postId}`);
              }}
            >
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <Sticker title={item.boardRes.boardCategory} />
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
              <div className="mt-[-10px] flex items-center justify-between">
                <div className="flex gap-[30px]">
                  <Watch watchNum={item.viewed} />
                  <Like likeNum={item.commentsCount} />
                </div>
                <p className="text-sm text-gray-500 mt-[10px]">
                  {selectedWriteMenu !== "내가 쓴 글" &&
                    `${item.userRes.nickName}`}
                  {selectedWriteMenu !== "내가 쓴 글" && (
                    <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                      ・
                    </span>
                  )}
                  {FormatTimeAgo(item.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default memo(TalkList);
