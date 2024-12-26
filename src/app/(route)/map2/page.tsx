"use client";

import { useCallback, useState } from "react";
import SideMenu from "./_components/SideMenu";
import SearchPanel from "./_components/SearchPanel";
import DetailList from "./_components/DetailList";

const map = () => {
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSearchList, setSelectedSearchList] = useState<string>("h");

  const handleSelectedSearchList = useCallback((value: string) => {
    setSelectedSearchList(value);
  }, []);

  return (
    <div className="w-[100vw] mt-[-73px] bg-gray-600">
      <div className="flex">
        <SideMenu
          setSelectedMenu={setSelectedMenu}
          setShowSearchPanel={setShowSearchPanel}
        />
        {showSearchPanel && (
          <SearchPanel handleSelectedSearchList={handleSelectedSearchList} />
        )}
        {selectedSearchList && <DetailList />}
      </div>
    </div>
  );
};

export default map;
