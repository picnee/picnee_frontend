interface ButtonProps {
  width: string;
  height: string;
  text: string;
  onClick?: () => void;
}

export default function Button({ width, height, text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-[${width}] h-[${height}] py-[10px] px-[16px] justify-center items-center gap-[4px] bg-[#FFF] text-gray-800 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200`}
    >
      {text}
    </button>
  );
}
