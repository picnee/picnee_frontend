interface SearchBoxProps {
  width: string;
  height: string;
  placeholder: string;
}

export default function SearchBox({ width, height, placeholder }: SearchBoxProps) {
  return (
    <div className={`flex items-center w-[${width}] h-[${height}] bg-white border border-[#E8E9EB] rounded-lg overflow-hidden"`}>

      <div className="w-[52px] h-[52px] bg-[#EDEEF0] flex items-center justify-center">
        {/* 아이콘이 들어갈 자리 */}
      </div>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 bg-transparent border-none outline-none placeholder-[#9FA1A7] text-base"
      />
    </div >
  );
}
