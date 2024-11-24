interface ButtonProps {
  width: string;
  height: string;
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function GrayButtonBox({ width, height, text, onClick, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ width, height }}
      className={`flex justify-center items-center py-[11px] px-0 gap-[10px] bg-[#E8E9EB] text-white rounded-[8px] hover:bg-gray-300 transition-colors`}>
      <span className="text-black text-center font-['Pretendard'] text-base font-semibold">{text}</span>
    </button>
  );
}
