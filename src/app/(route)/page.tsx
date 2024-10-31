import Header from "@/app/components/common/Header";
import LocationCard from "@/app/components/common/LocationCard";
import MainCategoryBox from "@/app/components/common/MainCategoryBox";

const LocationBox = () => {
  return (
    <article className="flex justify-between gap-3">
      <LocationCard location="도쿄" />
      <LocationCard location="오사카" />
      <LocationCard location="후쿠오카" />
      <LocationCard location="훗카이도" />
    </article>
  );
};

const MainInputBox = () => {
  return (
    <article className="w-full px-[40px] flex flex-col items-center">
      <h1 className="mb-[36px] font-semibold text-[40px]">
        솔직한 리뷰를 찾고 계신가요?
      </h1>
      {/* input box */}
      <div className="flex rounded-md overflow-hidden border">
        <div className="w-[56px] h-[56px] bg-neutral-200"></div>
        <input
          type="text"
          className="w-[582px] px-2"
          placeholder="리뷰가 궁금한 장소나 위치를 입력해 주세요"
        />
        <div className="w-[56px] h-[56px] bg-neutral-200"></div>
      </div>
    </article>
  );
};

export default function Home() {
  return (
    <div>
      <Header />
      <div className="w-[100vw] flex flex-col items-center ">
        <section className="w-[1280px] px-[40px] flex flex-col justify-center  gap-10 mt-16">
          <MainInputBox />
          <MainCategoryBox />
          <LocationBox />
        </section>
      </div>
    </div>
  );
}
