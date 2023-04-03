import React, { Fragment, useMemo } from "react";
import { AdaptableCard } from "components/shared";
import { Avatar, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import NumberFormat from "react-number-format";
import isLastChild from "utils/isLastChild";
import { OrderDetailsProduct } from "../../../../mock/data/salesData";

const ProductColumn = ({ row }: { row: OrderDetailsProduct }) => {
  return (
    <div className="flex">
      <Avatar size={90} src={row.img} />
      <div className="ltr:ml-2 rtl:mr-2">
        <h6 className="mb-2">{row.name}</h6>
        {Object.keys(row.details).map((key, i) => (
          <div className="mb-1" key={key + i}>
            <span className="capitalize">{key}: </span>
            {row.details[key].map((item, j) => (
              <Fragment key={item + j}>
                <span className="font-semibold">{item}</span>
                {!isLastChild(row.details[key], j) && <span>, </span>}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceAmount = ({ amount }: { amount: number }) => {
  return (
    <NumberFormat
      displayType="text"
      value={(Math.round(amount * 100) / 100).toFixed(2)}
      prefix={"$"}
      thousandSeparator={true}
    />
  );
};

const OrderProducts = ({ data }: { data: OrderDetailsProduct[] }) => {
  const columnHelper = createColumnHelper<OrderDetailsProduct>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Product",
        cell: (props) => {
          const row = props.row.original;
          return <ProductColumn row={row} />;
        },
      }),
      {
        header: "Price",
        accessorKey: "price",
        cell: (props) => {
          const row = props.row.original;
          return <PriceAmount amount={row.price} />;
        },
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: (props) => {
          const row = props.row.original;
          return <PriceAmount amount={row.price} />;
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
    <AdaptableCard className="mb-4">
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
    </AdaptableCard>
  );
};

export default OrderProducts;
