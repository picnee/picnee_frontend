
interface InputBoxProps {
  width: string;
  height: string;
  type: string;
  placeholder: string;
}

export default function InputBox({ width, height, type, placeholder }: InputBoxProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-[${width}] h-[${height}] px-4 border border-[#E8E9EB] rounded-lg focus:outline-none`}
    />
  );
}
