import type {
  ApiCacheResponse,
  GetPolicyFilters,
  ResolvedPromise,
} from "~/types";
import { useApiCacheQuery } from "~/packages/client";
import { queryFunctions, queryKeys } from "~/utils/client";
import { useEffect, useState } from "react";

interface IUseGetPoliciesResponse
  extends ApiCacheResponse<
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>
  > {
  gettingNextPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  handleFetchNextPage(): void;
  handleFetchPreviousPage(): void;
}

/**
 * Manages fetching the policies with the provided arguments
 * @param filters The filters for the policies
 * @param pageSize The number of policies to get matching the filters
 * @returns The get meal train by id request state
 */
export function useGetPolicies(
  filters: GetPolicyFilters,
  pageSize: number
): IUseGetPoliciesResponse {
  const [skip, setSkip] = useState<number>(0);

  // Whenever the filters or page size change
  // then we are starting a fresh query
  // therefore we reset the skip value to its initial value
  useEffect((): void => {
    setSkip(0);
  }, [filters, pageSize]);

  const {
    data,
    error,
    isFetching,
    isLoading: loading,
  } = useApiCacheQuery<
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>,
    Error,
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>,
    ReturnType<typeof queryKeys.getPolicies>
  >(
    queryKeys.getPolicies({
      filters,
      pageSize,
      skip,
    }),
    queryFunctions.getPolicies,
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    error,
    gettingNextPage: isFetching,
    hasNextPage: data?.skipForward !== null,
    hasPreviousPage: data?.skipBack !== null,
    loading,
    handleFetchNextPage() {
      if (data?.skipForward !== null) {
        setSkip(data.skipForward);
      }
    },
    handleFetchPreviousPage() {
      if (data?.skipBack !== null) {
        setSkip(data.skipBack);
      }
    },
  };
}
