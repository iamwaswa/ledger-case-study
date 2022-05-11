import type { IPolicy, OrNull } from "~/types";
import type { IReadDataArgs, IReadDataResult } from "~/utils";
import { readDataAsync } from "~/utils";

export async function getPoliciesAsync(
  args: IReadDataArgs
): Promise<IReadDataResult> {
  return readDataAsync(args);
}

export async function getPolicyAsync(row: number): Promise<OrNull<IPolicy>> {
  const { policies } = await readDataAsync({
    pageSize: 1,
    skip: row - 1,
  });

  return policies ? policies[0] : null;
}
