import Pagination from "@/components/common/Pagination";

interface dataType {
  sticker: string;
  title: string;
  content: string;
  watch: string;
  like: string;
  nickname: string;
  time: string;
}

const TalkList = () => {
  const dummyData: dataType[] = [
    {
      sticker: "날씨",
      title: "도쿄 이번 주 날씨 어떤가요?",
      content:
        "이번 주에 도쿄 가려고 하는데, 많이 추울까요? 옷을 어떻게 챙겨야 할지 고민이라서요. 날씨 예보에...",
      watch: "3",
      like: "1",
      nickname: "피크니 도쿄",
      time: "1",
    },
    {
      sticker: "날씨",
      title: "오사카 이번 주 날씨 어떤가요?",
      content: "이번 주에 오사카 가려고 하는데, 많이 추울까요?",
      watch: "5",
      like: "3",
      nickname: "피크니 오사카",
      time: "2",
    },
    {
      sticker: "날씨",
      title: "교토 이번 주 날씨 어떤가요?",
      content: "교토 옷을 어떻게 챙겨야 할지 고민이네요...",
      watch: "10",
      like: "1",
      nickname: "피크니 교토",
      time: "3",
    },
    {
      sticker: "날씨",
      title: "후쿠오카 이번 주 날씨 어떤가요?",
      content:
        "이번 주에 후쿠오카 가려고 하는데, 많이 추울까요? 옷을 어떻게 챙겨야 할지 고민이라서요. 날씨 예보에는 별로 안 추울 것 같긴한데 걱정이네요",
      watch: "10",
      like: "8",
      nickname: "피크니 후쿠오카",
      time: "4",
    },
  ];
  return (
    <>
      {dummyData.map((item: dataType) => (
        <div className="mb-[24px]" key={item.title}>
          <div className="w-[100%] h-[192px] bg-gray-100 rounded-m p-[24px]">
            <div className="grid grid-cols-4">
              <div className="col-span-3">
                <div className="text-sm leading-1 text-gray-400 text-center w-[41px] h-[24px] bg-white rounded-xs ">
                  {item.sticker}
                </div>
                <div className="mt-[16px] mb-[32px]">
                  <p className="font-600 text-2xl  truncate max-w-[633px] whitespace-nowrap">
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
                <div className="bg-white w-[88px] h-[88px] rounded-sm float-right"></div>
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
                {item.nickname} &nbsp;・&nbsp; {item.time}시간 전
              </p>
            </div>
          </div>
        </div>
      ))}
      <Pagination />
    </>
  );
};

export default TalkList;
