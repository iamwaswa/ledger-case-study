import type { IReadDataArgs, IReadDatumArgs } from "~/types";

/**
 * Manages utilities for generating query keys.
 * @returns The query key generator utitlies
 */
export const queryKeys = {
  getPolicies(dependencies: Omit<IReadDataArgs, `skip`>) {
    return [{ endpoint: `/policies`, ...dependencies }] as const;
  },
  getPolicy(dependencies: IReadDatumArgs) {
    return [{ endpoint: `/policies/[policyRow]`, ...dependencies }] as const;
  },
};
