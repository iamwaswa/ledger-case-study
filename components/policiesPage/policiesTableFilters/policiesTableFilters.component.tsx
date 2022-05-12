import type { ChangeEvent } from "react";
import type { GetPolicyFilters } from "~/types";
import { RenderList } from "~/utils/client";

interface IPoliciesTableFiltersProps {
  filters: GetPolicyFilters;
  updateFilters(
    key: keyof GetPolicyFilters,
    value: GetPolicyFilters[keyof GetPolicyFilters]
  ): void;
}

export function PoliciesTableFilters({
  filters,
  updateFilters,
}: IPoliciesTableFiltersProps) {
  function handleInputChange(filterKey: keyof GetPolicyFilters) {
    return (event: ChangeEvent<HTMLInputElement>): void => {
      if ([`driverAge`, `month`, `vehicleAge`, `year`].includes(filterKey)) {
        updateFilters(filterKey, Number(event.target.value));
      }
    };
  }

  function handleSelectChange(filterKey: keyof GetPolicyFilters) {
    return (event: ChangeEvent<HTMLSelectElement>): void => {
      if ([`driverAge`, `month`, `vehicleAge`, `year`].includes(filterKey)) {
        updateFilters(filterKey, Number(event.target.value));
      }
    };
  }

  return (
    <section className="flex flex-wrap gap-4">
      <RenderList
        items={
          Object.entries(filters) as Array<
            [keyof GetPolicyFilters, GetPolicyFilters[keyof GetPolicyFilters]]
          >
        }
        renderItem={([filterKey, filterValue]) => {
          if ([`driverAge`, `vehicleAge`, `year`].includes(filterKey)) {
            return (
              <input
                key={filterKey}
                value={filterValue}
                onChange={handleInputChange(filterKey)}
              />
            );
          }

          return (
            <select
              key={filterKey}
              value={filterValue}
              onChange={handleSelectChange(filterKey)}
            ></select>
          );
        }}
      />
    </section>
  );
}
