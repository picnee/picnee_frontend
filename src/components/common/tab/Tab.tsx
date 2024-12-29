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
            selectedTab === item ? "text-primary-skyblue-400" : "text-gray-400"
          } text-lg pb-[10px] cursor-pointer hover:text-primary-skyblue-400 ${
            selectedTab === item && "border-b-2 border-b-primary-skyblue-400"
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
