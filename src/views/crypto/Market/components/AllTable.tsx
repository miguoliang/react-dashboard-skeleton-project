import React, { useMemo } from "react";
import classNames from "classnames";
import { Avatar } from "components/ui";
import { DataTable } from "components/shared";
import { setTableData } from "../store/dataSlice";
import ActionColumn from "./ActionColumn";
import growShrinkColor from "utils/growShrinkColor";
import cloneDeep from "lodash/cloneDeep";
import NumberFormat from "react-number-format";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { Market } from "mock/data/cryptoData";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";
import { useAppDispatch } from "store/hooks";
import { DataTableProps } from "components/shared/DataTable";

const AllTable = ({
  data,
  loading,
  tableData,
}: {
  data: Market[];
  loading: boolean;
  tableData: DataTableProps["pagingData"];
}) => {
  const dispatch = useAppDispatch();

  const columnHelper = createColumnHelper<Market>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (props) => {
          const { img, symbol, name } = props.row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar src={img} size="sm" className="!bg-transparent" />
              <span className="font-bold heading-text">{symbol}</span>
              <span>{name}</span>
            </div>
          );
        },
      }),
      {
        header: "Price",
        accessorKey: "price",
        cell: (props) => {
          const row = props.row.original;
          return (
            <NumberFormat
              displayType="text"
              value={(Math.round(row.price * 100) / 100).toFixed(2)}
              suffix={" USD"}
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: "24h Change",
        accessorKey: "change",
        cell: (props) => {
          const { change } = props.row.original;
          return (
            <span
              className={classNames(
                "font-semibold",
                growShrinkColor(change, "text")
              )}
            >
              {change > 0 && "+"}
              {change}%
            </span>
          );
        },
      },
      {
        header: "24h Volumn",
        accessorKey: "volumn",
        cell: (props) => {
          const { volume } = props.row.original;
          return <span>{volume}M</span>;
        },
      },
      {
        header: "Market Cap",
        accessorKey: "marketCap",
        cell: (props) => {
          const { marketCap } = props.row.original;
          return <span>${marketCap}M</span>;
        },
      },
      {
        header: "",
        id: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    []
  );

  const onPaginationChange: PaginationChangeHandler = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page.pageIndex;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange: SelectChangeHandler<PageSizeOption> = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value?.value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort: SortingState) => {
    const newTableData = cloneDeep(tableData);
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
      pagingData={tableData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
    />
  );
};

export default AllTable;
