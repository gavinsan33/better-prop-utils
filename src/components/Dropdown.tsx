import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[]; // Array of options for the dropdown
  size: "large" | "small";
  value?: number; // index to start on
  title?: string;
  className?: string;
  placeholder?: string; // Placeholder text
  onClick?: (value: number) => void;
}

const Dropdown = ({
  options,
  size,
  value = 0,
  title,
  className,
  placeholder,
  onClick = () => {},
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle option click
  const handleOptionClick = (indexClicked: number) => {
    onClick(indexClicked);
    setIsOpen(false); // Close the dropdown
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative inline-block overflow-x ${className}`}
      ref={dropdownRef}
    >
      {title && <h1 className="text-white">{title}</h1>}
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className={`${
          size === "large" ? "py-2 w-52" : "w-36"
        } text-left bg-white border rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-700/20`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {options[value] || placeholder}
        <span className="float-right">
          {/* Chevron Icon */}
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white border rounded shadow"
          role="listbox"
          aria-activedescendant={options[value]}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                value === index ? "bg-blue-100 font-bold" : ""
              } break-words`}
              onClick={() => handleOptionClick(index)}
              role="option"
              aria-selected={options[value] === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
