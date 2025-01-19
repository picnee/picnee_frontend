import Sticker from "@/components/common/Sticker";
import { URL } from "@/constants/url";
import FormatTimeAgo from "@/utils/FormatTimeAgo";
import { useRouter } from "next/navigation";

interface dataType {
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  postId: string;
  userRes: { userId: string; nickName: string };
  findMyPostRes: {
    boardRes: {
      boardCategory: string;
      boardId: string;
      region: string;
    };
    postId: string;
    title: string;
  };
}

interface MyCommentTalkListProps {
  data: dataType[];
}

const MyCommentTalkList = ({ data }: MyCommentTalkListProps) => {
  const navigator = useRouter();

  return (
    <>
      {data &&
        data.map((item: dataType) => (
          <div className="mb-[16px]" key={item.commentId}>
            <div
              className="w-[100%] h-[auto] p-[22px] border border-gray-150 rounded-m box-border cursor-pointer hover:border-black transition-colors duration-300"
              onClick={() => {
                navigator.push(
                  `${URL.TRAVELTALK.DETAIL}/${item.findMyPostRes.postId}?myComment=${item.commentId}`
                );
              }}
            >
              <div className="">
                <div className="mb-[10px] flex justify-between">
                  <p
                    title={item.content}
                    className="font-400 text-2xl text-black truncate max-w-[633px] whitespace-nowrap"
                  >
                    {item.content}
                  </p>
                  <p className="font-500 text-sm text-gray-400">
                    {FormatTimeAgo(item.createdAt)}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <Sticker title={item.findMyPostRes.boardRes.boardCategory} />
                  <p className="font-400 text-lg text-gray-400 truncate max-w-[633px] whitespace-nowrap mt-[-2px]">
                    {item.findMyPostRes.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MyCommentTalkList;
