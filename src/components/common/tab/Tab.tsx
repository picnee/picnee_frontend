import { memo, useState } from "react";

const Tab = ({ list }: { list: string[] }) => {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const handleTab = (item: string) => {
    setSelectedTab(item);
  };
  return (
    <div className="flex justify-around border-b border-b-gray-150">
      {list.map((item) => (
        <p
          key={item}
          className={`font-600 ${
            selectedTab === item ? "text-skyblue" : "text-gray-400"
          } text-lg pb-[10px] cursor-pointer hover:text-skyblue ${
            selectedTab === item && "border-b-2 border-b-skyblue"
          }`}
          onClick={() => handleTab(item)}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default memo(Tab);
