import type { Dispatch, SetStateAction } from "react";
import { useRef, useState } from "react";

interface IUsePageSize {
  pageSize: number;
  pageSizeOptions: Array<number>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export function usePageSize(): IUsePageSize {
  const pageSizeOptions = useRef<Array<number>>([10, 15, 25, 50, 75, 100]);

  const [pageSize, setPageSize] = useState<number>(pageSizeOptions.current[0]);

  return {
    pageSize,
    setPageSize,
    pageSizeOptions: pageSizeOptions.current,
  };
}
