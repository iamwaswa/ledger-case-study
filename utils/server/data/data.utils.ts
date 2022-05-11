import fs from "fs";
import path from "path";
import { GetPolicyFilters, IPolicy, OrNull } from "~/types";

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
  const csv = fs.readFileSync(
    path.resolve(`./public`, `auto_policies.csv`),
    `utf-8`
  );

  const policies = csv
    .split(`\r\n`)
    .slice(1)
    .map(csvRowToPolicy)
    .filter(matchingValues(`driverEmployment`, filters?.driverEmployment))
    .filter(matchingValues(`driverGender`, filters?.driverGender))
    .filter(matchingValues(`driverLocation`, filters?.driverLocation))
    .filter(matchingValues(`driverMaritalStatus`, filters?.driverMaritalStatus))
    .filter(matchingValues(`month`, filters?.month))
    .filter(matchingValues(`vehicleAge`, filters?.vehicleAge))
    .filter(matchingValues(`vehicleModel`, filters?.vehicleModel))
    .filter(matchingValues(`year`, filters?.year))
    .slice(skip, skip + pageSize + 1);

  const matchingPolicies = policies.slice(0, pageSize);

  return {
    policies: matchingPolicies.length > 0 ? matchingPolicies : null,
    skip: policies.slice(pageSize).length > 0 ? skip + pageSize : null,
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

function csvRowToPolicy(row: string): IPolicy {
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

  return columns.reduce((policy, column, index) => {
    policy[csvColumns[index]] = column;
    return policy;
  }, {} as IPolicy);
}
