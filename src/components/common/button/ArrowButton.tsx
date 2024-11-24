"use client";

interface Props {
  onClick?: () => void;
}

const ArrowButton = ({ onClick }: Props) => {
  const handleClickButton = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div>
      <button
        className="border w-[32px] h-[32px] rounded-tl-[8px] rounded-bl-[8px] text-gray-300 hover:text-gray-600 transition-all duration-[300ms]"
        onClick={handleClickButton}
      >
        &lt;
      </button>
      <button
        className="border w-[32px] h-[32px] rounded-tr-[8px] rounded-br-[8px] text-gray-300 hover:text-gray-600 transition-all duration-[300ms]"
        onClick={handleClickButton}
      >
        &gt;
      </button>
    </div>
  );
};

export default ArrowButton;
