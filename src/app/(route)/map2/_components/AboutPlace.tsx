import Icon from "@/public/svgs/Icon";

const AboutPlace = () => {
  return (
    <div className="pt-[32px] pb-[32px] pl-[24px] pr-[24px]">
      <div className="flex gap-[16px] mb-[16px]">
        <div className="w-[28px] h-[28px] bg-gray-100"></div>
        <p className="font-400 text-base w-[292px] leading-5 mt-[3px]">
          일본 〒150-0001 Tokyo, Shibuya, Jingumae, 1 Chome−2−14 幸進ビル 1階
        </p>
      </div>
      <div className="flex gap-[16px] mb-[16px]">
        <div className="w-[28px] h-[28px] bg-gray-100"></div>
        <p className="font-400 text-base w-[292px] leading-5 mt-[3px]">
          +81368041100
        </p>
      </div>
      <div className="flex gap-[16px]">
        <div className="w-[28px] h-[28px] bg-gray-100"></div>
        <p className="font-400 text-base w-[258px] leading-5 mt-[3px]">
          <span className="text-semantic-green">영업중</span> • 오후 6:00에
          영업종료
        </p>
        <div>
          <Icon iconName="downArrowStroke" />
        </div>
      </div>
    </div>
  );
};

export default AboutPlace;
