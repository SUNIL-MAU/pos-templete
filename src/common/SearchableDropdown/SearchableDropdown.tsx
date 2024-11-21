import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SearchableDropdownProps = {
  options: Option[];
  onSelect: (value: string) => void;
};

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
    setSearchTerm(""); // Clear the search term after selection
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Button */}
      <button
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {searchTerm || "Select an option..."}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-300 px-4 py-2 outline-none"
            placeholder="Search..."
          />

          {/* Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
