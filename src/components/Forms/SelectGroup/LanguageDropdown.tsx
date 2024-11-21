import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../../../node_modules/react-i18next';
import '../../../locals/i18n'; // Import the i18n configuration

// Define the type for each language option
interface LanguageOption {
  label: string;
  code: string;
  imageUrl: string;
}

// Sample image URLs (replace with your actual images)
const imageOptions: LanguageOption[] = [
  { label: 'English', code: 'en', imageUrl: 'https://via.placeholder.com/50x50?text=EN' },
  { label: 'हिंदी', code: 'hi', imageUrl: 'https://via.placeholder.com/50x50?text=HI' },
  { label: 'मराठी', code: 'mr', imageUrl: 'https://via.placeholder.com/50x50?text=MR' },
];

const LanguageDropdown: React.FC = () => {
  // State to manage the selected language
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(imageOptions[0]); // Default is English
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {i18n } = useTranslation();

  // Load the language from localStorage when the component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      const selectedOption = imageOptions.find(option => option.code === savedLanguage);
      if (selectedOption) setSelectedLanguage(selectedOption);
    }
  }, [i18n]); // Ensure the effect runs only once when the component mounts

  // Toggle dropdown open/close
  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Handle selection of language
  const handleSelectOption = (option: LanguageOption) => {
    // Set the selected language state
    setSelectedLanguage(option);

    // Save the selected language to localStorage
    localStorage.setItem('language', option.code);

    // Change the language using i18next
    i18n.changeLanguage(option.code); // This should trigger the language change immediately

    // Close the dropdown
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Dropdown Button */}
      <div className="relative inline-block w-full">
        <button
          onClick={handleToggleDropdown}
          className="inline-flex items-center justify-center rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
        >
          <div className="flex items-center">
            <img
              src={selectedLanguage.imageUrl}
              alt={selectedLanguage.label}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-black dark:text-white">{selectedLanguage.label}</span>
          </div>
          <svg
            className="w-4 h-4 ml-2 transform transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="absolute w-full mt-2 z-20 w-full rounded border border-stroke transition focus:border-primary active:border-primary dark:border-form-strokedark bg-white dark:bg-form-input">
            {imageOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}  // Pass the selected option
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  option === selectedLanguage ? 'bg-gray-100' : 'hover:bg-gray-200'
                }`}
              >
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Example text to show the selected language */}
    </div>
  );
};

export default LanguageDropdown;
