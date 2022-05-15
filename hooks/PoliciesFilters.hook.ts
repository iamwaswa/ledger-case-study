import type {
  GetPolicyFilterKey,
  GetPolicyFilters,
  OrUndefined,
} from "~/types";
import { useState } from "react";

interface IUsePoliciesFilters {
  filters: GetPolicyFilters;
  updateFilters(key: GetPolicyFilterKey, value: OrUndefined<string>): void;
}

/**
 * Manages the state of the policies filters.
 * @returns The policies filters state
 */
export function usePoliciesFilters(): IUsePoliciesFilters {
  const [filters, setFilters] = useState<GetPolicyFilters>({});

  return {
    filters,
    updateFilters(key: GetPolicyFilterKey, value: OrUndefined<string>) {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: value,
      }));
    },
  };
}
