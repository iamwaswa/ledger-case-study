import Head from "next/head";
import { useGetPolicies, usePageSize, usePoliciesFilters } from "~/hooks";
import { strings } from "~/localization";
import { RenderAsyncData, RenderEitherOr } from "~/utils/client";
import { PoliciesFilters } from "./policiesFilters";
import { PoliciesPagination } from "./policiesPagination";
import { PoliciesTable } from "./policiesTable";

export function PoliciesPage() {
  const { pageSize, pageSizeOptions, setPageSize } = usePageSize();

  const { filters, updateFilters } = usePoliciesFilters();

  const {
    data,
    error,
    gettingNextPage,
    hasNextPage,
    hasPreviousPage,
    loading,
    handleFetchNextPage,
    handleFetchPreviousPage,
  } = useGetPolicies(filters, pageSize);

  return (
    <>
      <Head>
        <meta content={strings.policiesPageDescription} name="description" />
      </Head>
      <main className="bg-slate-50 p-4">
        <h1 className="text-xl">{strings.policiesPageTitle}</h1>
        <RenderAsyncData
          data={data}
          error={error}
          loading={loading}
          renderData={({ policies }) => {
            return (
              <section className="flex flex-col gap-2 items-stretch">
                <PoliciesFilters
                  filters={filters}
                  updateFilters={updateFilters}
                />
                <RenderEitherOr
                  ifTrue={policies}
                  thenRender={(policiesData) => {
                    return (
                      <>
                        <PoliciesPagination
                          hasNextPage={hasNextPage}
                          hasPreviousPage={hasPreviousPage}
                          loading={gettingNextPage}
                          pageSize={pageSize}
                          pageSizeOptions={pageSizeOptions}
                          fetchNextPage={handleFetchNextPage}
                          fetchPreviousPage={handleFetchPreviousPage}
                          setPageSize={setPageSize}
                        />
                        <PoliciesTable policies={policiesData} />
                        <PoliciesPagination
                          hasNextPage={hasNextPage}
                          hasPreviousPage={hasPreviousPage}
                          loading={gettingNextPage}
                          pageSize={pageSize}
                          pageSizeOptions={pageSizeOptions}
                          fetchNextPage={handleFetchNextPage}
                          fetchPreviousPage={handleFetchPreviousPage}
                          setPageSize={setPageSize}
                        />
                      </>
                    );
                  }}
                  otherwiseRender={<p>{strings.noPoliciesFoundMessage}</p>}
                />
              </section>
            );
          }}
          renderLoading={<p>{strings.policiesTableLoadingMessage}</p>}
          renderError={({ message }) => {
            return <p className="text-red-500">{message}</p>;
          }}
        />
      </main>
    </>
  );
}
