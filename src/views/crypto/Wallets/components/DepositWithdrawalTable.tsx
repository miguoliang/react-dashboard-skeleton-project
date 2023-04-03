import React, { useMemo } from "react";
import { Badge } from "components/ui";
import { DataTable } from "components/shared";
import { setTableData } from "../store/dataSlice";
import { statusColor } from "./OrderTable";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { useAppDispatch } from "store/hooks";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { Deposit } from "mock/data/cryptoData";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";

const DepositWithdrawalTable = ({
  data,
  loading,
  pagingData,
}: {
  data: Deposit[];
  loading: boolean;
  pagingData: {
    pageIndex: number;
    pageSize: number;
    sort: SortingState;
    total: number;
  };
}) => {
  const dispatch = useAppDispatch();

  const columnHelper = createColumnHelper<Deposit>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Transaction Id",
        cell: (props) => {
          const row = props.row.original;
          return <span>TxID-{row.id}</span>;
        },
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.date).format("MM/DD/YYYY")}
            </div>
          );
        },
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.amount} USD</span>;
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center gap-2">
              <Badge className={statusColor[status].dotClass} />
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
              >
                {statusColor[status].label}
              </span>
            </div>
          );
        },
      }),
    ],
    []
  );

  const onPaginationChange: PaginationChangeHandler = (page) => {
    const newTableData = cloneDeep(pagingData);
    newTableData.pageIndex = page.pageIndex;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange: SelectChangeHandler<PageSizeOption> = (value) => {
    const newTableData = cloneDeep(pagingData);
    newTableData.pageSize = Number(value?.value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort: SortingState) => {
    const newTableData = cloneDeep(pagingData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagingData={pagingData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
    />
  );
};

export default DepositWithdrawalTable;
