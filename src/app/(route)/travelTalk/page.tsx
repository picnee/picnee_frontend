import SideBarNav from "./_components/SideBarNav";
import TalkList from "./_components/TalkList";
import TravelTalkHeader from "./_components/TravelTalkHeader";

const TravelTalk = () => {
  return (
    <div className="pt-[72px] pb-[80px]">
      <TravelTalkHeader />
      <div className="grid grid-cols-4 gap-[24px] pt-[24px]">
        <div className="col-span-1">
          <SideBarNav />
        </div>
        <div className="col-span-3">
          <TalkList />
        </div>
      </div>
    </div>
  );
};

export default TravelTalk;
