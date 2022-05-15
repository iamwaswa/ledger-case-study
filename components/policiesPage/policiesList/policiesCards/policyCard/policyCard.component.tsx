import type { BasicPolicy } from "~/types";
import { strings } from "~/localization";
import { PolicyCardItem } from "./policyCardItem";
import Link from "next/link";

interface IPolicyCardProps {
  policy: BasicPolicy;
}

export function PolicyCard({ policy }: IPolicyCardProps): JSX.Element {
  return (
    <Link href={`/policies/${policy.row}`} passHref={true}>
      <a className="flex flex-col gap-2 p-4 rounded-sm shadow-md">
        <PolicyCardItem
          body={String(policy.year)}
          title={strings.policiesTableYearColumnTitle}
        />
        <PolicyCardItem
          body={Intl.DateTimeFormat(undefined, {
            month: `long`,
          }).format(new Date(policy.year, policy.month - 1, 1))}
          title={strings.policiesTableMonthColumnTitle}
        />
        <PolicyCardItem
          body={String(policy.driverGender)}
          title={strings.policiesTableDriverGenderColumnTitle}
        />
        <PolicyCardItem
          body={String(policy.driverEmployment)}
          title={strings.policiesTableDriverEmploymentColumnTitle}
        />
        <PolicyCardItem
          body={String(policy.driverLocation)}
          title={strings.policiesTableDriverLocationColumnTitle}
        />
        <PolicyCardItem
          body={String(policy.driverMaritalStatus)}
          title={strings.policiesTableDriverMaritalStatusColumnTitle}
        />
        <PolicyCardItem
          body={String(policy.vehicleModel)}
          title={strings.policiesTableVehicleModelColumnTitle}
        />
      </a>
    </Link>
  );
}
