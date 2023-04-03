import React, { useMemo, useState } from "react";
import { Table, Tr, Th, Td, THead, TBody } from "components/ui";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data10 } from "./data";

const Group = () => {
  const [data] = useState(() => data10);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        columns: [
          {
            header: "First Name",
            accessorKey: "firstName",
          },
          {
            header: "Last Name",
            accessorKey: "lastName",
          },
        ],
      },
      {
        header: "Info",
        columns: [
          {
            header: "Email",
            accessorKey: "email",
            width: 50,
          },
          {
            header: "Visits",
            accessorKey: "gender",
            width: 60,
          },
        ],
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};

export default Group;
