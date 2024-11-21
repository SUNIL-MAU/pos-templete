// components/Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<span className="text-sm">Previous</span>}
      nextLabel={<span className="text-sm">Next</span>}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="pagination flex justify-center space-x-2"
      pageClassName="page-item"
      pageLinkClassName="page-link px-3 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer"
      activeClassName="bg-blue-600 text-white"
    />
  );
};

export default Pagination;
