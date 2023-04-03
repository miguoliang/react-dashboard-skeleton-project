import React, { useMemo } from "react";
import {
  Avatar,
  Button,
  Card,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiPackage } from "react-icons/fi";

const ProductColumn = ({ row }: { row: TopProduct }) => {
  const avatar = row.img ? (
    <Avatar src={row.img} />
  ) : (
    <Avatar icon={<FiPackage />} />
  );

  return (
    <div className="flex items-center gap-2">
      {avatar}
      <span className="font-semibold">{row.name}</span>
    </div>
  );
};

type TopProduct = {
  id: number;
  name: string;
  sold: number;
  img: string;
};

const TopProduct = ({
  data = [],
  className,
}: {
  data: TopProduct[];
  className?: string;
}) => {
  const columnHelper = createColumnHelper<TopProduct>();
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
        header: "Sold",
        accessorKey: "sold",
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
      <div className="flex items-center justify-between mb-4">
        <h4>Top Selling</h4>
        <Button size="sm">View Products</Button>
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

export default TopProduct;
