import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value
 * @param value - The value to be debounced
 * @param delay - The delay (in milliseconds) after which the value will be updated
 * @returns - The debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if the component unmounts or value changes before the timeout ends
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
}

export { useDebounce };
