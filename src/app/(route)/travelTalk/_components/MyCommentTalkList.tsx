import Sticker from "@/components/common/Sticker";
import { URL } from "@/constants/url";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";
import { useRouter } from "next/navigation";

interface dataType {
  commentId: string;
  content: string;
  createdAt: string;
  likes: number;
  postId: string;
  userRes: { userId: string; nickName: string };
}

interface MyCommentTalkListProps {
  data: dataType[];
}

const MyCommentTalkList = ({ data }: MyCommentTalkListProps) => {
  const navigator = useRouter();

  // console.log(data && data);
  return (
    <>
      {data &&
        data.map((item: dataType) => (
          <div className="mb-[16px]" key={item.commentId}>
            <div
              className="w-[100%] h-[auto] p-[22px] border border-gray-150 rounded-m box-border cursor-pointer hover:border-black transition-colors duration-300"
              onClick={() => {
                navigator.push(`${URL.TRAVELTALK.DETAIL}/${item.postId}`);
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
                    {useFormatTimeAgo(item.createdAt)}
                  </p>
                </div>
                <div className="flex gap-[8px]">
                  <Sticker title={"카테고리"} />
                  <p className="font-400 text-lg text-gray-400 truncate max-w-[633px] whitespace-nowrap">
                    타이틀 데이터
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
