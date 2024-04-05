import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => {
      savedCallback.current?.();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
