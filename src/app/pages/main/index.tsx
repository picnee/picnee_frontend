import BestReviewRestaurant from "./_components/BestReviewRestaurant";
import LocationBox from "./_components/LocationBox";
import MainCategoryBox from "./_components/MainCategoryBox";
import MainInputBox from "./_components/MainInputBox";

const Main = () => {
  return (
    <div className="w-[100vw] flex flex-col items-center ">
      <section className="w-[1280px] px-[40px] flex flex-col justify-center  gap-10 mt-16">
        <MainInputBox />
        <MainCategoryBox />
        <LocationBox />
      </section>
      <section className="w-[1280px] h-auto px-[40px] flex flex-col justify-center  gap-10 mt-16 ">
        <BestReviewRestaurant />
      </section>
    </div>
  );
};

export default Main;
