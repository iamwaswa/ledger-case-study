import { useLayoutEffect, useState } from "react";

const HIDE_POLICIES_TABLE_WIDTH = 600;

/**
 * Determines whether to show the polcies table based on the viewport width.
 * @returns The status of whether to show the policies table
 */
export function useShowPoliciesTable(): boolean {
  const [showPoliciesTable, setShowPoliciesTable] = useState<boolean>(false);

  // useLayoutEffect here instead of useEffect so that we can prevent layout shifts
  // when the value of state updates as we transition from one view to another
  useLayoutEffect((): (() => void) => {
    function onScreenSizeChanged(): void {
      setShowPoliciesTable(window.innerWidth > HIDE_POLICIES_TABLE_WIDTH);
    }

    onScreenSizeChanged();

    window.addEventListener(`resize`, onScreenSizeChanged);

    return (): void => {
      window.removeEventListener(`resize`, onScreenSizeChanged);
    };
  });

  return showPoliciesTable;
}
