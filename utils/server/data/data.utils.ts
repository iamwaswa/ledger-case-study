import type {
  IPolicy,
  IReadDataArgs,
  IReadDataResult,
  IReadDatumArgs,
  IReadDatumResult,
  OrUndefined,
} from "~/types";
import {
  DriverEmployment,
  DriverGender,
  DriverLocation,
  DriverMaritalStatus,
  earliestYear,
  latestYear,
  VehicleModel,
} from "~/types";
import fs from "fs";
import path from "path";

export async function readDataAsync({
  filters,
  pageSize,
  skip,
}: IReadDataArgs): Promise<IReadDataResult> {
  const policies = readCSVFile();

  const formattedFilters = formatFilters(filters);

  const matchingPoliciesPlus1 = policies
    .filter(
      matchingValues(`driverEmployment`, formattedFilters?.driverEmployment)
    )
    .filter(matchingValues(`driverGender`, formattedFilters?.driverGender))
    .filter(matchingValues(`driverLocation`, formattedFilters?.driverLocation))
    .filter(
      matchingValues(
        `driverMaritalStatus`,
        formattedFilters?.driverMaritalStatus
      )
    )
    .filter(matchingValues(`month`, formattedFilters?.month))
    .filter(matchingValues(`vehicleModel`, formattedFilters?.vehicleModel))
    .filter(matchingValues(`year`, formattedFilters?.year))
    .slice(skip, skip + pageSize + 1);

  const matchingPolicies = matchingPoliciesPlus1.slice(0, pageSize);

  return {
    policies: matchingPolicies.length > 0 ? matchingPolicies : null,
    skipBack: skip === 0 ? null : skip - pageSize,
    skipForward:
      matchingPoliciesPlus1.slice(pageSize).length > 0 ? skip + pageSize : null,
  };
}

function formatFilters(
  filters: IReadDataArgs[`filters`]
): Pick<
  IPolicy,
  | `driverEmployment`
  | `driverGender`
  | `driverLocation`
  | `driverMaritalStatus`
  | `month`
  | `vehicleModel`
  | `year`
> {
  const driverEmployment = Object.values(DriverEmployment).find(
    (value) => value === filters?.driverEmployment
  );

  const driverGender = Object.values(DriverGender).find(
    (value) => value === filters?.driverGender
  );

  const driverLocation = Object.values(DriverLocation).find(
    (value) => value === filters?.driverLocation
  );

  const driverMaritalStatus = Object.values(DriverMaritalStatus).find(
    (value) => value === filters?.driverMaritalStatus
  );

  const month = filters?.month ? Number(filters.month) : undefined;

  const vehicleModel = Object.values(VehicleModel).find(
    (value) => value === filters?.vehicleModel
  );

  const year = filters?.year ? Number(filters.year) : undefined;

  return {
    driverEmployment,
    driverGender,
    driverLocation,
    driverMaritalStatus,
    month: month >= 1 && month <= 12 ? (month as IPolicy[`month`]) : undefined,
    vehicleModel,
    year: year >= earliestYear && year <= latestYear ? year : undefined,
  };
}

function matchingValues<FilterType extends keyof IPolicy>(
  key: FilterType,
  filter: OrUndefined<IPolicy[FilterType]>
) {
  return (policy: IPolicy, _: number, __: Array<IPolicy>): boolean => {
    return typeof filter === `undefined` || policy[key] === filter;
  };
}

export async function readDatumAsync({
  row,
}: IReadDatumArgs): Promise<IReadDatumResult> {
  const policies = readCSVFile();

  const [matchingPolicy] = policies.slice(row - 1, row);

  return {
    policy: matchingPolicy ?? null,
  };
}

function readCSVFile() {
  return fs
    .readFileSync(path.resolve(`./public`, `auto_policies.csv`), `utf-8`)
    .split(`\n`)
    .filter(Boolean)
    .slice(1)
    .map(csvRowToPolicy);
}

function csvRowToPolicy(row: string, rowIndex: number): IPolicy {
  const columns = row.split(`,`);

  const csvColumns = [
    { parser: parseInt, title: `year` },
    { parser: parseInt, title: `month` },
    { parser: parseFloat, title: `driverAge` },
    { parser: (value: unknown): unknown => value, title: `driverGender` },
    { parser: (value: unknown): unknown => value, title: `driverEmployment` },
    {
      parser: (value: unknown): unknown => value,
      title: `driverMaritalStatus`,
    },
    { parser: (value: unknown): unknown => value, title: `driverLocation` },
    { parser: parseFloat, title: `vehicleAge` },
    { parser: (value: unknown): unknown => value, title: `vehicleModel` },
    { parser: parseFloat, title: `insurancePremium` },
    { parser: parseFloat, title: `insuranceClaims` },
    { parser: parseFloat, title: `insuranceLosses` },
  ];

  return columns.reduce(
    (policy, column, index) => {
      const { title, parser } = csvColumns[index];

      policy[title] = parser(column);

      return policy;
    },
    {
      row: rowIndex + 1,
    } as IPolicy
  );
}
