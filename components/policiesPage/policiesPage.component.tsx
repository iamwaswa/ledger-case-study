import Head from "next/head";
import { useGetPolicies, usePageSize, usePoliciesFilters } from "~/hooks";
import { strings } from "~/localization";
import { RenderAsyncData } from "~/utils/client";
import { PoliciesTableFilters } from "./policiesTableFilters";
import { PoliciesTablePagination } from "./policiesTablePagination";
import { PoliciesTable } from "./policiesTable";

export function PoliciesPage() {
  const { pageSize, pageSizeOptions, setPageSize } = usePageSize();

  const { filters, updateFilters } = usePoliciesFilters();

  const {
    data,
    error,
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
      <main>
        <h1 className="font-mono text-xl code">{strings.policiesPageTitle}</h1>
        <RenderAsyncData
          data={data}
          error={error}
          loading={loading}
          renderData={({ policies }) => {
            return (
              <section className="flex flex-col gap-2 items-stretch">
                <PoliciesTableFilters
                  filters={filters}
                  updateFilters={updateFilters}
                />
                <PoliciesTablePagination
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeOptions}
                  fetchNextPage={handleFetchNextPage}
                  fetchPreviousPage={handleFetchPreviousPage}
                  setPageSize={setPageSize}
                />
                <PoliciesTable policies={policies} />
                <PoliciesTablePagination
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeOptions}
                  fetchNextPage={handleFetchNextPage}
                  fetchPreviousPage={handleFetchPreviousPage}
                  setPageSize={setPageSize}
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
