import React from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

interface AccordionItemProps {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isActive, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none bg-gray-100 hover:bg-gray-200"
      >
        <span className="text-lg font-medium">{title}</span>
        {isActive ? (
          <HiChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <HiChevronUp className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isActive && (
        <div className="p-4 bg-white text-gray-700 transition-height duration-300 ease-in-out">
          {content}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
