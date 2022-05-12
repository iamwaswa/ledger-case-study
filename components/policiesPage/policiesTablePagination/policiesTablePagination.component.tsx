import type { ChangeEvent } from "react";
import { strings } from "~/localization";
import { RenderList } from "~/utils/client";

interface IPoliciesTablePaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  pageSizeOptions: Array<number>;
  fetchNextPage(): void;
  fetchPreviousPage(): void;
  setPageSize(pageSize: number): void;
}

export function PoliciesTablePagination({
  hasNextPage,
  hasPreviousPage,
  pageSize,
  pageSizeOptions,
  fetchNextPage,
  fetchPreviousPage,
  setPageSize,
}: IPoliciesTablePaginationProps) {
  function handlePageSizeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPageSize(Number(event.target.value));
  }

  return (
    <section className="flex justify-between">
      <button disabled={!hasPreviousPage} onClick={fetchPreviousPage}>
        {strings.policiesTablePreviousActionText}
      </button>
      <label>
        <span>{strings.policiesTablePageSizeLabelText}</span>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <RenderList
            items={pageSizeOptions}
            renderItem={(page) => {
              return (
                <option key={page} value={page}>
                  {page}
                </option>
              );
            }}
          />
        </select>
      </label>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        {strings.policiesTableNextActionText}
      </button>
    </section>
  );
}
