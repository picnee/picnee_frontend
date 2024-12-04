import Sticker from "@/components/common/Sticker";
import useFormatTimeAgo from "@/hooks/useFormatTimeAgo";

interface dataType {
  boardRes: { boardCategory: string; boardId: string; region: string };
  commentsCount: number;
  content: string;
  createdAt: string;
  postId: string;
  title: string;
  userRes: { userId: string; nickName: string };
  viewed: number;
}

interface MyCommentTalkListProps {
  data: dataType[];
}

const MyCommentTalkList = ({ data }: MyCommentTalkListProps) => {
  return (
    <>
      {data &&
        data.map((item: dataType) => (
          <div className="mb-[16px]" key={item.boardRes.boardId}>
            <div className="w-[100%] h-[auto] p-[22px] border border-gray-150 rounded-m box-border">
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
                  <Sticker title={item.boardRes.boardCategory} />
                  <p className="font-400 text-lg text-gray-400 truncate max-w-[633px] whitespace-nowrap">
                    {item.title}
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
