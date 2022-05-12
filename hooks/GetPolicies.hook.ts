import { ApiCacheResponse, GetPolicyFilters, ResolvedPromise } from "~/types";
import { useApiCacheInfiniteQuery } from "~/packages";
import { queryFunctions, queryKeys } from "~/utils";
import { useEffect, useRef } from "react";

interface IUseGetPoliciesResponse
  extends ApiCacheResponse<
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>
  > {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onFetchNextPage(): void;
  onFetchPreviousPage(): void;
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
  const page = useRef<number>(0);

  // Whenever the filters or page size change
  // then we are starting a fresh query
  // therefore we reset the page number to its initial value
  useEffect((): void => {
    page.current = 0;
  }, [filters, pageSize]);

  const {
    data,
    error,
    hasNextPage,
    hasPreviousPage,
    isLoading: loading,
    fetchNextPage,
    fetchPreviousPage,
  } = useApiCacheInfiniteQuery<
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>,
    Error,
    ResolvedPromise<ReturnType<typeof queryFunctions.getPolicies>>,
    ReturnType<typeof queryKeys.getPolicies>
  >(
    queryKeys.getPolicies({
      filters,
      pageSize,
    }),
    queryFunctions.getPolicies,
    {
      getNextPageParam(lastPage) {
        return lastPage.skip;
      },
      getPreviousPageParam(firstPage) {
        return firstPage.skip;
      },
    }
  );

  return {
    data: data.pages[0],
    error,
    hasNextPage,
    hasPreviousPage,
    loading,
    onFetchNextPage() {
      page.current++;
      fetchNextPage();
    },
    onFetchPreviousPage() {
      page.current--;
      fetchPreviousPage();
    },
  };
}
