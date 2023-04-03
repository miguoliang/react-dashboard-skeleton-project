import React, {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import {
  Checkbox,
  Pagination,
  Select,
  Sorter,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "components/ui";
import TableRowSkeleton from "./loaders/TableRowSkeleton";
import Loading from "./Loading";
import { PageSizeOption } from "../../views/ui-components/navigation/Pagination/PageSize";
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
import { CheckboxProps } from "../ui/Checkbox/Checkbox";
import { PaginationChangeHandler } from "../ui/Pagination/Pagers";
import { Table as ReactTable } from "@tanstack/table-core/build/lib/types";
import { SelectChangeHandler } from "components/ui/Select/Select";

type IndeterminateCheckboxProps = Partial<{
  indeterminate: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  onIndeterminateCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
}> &
  Omit<CheckboxProps, "onChange">;

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
  const {
    indeterminate,
    onChange,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    ...rest
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    onCheckBoxChange?.(e);
    onIndeterminateCheckBoxChange?.(e);
  };

  return (
    <Checkbox
      className="mb-0"
      ref={ref}
      onChange={(_, e) => handleChange(e)}
      {...rest}
    />
  );
};

export type DataTableCheckBoxChangeHandler<T = any> = (
  checked: boolean,
  rows: Row<T> | Row<T>[]
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
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
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
          } as PageSizeOption)
      ),
    [pageSizes]
  );

  const handleCheckBoxChange: DataTableCheckBoxChangeHandler = (
    checked,
    row
  ) => {
    if (!loading) {
      onCheckBoxChange?.(checked, row);
    }
  };

  const handleIndeterminateCheckBoxChange: DataTableCheckBoxChangeHandler = (
    checked,
    rows
  ) => {
    if (!loading) {
      onIndeterminateCheckBoxChange?.(checked, rows);
    }
  };

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
            <IndeterminateCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              onIndeterminateCheckBoxChange={(e) => {
                handleIndeterminateCheckBoxChange(
                  e.target.checked,
                  table.getRowModel().rows
                );
              }}
            />
          ),
          cell: ({ row }: { row: Row<any> }) => (
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              onCheckBoxChange={(e) =>
                handleCheckBoxChange(e.target.checked, row.original)
              }
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
        <THead>
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
                          loading && "pointer-events-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
        </THead>
        {loading && data.length === 0 ? (
          <TableRowSkeleton
            columns={finalColumns.length}
            rows={pagingData.pageSize}
            avatarInColumns={skeletonAvatarColumns}
            avatarProps={skeletonAvatarProps}
          />
        ) : (
          <TBody>
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
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </TBody>
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
