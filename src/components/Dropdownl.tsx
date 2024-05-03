import React, { useState, useEffect, useRef } from "react";

const Dropdown: React.FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={handleClick}
        className="relative w-60 h-14 bg-white rounded-lg hover:shadow-lg group focus:ring ring-gray-200"
      >
        <p className="text-gray-500">{selectedOption || "Dropdown"}</p>
      </button>
      <div
        className={`absolute ${
          open ? "block" : "hidden"
        } min-w-full bg-white text-black top-full mt-2 rounded-md overflow-hidden transition duration-500`}
      >
        <ul className="text-left rounded-sm">
          <li
            onClick={() => handleOptionClick("Option 1")}
            className="px-4 hover:bg-gray-200 h-10 pt-2 cursor-pointer"
          >
            Option 1
          </li>
          <li
            onClick={() => handleOptionClick("Option 2")}
            className="px-4 hover:bg-gray-200 h-10 pt-2 cursor-pointer"
          >
            Option 2
          </li>
          <li
            onClick={() => handleOptionClick("Option 3")}
            className="px-4 hover:bg-gray-200 h-10 pt-2 cursor-pointer"
          >
            Option 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
