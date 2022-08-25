import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): [T, Dispatch<SetStateAction<T>>] {
  const [undebouncedValue, setUndebouncedValue] = useState<T>(value);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(undebouncedValue), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [undebouncedValue, delay]);

  return [debouncedValue, setUndebouncedValue];
}

export default useDebounce;
