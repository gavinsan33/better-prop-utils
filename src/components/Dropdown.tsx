import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[]; // Array of options for the dropdown
  size: 'large' | 'small';
  title?: string,
  className?: string,
  placeholder?: string; // Placeholder text
}

const Dropdown = ({ options, size, title, className, placeholder = "OPEN" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Dropdown visibility
  const [selectedValue, setSelectedValue] = useState<string>(""); // Selected option
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle option click
  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
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
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {title && <h1 className="text-white">{title}</h1>}
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className={`${size === 'large' ? "py-2 w-52" : "w-36"} text-left bg-white border rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-700/20`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedValue || placeholder}
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
          aria-activedescendant={selectedValue}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                selectedValue === option ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={selectedValue === option}
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
