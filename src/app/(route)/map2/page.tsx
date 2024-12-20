"use client";

import { useState } from "react";
import SideMenu from "./_components/SideMenu";
import SearchPanel from "./_components/SearchPanel";

const map = () => {
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  return (
    <div className="w-[100vw] mt-[-73px] bg-gray-600">
      <div className="flex">
        <div className="w-[72px]">
          <SideMenu
            setSelectedMenu={setSelectedMenu}
            setShowSearchPanel={setShowSearchPanel}
          />
        </div>
        {showSearchPanel && (
          <div className="w-[440px] ">
            <SearchPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default map;
