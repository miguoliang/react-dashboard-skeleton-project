import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Badge, Tooltip } from "components/ui";
import { DataTable } from "components/shared";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import NumberFormat from "react-number-format";
import { getOrders, setTableData } from "../store/dataSlice";
import {
  addRowItem,
  removeRowItem,
  setDeleteMode,
  setSelectedRow,
  setSelectedRows,
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { createColumnHelper, Row, SortingState } from "@tanstack/react-table";
import { Order } from "../../../../mock/data/salesData";
import {
  DataTableCheckBoxChangeHandler,
  ResetMethods,
} from "../../../../components/shared/DataTable";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";
import { isArray } from "lodash";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";

const orderStatusColor: {
  [key: number]: { label: string; dotClass: string; textClass: string };
} = {
  0: {
    label: "Paid",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  1: {
    label: "Pending",
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  2: { label: "Failed", dotClass: "bg-red-500", textClass: "text-red-500" },
};

const PaymentMethodImage = ({
  paymentMethod,
  className,
}: {
  paymentMethod: string;
  className: string;
}) => {
  switch (paymentMethod) {
    case "visa":
      return (
        <img
          className={className}
          src="/img/others/img-8.png"
          alt={paymentMethod}
        />
      );
    case "master":
      return (
        <img
          className={className}
          src="/img/others/img-9.png"
          alt={paymentMethod}
        />
      );
    case "paypal":
      return (
        <img
          className={className}
          src="/img/others/img-10.png"
          alt={paymentMethod}
        />
      );
    default:
      return <></>;
  }
};

const OrderColumn = ({ row }: { row: Order }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onView = useCallback(() => {
    navigate(`/app/sales/order-details/${row.id}`);
  }, [navigate, row]);

  return (
    <span
      className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
      onClick={onView}
    >
      #{row.id}
    </span>
  );
};

const ActionColumn = ({ row }: { row: Order }) => {
  const dispatch = useAppDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onDelete = () => {
    dispatch(setDeleteMode("single"));
    dispatch(setSelectedRow([row.id]));
  };

  const onView = useCallback(() => {
    navigate(`/app/sales/order-details/${row.id}`);
  }, [navigate, row]);

  return (
    <div className="flex justify-end text-lg">
      <Tooltip title="View">
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <HiOutlineEye />
        </span>
      </Tooltip>
      <Tooltip title="Delete">
        <span
          className="cursor-pointer p-2 hover:text-red-500"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      </Tooltip>
    </div>
  );
};

const OrdersTable = () => {
  const tableRef = useRef<ResetMethods>(null);

  const dispatch = useAppDispatch();

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.salesOrderList.data.tableData
  );
  const loading = useAppSelector((state) => state.salesOrderList.data.loading);

  const data = useAppSelector((state) => state.salesOrderList.data.orderList);

  const fetchData = useCallback(() => {
    dispatch(getOrders({ pageIndex, pageSize, sort, query }));
  }, [dispatch, pageIndex, pageSize, sort, query]);

  useEffect(() => {
    dispatch(setSelectedRows([]));
    fetchData();
  }, [dispatch, fetchData, pageIndex, pageSize, sort]);

  useEffect(() => {
    tableRef.current?.resetSelected();
  }, [data]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const columnHelper = createColumnHelper<Order>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Order",
        cell: (props) => <OrderColumn row={props.row.original} />,
      }),
      {
        header: "Date",
        accessorKey: "date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{dayjs.unix(row.date).format("DD/MM/YYYY")}</span>;
        },
      },
      {
        header: "Customer",
        accessorKey: "customer",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={orderStatusColor[status].dotClass} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
              >
                {orderStatusColor[status].label}
              </span>
            </div>
          );
        },
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMehod",
        cell: (props) => {
          const { paymentMethod, paymentIdentifier } = props.row.original;
          return (
            <span className="flex items-center">
              <PaymentMethodImage
                className="max-h-[20px]"
                paymentMethod={paymentMethod}
              />
              <span className="ltr:ml-2 rtl:mr-2">{paymentIdentifier}</span>
            </span>
          );
        },
      },
      {
        header: "Total",
        accessorKey: "totalAmount",
        cell: (props) => {
          const { totalAmount } = props.row.original;
          return (
            <NumberFormat
              displayType="text"
              value={(Math.round(totalAmount * 100) / 100).toFixed(2)}
              prefix={"$"}
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: "",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
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
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort: SortingState) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
  };

  const onRowSelect: DataTableCheckBoxChangeHandler<Order> = (checked, row) => {
    if (checked) {
      if (isArray(row)) {
        dispatch(addRowItem(row.map((r) => r.id)));
      } else {
        dispatch(addRowItem(row.id));
      }
    } else {
      if (isArray(row)) {
        dispatch(removeRowItem(row.map((r) => r.id)));
      } else {
        dispatch(removeRowItem(row.id));
      }
    }
  };

  const onAllRowSelect = useCallback(
    (checked: boolean, rows: Row<Order> | Row<Order>[]) => {
      if (checked) {
        if (isArray(rows)) {
          const originalRows = rows.map((row) => row.original);
          const selectedIds: string[] = [];
          originalRows.forEach((row) => {
            selectedIds.push(row.id);
          });
          dispatch(setSelectedRows(selectedIds));
        } else {
          dispatch(setSelectedRows([rows.original.id]));
        }
      } else {
        dispatch(setSelectedRows([]));
      }
    },
    [dispatch]
  );

  return (
    <DataTable
      ref={tableRef}
      columns={columns}
      data={data}
      loading={loading}
      pagingData={tableData}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
      onCheckBoxChange={onRowSelect}
      onIndeterminateCheckBoxChange={onAllRowSelect}
      selectable
    />
  );
};

export default OrdersTable;
