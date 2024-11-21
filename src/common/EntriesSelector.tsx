// components/EntriesSelector.tsx
import React from 'react';

interface EntriesSelectorProps {
  itemsPerPage: number;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EntriesSelector: React.FC<EntriesSelectorProps> = ({
  itemsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex">
      <label className="mr-1">Show</label>
      <select
        value={itemsPerPage}
        onChange={onRowsPerPageChange}
        className="px-2 py-1 border border-gray-400 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <label className="ml-1">entries</label>
    </div>
  );
};

export default EntriesSelector;
