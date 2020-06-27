import { useState, useEffect } from "react";

// https://medium.com/@gabrielmickey28/using-debounce-with-react-components-f988c28f52c1
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
