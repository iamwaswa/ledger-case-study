import type { ApiCacheResponse, ResolvedPromise } from "~/types";
import { useApiCacheQuery } from "~/packages";
import { queryFunctions, queryKeys } from "~/utils";

/**
 * Manages fetching the policy at the given row
 * @param row The row number of the policy to get
 * @returns The get meal train by id request state
 */
export function useGetPolicy(
  row: number
): ApiCacheResponse<
  ResolvedPromise<ReturnType<typeof queryFunctions.getPolicy>>
> {
  const {
    data,
    error,
    isLoading: loading,
  } = useApiCacheQuery<
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicy>>,
    Error,
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicy>>,
    ReturnType<typeof queryKeys.getPolicy>
  >(
    queryKeys.getPolicy({
      row,
    }),
    queryFunctions.getPolicy
  );

  return {
    data,
    error,
    loading,
  };
}
