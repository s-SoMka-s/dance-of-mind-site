import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(() => {});

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval, fire immediately once, then repeat every `delay` ms.
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const tick = () => {
      savedCallback.current();
    };

    // immediate first call
    tick();
    const intervalId = window.setInterval(tick, delay) as unknown as number;

    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);
}
