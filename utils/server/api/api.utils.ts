import type {
  IReadDataArgs,
  IReadDataResult,
  IReadDatumArgs,
  IReadDatumResult,
} from "~/types";
import { readDataAsync, readDatumAsync } from "~/utils/server";

export async function getPoliciesAsync(
  args: IReadDataArgs
): Promise<IReadDataResult> {
  return readDataAsync(args);
}

export async function getPolicyAsync(
  args: IReadDatumArgs
): Promise<IReadDatumResult> {
  return readDatumAsync(args);
}
