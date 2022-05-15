import type { IGetPoliciesArgs, IGetPolicyArgs } from "~/types";

/**
 * Manages utilities for generating query keys.
 * @returns The query key generator utitlies
 */
export const queryKeys = {
  getPolicies(dependencies: IGetPoliciesArgs) {
    return [{ endpoint: `/policies`, ...dependencies }] as const;
  },
  getPolicy(dependencies: IGetPolicyArgs) {
    return [{ endpoint: `/policies/[policyRow]`, ...dependencies }] as const;
  },
};
