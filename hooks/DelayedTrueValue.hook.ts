import { useEffect, useState } from "react";

/**
 * Manages changing a boolean value to true based on a given delay.
 * @param delay The delay after which to change the boolean to true
 * @returns The boolean value
 */
export function useDelayedTrueValue(delay: number): boolean {
  const [trueValue, setTrueValue] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const timeout = setTimeout((): void => {
      setTrueValue(true);
    }, delay);

    return (): void => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delay]);

  return trueValue;
}
