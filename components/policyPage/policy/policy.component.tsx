import { useGetPolicy } from "~/hooks";
import { strings } from "~/localization";
import { RenderAsyncData } from "~/utils/client";
import { PolicyItem } from "./policyItem";

interface IPolicyProps {
  policyRow: number;
}

export function Policy({ policyRow }: IPolicyProps) {
  const { data, error, loading } = useGetPolicy(policyRow);

  return (
    <RenderAsyncData
      data={data}
      error={error}
      loading={loading}
      renderData={({ policy }) => {
        return (
          <section className="flex flex-wrap gap-4 py-2">
            <PolicyItem
              body={String(policy.year)}
              title={strings.policiesTableYearColumnTitle}
            />
            <PolicyItem
              body={String(policy.month)}
              title={strings.policiesTableMonthColumnTitle}
            />
            <PolicyItem
              body={String(policy.driverGender)}
              title={strings.policiesTableDriverGenderColumnTitle}
            />
            <PolicyItem
              body={String(policy.driverEmployment)}
              title={strings.policiesTableDriverEmploymentColumnTitle}
            />
            <PolicyItem
              body={String(policy.driverLocation)}
              title={strings.policiesTableDriverLocationColumnTitle}
            />
            <PolicyItem
              body={String(policy.driverMaritalStatus)}
              title={strings.policiesTableDriverMaritalStatusColumnTitle}
            />
            <PolicyItem
              body={String(policy.driverAge)}
              title={strings.policiesTableDriverAgeColumnTitle}
            />
            <PolicyItem
              body={String(policy.vehicleModel)}
              title={strings.policiesTableVehicleModelColumnTitle}
            />
            <PolicyItem
              body={String(policy.vehicleAge)}
              title={strings.policiesTableVehicleAgeColumnTitle}
            />
            <PolicyItem
              body={String(policy.insuranceClaims)}
              title={strings.policiesTableInsuranceClaimsColumnTitle}
            />
            <PolicyItem
              body={String(policy.insuranceLosses)}
              title={strings.policiesTableInsuranceLossesColumnTitle}
            />
          </section>
        );
      }}
      renderError={({ message }) => {
        return <p className="text-red-500">{message}</p>;
      }}
      renderLoading={<p>{strings.policyLoadingMessage}</p>}
    />
  );
}
