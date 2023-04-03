import React, { useCallback, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import { Order } from "../../../../mock/data/salesData";

const orderStatusColor: Record<
  number,
  {
    label: string;
    dotClass: string;
    textClass: string;
  }
> = {
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

const columnHelper = createColumnHelper<Order>();

const LatestOrder = ({
  data = [],
  className,
}: {
  data: Order[];
  className?: string;
}) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Order",
        cell: (props) => <OrderColumn row={props.row.original} />,
      }),
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
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <h4>Latest Orders</h4>
        <Button size="sm">View Orders</Button>
      </div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => {
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
      </Table>
    </Card>
  );
};

export default LatestOrder;
