import type { BasicPolicy } from "~/types";
import { strings } from "~/localization";
import { RenderList } from "~/utils/client";
import Link from "next/link";

interface IPoliciesTableProps {
  policies: Array<BasicPolicy>;
}

export function PoliciesTable({ policies }: IPoliciesTableProps) {
  const borderColor = `border-slate-300`;
  const tableHeadItemClassName = `truncate border ${borderColor} font-semibold p-4 text-slate-900`;
  const tableBodyItemClassName = `truncate border ${borderColor} p-4 text-slate-700`;

  return (
    <>
      <p className="text-md font-medium py-2">{strings.policiesTableMessage}</p>
      <section className="flex flex-col grow border border-slate-500 bg-slate-50 text-sm shadow-sm">
        <section className="grid grid-cols-7 bg-slate-100">
          <span className={tableHeadItemClassName}>
            {strings.policiesTableYearColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableMonthColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableDriverGenderColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableDriverEmploymentColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableDriverLocationColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableDriverMaritalStatusColumnTitle}
          </span>
          <span className={tableHeadItemClassName}>
            {strings.policiesTableVehicleModelColumnTitle}
          </span>
        </section>
        <section className="flex flex-col">
          <RenderList
            items={policies}
            renderItem={(policy) => {
              return (
                <Link href={`/policies/${policy.row}`} passHref={true}>
                  <a className="grid grid-cols-7" key={policy.row}>
                    <span className={tableBodyItemClassName}>
                      {policy.year}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {Intl.DateTimeFormat(undefined, {
                        month: `long`,
                      }).format(new Date(policy.year, policy.month - 1, 1))}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {policy.driverGender}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {policy.driverEmployment}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {policy.driverLocation}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {policy.driverMaritalStatus}
                    </span>
                    <span className={tableBodyItemClassName}>
                      {policy.vehicleModel}
                    </span>
                  </a>
                </Link>
              );
            }}
          />
        </section>
      </section>
      <p className="text-md font-medium py-2">{strings.policiesTableMessage}</p>
    </>
  );
}
