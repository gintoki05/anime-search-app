import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Jika value kosong, set immediately (jangan delay)
    if (
      (typeof value === "string" && value.trim() === "") ||
      value === null ||
      value === undefined
    ) {
      setDebouncedValue(value);
      return;
    }

    // Untuk non-empty, apply debounce delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
