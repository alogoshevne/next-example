import { useEffect, useRef } from 'react';

const useDebounce = (func: any, delay: number = 300, cleanUp = false) => {
  const timeoutRef = useRef<any>();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: any) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
};

export default useDebounce;
