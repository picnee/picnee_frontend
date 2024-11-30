import Sticker from "@/components/common/Sticker";

interface dataType {
  comment: string;
  sticker: string;
  title: string;
  date: string;
}

interface MyCommentTalkListProps {
  data: dataType[];
  selectedWriteMenu: string;
}

const MyCommentTalkList = ({
  data,
  selectedWriteMenu,
}: MyCommentTalkListProps) => {
  return (
    <>
      {data.map((item: dataType) => (
        <div className="mb-[16px]" key={item.comment}>
          <div className="w-[100%] h-[auto] p-[22px] border border-gray-150 rounded-m box-border">
            <div className="">
              <div className="mb-[10px] flex justify-between">
                <p
                  title={item.comment}
                  className="font-400 text-2xl text-black truncate max-w-[633px] whitespace-nowrap"
                >
                  {item.comment}
                </p>
                <p className="font-500 text-sm text-gray-400">{item.date}</p>
              </div>
              <div className="flex gap-[8px]">
                <Sticker title={item.sticker} />
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