import { strings } from "~/localization";
import type { OrUndefined } from "~/types";
import { earliestYear, latestYear } from "~/types";
import {
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  GetPolicyFilters,
  GetPolicyFilterKey,
  VehicleModel,
} from "~/types";
import { PoliciesFilter } from "./policiesFilter";

interface IPoliciesFiltersProps {
  filters: GetPolicyFilters;
  updateFilters(key: GetPolicyFilterKey, value: OrUndefined<string>): void;
}

export function PoliciesFilters({
  filters,
  updateFilters,
}: IPoliciesFiltersProps) {
  function handlePolicyFilterChanged(key: GetPolicyFilterKey) {
    return (value: OrUndefined<string>): void => {
      updateFilters(key, value);
    };
  }

  return (
    <section className="flex flex-wrap gap-4 py-2 justify-between">
      <PoliciesFilter
        label={strings.policiesFiltersYearLabel}
        policyFilterOptions={Array(latestYear - earliestYear + 1).fill(null)}
        value={filters.year}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.YEAR
        )}
        renderPolicyFilterOption={(_: null, index: number) => {
          const year = latestYear - index;
          return (
            <option key={index} value={year}>
              {year}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersMonthLabel}
        policyFilterOptions={Array(12).fill(null)}
        value={filters.month}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.MONTH
        )}
        renderPolicyFilterOption={(_: null, index: number) => {
          const currentYear = new Date().getFullYear();
          const date = new Date(currentYear, index);
          const month = new Intl.DateTimeFormat(undefined, {
            month: `long`,
          }).format(date);

          return (
            <option key={index} value={index + 1}>
              {month}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersDriverGenderLabel}
        policyFilterOptions={Object.values(DriverGender)}
        value={filters.driverGender}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.DRIVER_GENDER
        )}
        renderPolicyFilterOption={(gender: DriverGender) => {
          return (
            <option key={gender} value={gender}>
              {gender}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersDriverEmploymentLabel}
        policyFilterOptions={Object.values(DriverEmployment)}
        value={filters.driverEmployment}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.DRIVER_EMPLOYMENT
        )}
        renderPolicyFilterOption={(employment: DriverEmployment) => {
          return (
            <option key={employment} value={employment}>
              {employment}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersDriverLocationLabel}
        policyFilterOptions={Object.values(DriverLocation)}
        value={filters.driverLocation}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.DRIVER_LOCATION
        )}
        renderPolicyFilterOption={(location: DriverLocation) => {
          return (
            <option key={location} value={location}>
              {location}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersDriverMaritalStatusLabel}
        policyFilterOptions={Object.values(DriverMaritalStatus)}
        value={filters.driverMaritalStatus}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.DRIVER_MARITAL_STATUS
        )}
        renderPolicyFilterOption={(maritalStatus: DriverMaritalStatus) => {
          return (
            <option key={maritalStatus} value={maritalStatus}>
              {maritalStatus}
            </option>
          );
        }}
      />
      <PoliciesFilter
        label={strings.policiesFiltersVehicleModelLabel}
        policyFilterOptions={Object.values(VehicleModel)}
        value={filters.vehicleModel}
        onPolicyFilterChanged={handlePolicyFilterChanged(
          GetPolicyFilterKey.VEHICLE_MODEL
        )}
        renderPolicyFilterOption={(vehicleModel: VehicleModel) => {
          return (
            <option key={vehicleModel} value={vehicleModel}>
              {vehicleModel}
            </option>
          );
        }}
      />
    </section>
  );
}
