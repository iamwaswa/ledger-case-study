import { useState } from "react";
import { GetPolicyFilters } from "~/types";

interface IUsePoliciesFilters {
  filters: GetPolicyFilters;
  updateFilters(
    key: keyof GetPolicyFilters,
    value: GetPolicyFilters[keyof GetPolicyFilters]
  ): void;
}

export function usePoliciesFilters(): IUsePoliciesFilters {
  const [filters, setFilters] = useState<GetPolicyFilters>({});

  return {
    filters,
    updateFilters(
      key: keyof GetPolicyFilters,
      value: GetPolicyFilters[keyof GetPolicyFilters]
    ) {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [key]: value,
      }));
    },
  };
}
