import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import { Pagination, Select, Sorter } from "components/ui";
import TableRowSkeleton from "./loaders/TableRowSkeleton";
import Loading from "./Loading";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PaginationChangeHandler } from "../ui/Pagination/Pagers";
import { Table as ReactTable } from "@tanstack/table-core/build/lib/types";
import { SelectChangeHandler } from "components/ui/Select/Select";
import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export type PageSizeOption = {
  value: number;
  label: string;
};

export type DataTableCheckBoxChangeHandler<T = any> = (
  checked: boolean,
  rows: Row<T> | Row<T>[],
) => void;

export type DataTableProps = {
  columns: ColumnDef<any, any>[];
  data: any[];
  loading: boolean;
  onCheckBoxChange?: DataTableCheckBoxChangeHandler;
  onIndeterminateCheckBoxChange?: DataTableCheckBoxChangeHandler;
  onPaginationChange: PaginationChangeHandler;
  onSelectChange: SelectChangeHandler<PageSizeOption>;
  onSort: (sort: SortingState) => void;
  pageSizes?: number[];
  selectable?: boolean;
  skeletonAvatarColumns?: number[];
  skeletonAvatarProps?: object;
  pagingData: {
    total: number;
    pageIndex: number;
    pageSize: number;
    query?: string;
    sort?: SortingState;
  };
};

export interface ResetMethods {
  resetSorting: () => void;
  resetSelected: () => void;
}

const DataTable = forwardRef<ResetMethods, DataTableProps>((props, ref) => {
  const {
    skeletonAvatarColumns,
    columns: columnsProp = [],
    data = [],
    loading = false,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes = [10, 25, 50, 100],
    selectable = false,
    skeletonAvatarProps,
    pagingData = {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    },
  } = props;

  const { pageSize, pageIndex, total } = pagingData;

  const [sorting, setSorting] = useState<SortingState>([]);

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map(
        (number) =>
          ({
            value: number,
            label: `${number} / page`,
          } as PageSizeOption),
      ),
    [pageSizes],
  );

  const handlePaginationChange: PaginationChangeHandler = (page) => {
    if (!loading) {
      onPaginationChange(page);
    }
  };

  const handleSelectChange: SelectChangeHandler<PageSizeOption> = (option) => {
    if (!loading) {
      onSelectChange(option);
    }
  };

  useEffect(() => {
    onSort(sorting);
  }, [sorting]);

  const finalColumns = useMemo(() => {
    const columns = columnsProp;

    if (selectable) {
      return [
        {
          id: "select",
          header: ({ table }: { table: ReactTable<any> }) => (
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          ),
          cell: ({ row }: { row: Row<any> }) => (
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
            />
          ),
        },
        ...columns,
      ];
    }
    return columns;
  }, [columnsProp, selectable]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    onSortingChange: (updaterOrValue) => setSorting(updaterOrValue),
    state: {
      sorting,
    },
  });

  const resetSorting = () => {
    table.resetSorting();
  };

  const resetSelected = () => {
    table.toggleAllRowsSelected(false);
  };

  useImperativeHandle(ref, () => ({
    resetSorting,
    resetSelected,
  }));

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames(
                          header.column.getCanSort() &&
                            "cursor-pointer select-none point",
                          loading && "pointer-events-none",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <Sorter sort={header.column.getIsSorted()} />
                        )}
                      </div>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        {loading && data.length === 0 ? (
          <TableRowSkeleton
            columns={finalColumns.length}
            rows={pagingData.pageSize}
            avatarInColumns={skeletonAvatarColumns}
            avatarProps={skeletonAvatarProps}
          />
        ) : (
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        )}
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={pageSize}
          currentPage={pageIndex}
          total={total}
          onChange={handlePaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <Select<PageSizeOption>
            size="sm"
            menuPlacement="top"
            isSearchable={false}
            value={pageSizeOption.filter((option) => option.value === pageSize)}
            options={pageSizeOption}
            onChange={handleSelectChange}
          />
        </div>
      </div>
    </Loading>
  );
});

export default DataTable;
