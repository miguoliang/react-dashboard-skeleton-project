import React, { useMemo } from "react";
import { Avatar, Badge } from "components/ui";
import { DataTable } from "components/shared";
import { setTableData } from "../store/dataSlice";
import {
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { Trade } from "../../../../mock/data/cryptoData";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";
import { useAppDispatch } from "store/hooks";

export const statusColor: {
  [key: number]: { label: string; dotClass: string; textClass: string };
} = {
  0: {
    label: "Complete",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  1: {
    label: "Pending",
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  2: { label: "Canceled", dotClass: "bg-red-500", textClass: "text-red-500" },
};

const ActionIcon = ({ type }: { type: number }) => {
  switch (type) {
    case 0:
      return (
        <Avatar
          size="sm"
          className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
          icon={<HiOutlineArrowDown style={{ transform: "rotate(45deg)" }} />}
        />
      );
    case 1:
      return (
        <Avatar
          size="sm"
          className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
          icon={<HiOutlineArrowUp style={{ transform: "rotate(45deg)" }} />}
        />
      );
    case 2:
      return (
        <Avatar
          size="sm"
          className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
          icon={<HiOutlineSwitchHorizontal />}
        />
      );
    default:
      return <Avatar />;
  }
};

const OrderTable = ({
  data,
  loading,
  pagingData,
}: {
  data: Trade[];
  loading: boolean;
  pagingData: {
    sort: SortingState;
    pageSize: number;
    pageIndex: number;
    total: number;
  };
}) => {
  const dispatch = useAppDispatch();

  const columnHelper = createColumnHelper<Trade>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        header: "Action",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center gap-2">
              <div>
                <ActionIcon type={row.actionType} />
              </div>
              <span className="font-semibold heading-text whitespace-nowrap">
                {row.action}
              </span>
            </div>
          );
        },
      }),
      {
        header: "Date",
        accessorKey: "date",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs.unix(row.date).format("MM/DD/YYYY")}
            </div>
          );
        },
      },
      {
        header: "Price",
        accessorKey: "price",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.price} USD</span>;
        },
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span>
              {row.amount} {row.symbol}
            </span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
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
      },
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
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ size: "sm", className: "rounded-md" }}
      loading={loading}
      pagingData={pagingData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
    />
  );
};

export default OrderTable;
