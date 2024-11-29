interface PropsType {
  text: string;
  hasIcon: boolean;
}

const RoundButton = ({ text, hasIcon }: PropsType) => {
  return (
    <button className="h-[40px] text-gray-500 border border-gray-150 rounded-[50px] pt-[4px] pl-[18px] pb-[4px] pr-[18px]">
      {hasIcon && (
        <span
          className={`w-[24px] h-[24px] mr-[4px] inline-block ${
            hasIcon && "mt-[3px]"
          } bg-gray-150`}
        ></span>
      )}
      <span className={`${hasIcon && "relative top-[-6px]"}`}>{text}</span>
    </button>
  );
};

export default RoundButton;
