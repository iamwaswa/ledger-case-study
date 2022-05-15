import type { IGetPoliciesResult, IGetPolicyResult, OrNull } from "~/types";
import { QueryFunctionContext } from "~/packages/client";
import { asyncRequest, queryKeys } from "~/utils/client";

/**
 * Manages utilities for generating query functions.
 * @returns The query function generator utitlies
 */
export const queryFunctions = {
  getPolicies({
    queryKey: [{ endpoint, filters, pageSize, skip }],
  }: QueryFunctionContext<
    ReturnType<typeof queryKeys.getPolicies> & {
      pageParam: OrNull<number>;
    }
  >) {
    const urlSearchParams = new URLSearchParams();

    if (filters.driverEmployment) {
      urlSearchParams.set(`driverEmployment`, String(filters.driverEmployment));
    }

    if (filters.driverGender) {
      urlSearchParams.set(`driverGender`, String(filters.driverGender));
    }

    if (filters.driverLocation) {
      urlSearchParams.set(`driverLocation`, String(filters.driverLocation));
    }

    if (filters.driverMaritalStatus) {
      urlSearchParams.set(
        `driverMaritalStatus`,
        String(filters.driverMaritalStatus)
      );
    }

    if (filters.month) {
      urlSearchParams.set(`month`, String(filters.month));
    }

    if (filters.vehicleModel) {
      urlSearchParams.set(`vehicleModel`, String(filters.vehicleModel));
    }

    if (filters.year) {
      urlSearchParams.set(`year`, String(filters.year));
    }

    urlSearchParams.set(`pageSize`, String(pageSize));

    urlSearchParams.set(`skip`, String(skip));

    return asyncRequest<IGetPoliciesResult>({
      endpoint,
      method: `GET`,
      query: `?${urlSearchParams.toString()}`,
    });
  },
  getPolicy({
    queryKey: [{ endpoint, row }],
  }: QueryFunctionContext<ReturnType<typeof queryKeys.getPolicy>>) {
    return asyncRequest<IGetPolicyResult>({
      endpoint: endpoint.replace(`[policyRow]`, String(row)),
      method: `GET`,
    });
  },
};
