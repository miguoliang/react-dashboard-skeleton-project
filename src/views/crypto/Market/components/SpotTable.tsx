import React, { useMemo } from "react";
import classNames from "classnames";
import { DataTable } from "components/shared";
import { setTableData } from "../store/dataSlice";
import ActionColumn from "./ActionColumn";
import growShrinkColor from "utils/growShrinkColor";
import cloneDeep from "lodash/cloneDeep";
import NumberFormat from "react-number-format";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { Spot } from "../../../../mock/data/cryptoData";
import { DataTableProps } from "../../../../components/shared/DataTable";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";
import { useAppDispatch } from "store/hooks";

const AllTable = ({
  data,
  loading,
  tableData,
}: {
  data: Spot[];
  loading: boolean;
  tableData: DataTableProps["pagingData"];
}) => {
  const dispatch = useAppDispatch();

  const columnHelper = createColumnHelper<Spot>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (props) => {
          const { name } = props.row.original;
          return <span className="font-bold heading-text">{name}</span>;
        },
      }),
      {
        header: "Price",
        accessorKey: "price",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span>
              <NumberFormat
                displayType="text"
                value={(Math.round(row.amount * 100) / 100).toFixed(2)}
                thousandSeparator={true}
              />
              <span> / </span>
              <NumberFormat
                displayType="text"
                value={(Math.round(row.price * 100) / 100).toFixed(2)}
                prefix={"$"}
                thousandSeparator={true}
              />
            </span>
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
        header: "24h High /24h Low",
        accessorKey: "high",
        cell: (props) => {
          const { high, low } = props.row.original;
          return (
            <span>
              {high} / {low}
            </span>
          );
        },
      },
      {
        header: "24h Volumn",
        accessorKey: "volumn",
        cell: (props) => {
          const { volume } = props.row.original;
          return (
            <NumberFormat
              displayType="text"
              value={(Math.round(volume * 100) / 100).toFixed(2)}
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: "24h Turnover",
        accessorKey: "turnOver",
        cell: (props) => {
          const { turnOver } = props.row.original;
          return <span>${turnOver}M</span>;
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
      loading={loading}
      pagingData={tableData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
    />
  );
};

export default AllTable;
