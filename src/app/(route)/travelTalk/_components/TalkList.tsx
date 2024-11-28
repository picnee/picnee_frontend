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
  return (
    <>
      {data.map((item: dataType) => (
        <div className="mb-[24px]" key={item.title}>
          <div className="w-[100%] h-[192px] border border-gray-150 rounded-m p-[24px]">
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <div className="text-sm leading-3 text-gray-400 w-[41px] h-[24px] bg-gray-100 rounded-xs flex items-center justify-center">
                  <p className="text-center">{item.sticker}</p>
                </div>
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
                <div className="flex gap-[10px]">
                  <span className="block w-[24px] h-[24px] bg-gray-200"></span>
                  <span>{item.watch}</span>
                </div>
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

export default TalkList;
