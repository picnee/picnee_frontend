interface DividerProps {
  text?: string;
}

export default function Divider({ text = "또는" }: DividerProps) {
  return (
    <div className="flex items-center">
      <div className="flex-grow h-px bg-[#E8E9EB]"></div>
      <div className="px-4 text-sm text-[#697175]">{text}</div>
      <div className="flex-grow h-px bg-[#E8E9EB]"></div>
    </div>
  );
} 