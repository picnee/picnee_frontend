interface PropsType {
  title: string;
}
const Sticker = ({ title }: PropsType) => {
  return (
    <div className="text-sm leading-3 text-gray-400 w-[41px] h-[24px] bg-gray-100 rounded-xs flex items-center justify-center">
      <p className="text-center">{title}</p>
    </div>
  );
};

export default Sticker;
