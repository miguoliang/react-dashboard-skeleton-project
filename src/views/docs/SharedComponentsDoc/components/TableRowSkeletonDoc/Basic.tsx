import React, { useState } from "react";
import { Switcher, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import { TableRowSkeleton } from "components/shared";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
];

const data = [
  {
    firstName: "Maria",
    lastName: "Anders",
    age: 24,
  },
  {
    firstName: "Francisco",
    lastName: "Chang",
    age: 9,
  },
  {
    firstName: "Roland",
    lastName: "Mendel",
    age: 1,
  },
  {
    firstName: "Helen",
    lastName: "Bennett",
    age: 43,
  },
  {
    firstName: "Yoshi ",
    lastName: "Tannamuri",
    age: 37,
  },
];

const Basic = () => {
  const [isLoading, setIsLoading] = useState(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex items-center mb-4 gap-2">
        <span>Loading State: </span>
        <Switcher
          checked={isLoading}
          onChange={(checked) => setIsLoading(!checked)}
        />
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
        {isLoading ? (
          <TableRowSkeleton columns={3} rows={5} />
        ) : (
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
        )}
      </Table>
    </>
  );
};

export default Basic;
