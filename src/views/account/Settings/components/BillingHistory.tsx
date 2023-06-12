import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import { BillingHistory as BillingHistoryData } from "../../../../mock/data/accountData";
import { Badge, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const statusColor: Record<"paid" | "pending", string> = {
  paid: "bg-emerald-500",
  pending: "bg-amber-400",
};

const columnHelper = createColumnHelper<BillingHistoryData>();

const columns = [
  columnHelper.accessor("id", {
    header: "Reference",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div>
          <span className="cursor-pointer">{row.id}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("item", {
    header: "Product",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status]} />
          <span className="ml-2 rtl:mr-2 capitalize">{row.status}</span>
        </div>
      );
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
      return (
        <div className="flex items-center">
          <NumberFormat
            displayType="text"
            value={(Math.round(row.amount * 100) / 100).toFixed(2)}
            prefix={"$"}
            thousandSeparator={true}
          />
        </div>
      );
    },
  }),
];

const BillingHistory = ({
  data = [],
  ...rest
}: {
  data?: BillingHistoryData[];
} & JSX.IntrinsicElements["div"]) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div {...rest}>
      <Table>
        <Thead className="!bg-transparent">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => {
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
      </Table>
    </div>
  );
};

export default BillingHistory;
