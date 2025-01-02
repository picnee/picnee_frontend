import RoundButton from "@/components/common/button/RoundButton";
import { RefObject, memo, useEffect, useState } from "react";

interface PropsType {
  divRef: RefObject<HTMLDivElement>;
  handleSelectedSearchList: (value: string) => void;
}
const ScrollHeader = ({ divRef, handleSelectedSearchList }: PropsType) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (divRef.current) {
      if (divRef.current?.scrollTop > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  };

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-[180px] bg-gray-100">
      {isScrolled ? (
        <div className="flex w-[384px] h-[62px] p-[15px] fixed bg-white rounded-t-m z-[999]">
          <p className="w-[350px] font-500 text-lg">
            Rojiura Curry SAMURAI - Harajuku
          </p>
          <div className="flex justify-end mt-[-5px]">
            <RoundButton
              hasIcon={true}
              pr="7px"
              pl="7px"
              onClick={() => handleSelectedSearchList("")}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-end pt-[10px] pr-[16px]">
          <RoundButton
            hasIcon={true}
            pr="7px"
            pl="7px"
            onClick={() => handleSelectedSearchList("")}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ScrollHeader);
