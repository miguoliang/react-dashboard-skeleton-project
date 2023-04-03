import React, { useCallback, useEffect, useMemo, useState } from "react";
import Pager, { PaginationChangeHandler } from "./Pagers";
import Prev from "./Prev";
import Next from "./Next";
import Total from "./Total";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { PaginationState } from "@tanstack/react-table";

type PaginationProps = Partial<{
  total: number;
  displayTotal: boolean;
  pageSize: number;
  className: string;
  currentPage: number;
  onChange: PaginationChangeHandler;
}>;

const Pagination = (props: PaginationProps) => {
  const {
    className,
    currentPage = 1,
    displayTotal = false,
    onChange,
    pageSize = 10,
    total = 5,
  } = props;

  const [paginationTotal, setPaginationTotal] = useState(total);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);

  const { themeColor, primaryColorLevel } = useConfig();

  const getInternalPageCount = useMemo(() => {
    if (typeof paginationTotal === "number") {
      return Math.ceil(paginationTotal / internalPageSize);
    }
    return 0;
  }, [paginationTotal, internalPageSize]);

  const getValidCurrentPage = useCallback(
    (paginationState: PaginationState) => {
      return paginationState.pageIndex;
    },
    [getInternalPageCount]
  );

  const [internalCurrentPage, setInternalCurrentPage] = useState(
    currentPage ? currentPage : 1
  );

  useEffect(() => {
    if (total !== paginationTotal) {
      setPaginationTotal(total);
    }

    if (pageSize !== internalPageSize) {
      setInternalPageSize(pageSize);
    }

    if (currentPage !== internalCurrentPage) {
      setInternalCurrentPage(currentPage);
    }
  }, [total, pageSize, currentPage]);

  const onPaginationChange: PaginationChangeHandler = (val) => {
    setInternalCurrentPage(val.pageIndex);
    onChange?.(val);
  };

  const onPrev = useCallback(() => {
    const newPage = Math.max(0, internalCurrentPage - 1);
    setInternalCurrentPage(newPage);
    onChange?.({ pageIndex: newPage, pageSize: pageSize });
  }, [onChange, internalCurrentPage, getValidCurrentPage]);

  const onNext = useCallback(() => {
    const newPage = Math.min(paginationTotal, internalCurrentPage + 1);
    setInternalCurrentPage(newPage);
    onChange?.({ pageIndex: newPage, pageSize: pageSize });
  }, [onChange, internalCurrentPage, getValidCurrentPage]);

  const pagerClass = {
    default: "pagination-pager",
    inactive: "pagination-pager-inactive",
    active: `text-${themeColor}-${primaryColorLevel} bg-${themeColor}-50 hover:bg-${themeColor}-50 dark:bg-${themeColor}-${primaryColorLevel} dark:text-gray-100`,
    disabled: "pagination-pager-disabled",
  };

  const paginationClass = classNames("pagination", className);

  return (
    <div className={paginationClass}>
      {displayTotal && <Total total={total} />}
      <Prev
        currentPage={internalCurrentPage}
        pagerClass={pagerClass}
        onPrev={onPrev}
      />
      <Pager
        onChange={onPaginationChange}
        pageCount={getInternalPageCount}
        currentPage={internalCurrentPage}
        pagerClass={pagerClass}
      />
      <Next
        currentPage={internalCurrentPage}
        pageCount={getInternalPageCount}
        pagerClass={pagerClass}
        onNext={onNext}
      />
    </div>
  );
};

export default Pagination;
