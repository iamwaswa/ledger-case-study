import type {
  IPolicy,
  IReadDataArgs,
  IReadDataResult,
  IReadDatumArgs,
  IReadDatumResult,
  OrUndefined,
} from "~/types";
import fs from "fs";
import path from "path";

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
    { parser: (value: unknown): unknown => value, title: `driveLocation` },
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
