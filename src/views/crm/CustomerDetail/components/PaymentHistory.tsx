import React from "react";
import { Badge, Sorter, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import { OrderHistory } from "mock/data/usersData";
import { useAppSelector } from "store/hooks";

const {} = Table;

const statusColor: {
  [key: string]: string;
} = {
  paid: "bg-emerald-500",
  pending: "bg-amber-400",
};

const columnHelper = createColumnHelper<OrderHistory>();

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

const PaymentHistory = () => {
  const data = useAppSelector(
    (state) => state.crmCustomerDetails.data.paymentHistoryData
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mb-8">
      <h6 className="mb-4">Payment History</h6>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {<Sorter sort={header.column.getIsSorted()} />}
                      </div>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
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
      </Table>
    </div>
  );
};

export default PaymentHistory;
