import { QueryFunctionContext } from "~/packages";
import { OrNull } from "~/types";
import type { IReadDataResult, IReadDatumResult } from "~/utils";
import { asyncRequest, queryKeys } from "~/utils";

/**
 * Manages utilities for generating query functions.
 * @returns The query function generator utitlies
 */
export const queryFunctions = {
  getPolicies({
    queryKey: [{ endpoint, filters, pageSize }],
    pageParam: skip,
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

    if (filters.vehicleAge) {
      urlSearchParams.set(`vehicleAge`, String(filters.vehicleAge));
    }

    if (filters.vehicleModel) {
      urlSearchParams.set(`vehicleModel`, String(filters.vehicleModel));
    }

    if (filters.year) {
      urlSearchParams.set(`year`, String(filters.year));
    }

    urlSearchParams.set(`pageSize`, String(pageSize));

    urlSearchParams.set(`skip`, String(skip ?? 0));

    return asyncRequest<IReadDataResult>({
      endpoint,
      method: `GET`,
      query: `?${urlSearchParams.toString()}`,
    });
  },
  getPolicy({
    queryKey: [{ endpoint, row }],
  }: QueryFunctionContext<ReturnType<typeof queryKeys.getPolicy>>) {
    return asyncRequest<IReadDatumResult>({
      endpoint: endpoint.replace(`[policyRow]`, String(row)),
      method: `GET`,
    });
  },
};
