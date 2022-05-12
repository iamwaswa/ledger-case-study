import type { IPolicy } from "~/types";
import { strings } from "~/localization";
import { RenderList } from "~/utils/client";

interface IPoliciesTableProps {
  policies: Array<IPolicy>;
}

export function PoliciesTable({ policies }: IPoliciesTableProps) {
  return (
    <table className="border-collapse">
      <thead>
        <tr>
          <th>{strings.policiesTableRowColumnTitle}</th>
          <th>{strings.policiesTableYearColumnTitle}</th>
          <th>{strings.policiesTableMonthColumnTitle}</th>
          <th>{strings.policiesTableDriverAgeColumnTitle}</th>
          <th>{strings.policiesTableDriverGenderColumnTitle}</th>
          <th>{strings.policiesTableDriverEmploymentColumnTitle}</th>
          <th>{strings.policiesTableDriverMaritalStatusColumnTitle}</th>
          <th>{strings.policiesTableDriverLocationColumnTitle}</th>
          <th>{strings.policiesTableVehicleAgeColumnTitle}</th>
          <th>{strings.policiesTableVehicleModelColumnTitle}</th>
          <th>{strings.policiesTableInsurancePremiumColumnTitle}</th>
          <th>{strings.policiesTableInsuranceClaimsColumnTitle}</th>
          <th>{strings.policiesTableInsuranceLossesColumnTitle}</th>
        </tr>
      </thead>
      <tbody>
        <RenderList
          items={policies}
          renderItem={(policy) => {
            return (
              <tr key={policy.row}>
                <td>{policy.row}</td>
                <td>{policy.year}</td>
                <td>
                  {Intl.DateTimeFormat(undefined, {
                    month: `long`,
                  }).format(new Date(policy.year, policy.month - 1, 1))}
                </td>
                <td>{policy.driverAge}</td>
                <td>{policy.driverGender}</td>
                <td>{policy.driverEmployment}</td>
                <td>{policy.driverMaritalStatus}</td>
                <td>{policy.driverLocation}</td>
                <td>{policy.vehicleAge}</td>
                <td>{policy.vehicleModel}</td>
                <td>{policy.insurancePremium}</td>
                <td>{policy.insuranceClaims}</td>
                <td>{policy.insuranceLosses}</td>
              </tr>
            );
          }}
        />
      </tbody>
    </table>
  );
}
