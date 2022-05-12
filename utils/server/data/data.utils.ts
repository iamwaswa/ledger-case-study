import type { GetPolicyFilters, IPolicy, OrNull } from "~/types";
import fs from "fs";
import path from "path";

export interface IReadDataArgs {
  filters?: GetPolicyFilters;
  pageSize: number;
  skip: number;
}

export interface IReadDataResult {
  policies: OrNull<Array<IPolicy>>;
  skip: OrNull<number>;
}

export async function readDataAsync({
  filters,
  pageSize,
  skip,
}: IReadDataArgs): Promise<IReadDataResult> {
  const policies = readCSVFile();

  const matchingPoliciesPlus1 = policies
    .filter(matchingValues(`driverEmployment`, filters?.driverEmployment))
    .filter(matchingValues(`driverGender`, filters?.driverGender))
    .filter(matchingValues(`driverLocation`, filters?.driverLocation))
    .filter(matchingValues(`driverMaritalStatus`, filters?.driverMaritalStatus))
    .filter(matchingValues(`month`, filters?.month))
    .filter(matchingValues(`vehicleAge`, filters?.vehicleAge))
    .filter(matchingValues(`vehicleModel`, filters?.vehicleModel))
    .filter(matchingValues(`year`, filters?.year))
    .slice(skip, skip + pageSize + 1);

  const matchingPolicies = matchingPoliciesPlus1.slice(0, pageSize);

  return {
    policies: matchingPolicies.length > 0 ? matchingPolicies : null,
    skip:
      matchingPoliciesPlus1.slice(pageSize).length > 0 ? skip + pageSize : null,
  };
}

function matchingValues<FilterType extends keyof IPolicy>(
  key: FilterType,
  filter: IPolicy[FilterType]
) {
  return (policy: IPolicy, _: number, __: Array<IPolicy>): boolean => {
    return typeof filter === undefined || policy[key] === filter;
  };
}

export interface IReadDatumArgs {
  row: number;
}

export interface IReadDatumResult {
  policy: OrNull<IPolicy>;
}

export async function readDatumAsync({
  row,
}: IReadDatumArgs): Promise<IReadDatumResult> {
  const policies = readCSVFile();

  const [matchingPolicy] = policies.slice(row + 1, row + 2);

  return {
    policy: matchingPolicy ?? null,
  };
}

function readCSVFile() {
  return fs
    .readFileSync(path.resolve(`./public`, `auto_policies.csv`), `utf-8`)
    .split(`\r\n`)
    .slice(1)
    .map(csvRowToPolicy);
}

function csvRowToPolicy(row: string, rowIndex: number): IPolicy {
  const columns = row.split(`,`);
  const csvColumns = [
    `year`,
    `month`,
    `driverAge`,
    `driverGender`,
    `driverEmployment`,
    `driverMaritalStatus`,
    `driveLocation`,
    `vehicleAge`,
    `vehicleModel`,
    `insurancePremium`,
    `insuranceClaims`,
    `insuranceLosses`,
  ] as unknown as keyof IPolicy;

  return columns.reduce(
    (policy, column, index) => {
      policy[csvColumns[index]] = column;
      return policy;
    },
    {
      row: rowIndex + 1,
    } as IPolicy
  );
}
