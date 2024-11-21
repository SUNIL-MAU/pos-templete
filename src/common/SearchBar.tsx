// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label>Search:</label>
      <input
        type="text"
        className="w-50 p-1 border border-gray-400 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
