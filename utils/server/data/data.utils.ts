import type { IPolicy } from "~/types";
import fs from "fs";
import path from "path";

export function readCSVFile() {
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
