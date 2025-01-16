
interface DropdownProps {
  size: "large" | "small";
  options: String[];
}

const SelectBox = ({ size, options }: DropdownProps) => {
  const getSize = () => {
    if (size === "large") {
      return "px-[75px]";
    }
  };

  const getOptions = () => {
    return options.map((option, index) => {
      return (
        <option key={index} className="bg-transparent">
          {option}
        </option>
      );
    });
  };

  return (
    <div>
    <select
      className={`border-2 border-black py-2 ${getSize()} font-bold bg-gray-500/10 `}
    >
      {getOptions()}
    </select>
    </div>
  );
};

export default SelectBox;
