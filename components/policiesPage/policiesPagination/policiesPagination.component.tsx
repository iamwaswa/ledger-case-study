import type { ChangeEvent } from "react";
import { strings } from "~/localization";
import { RenderList } from "~/utils/client";

interface IPoliciesPaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loading: boolean;
  pageSize: number;
  pageSizeOptions: Array<number>;
  fetchNextPage(): void;
  fetchPreviousPage(): void;
  setPageSize(pageSize: number): void;
}

export function PoliciesPagination({
  hasNextPage,
  hasPreviousPage,
  loading,
  pageSize,
  pageSizeOptions,
  fetchNextPage,
  fetchPreviousPage,
  setPageSize,
}: IPoliciesPaginationProps) {
  const buttonClassName = `bg-slate-800 outline-slate-600 disabled:opacity-70 text-slate-50 p-3 rounded-md`;

  function handlePageSizeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setPageSize(Number(event.target.value));
  }

  return (
    <section className="flex items-center justify-between py-2">
      <button
        className={buttonClassName}
        disabled={loading || !hasPreviousPage}
        onClick={fetchPreviousPage}
      >
        {loading
          ? strings.policiesTableActionLoadingText
          : strings.policiesTablePreviousActionText}
      </button>
      <label className="flex gap-2 items-center">
        <span>{strings.policiesTablePageSizeLabelText}</span>
        <select
          className="border border-slate-800 rounded-sm cursor-pointer"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
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
      <button
        className={buttonClassName}
        disabled={loading || !hasNextPage}
        onClick={fetchNextPage}
      >
        {loading
          ? strings.policiesTableActionLoadingText
          : strings.policiesTableNextActionText}
      </button>
    </section>
  );
}
