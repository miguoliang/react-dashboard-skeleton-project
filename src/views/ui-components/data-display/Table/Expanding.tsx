import React, { useMemo, useState } from "react";
import { Table, TBody, Td, Th, THead, Tr } from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dataWithSubRows, SubRow } from "./data";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";

const columnHelper = createColumnHelper<(typeof dataWithSubRows)[number]>();

function Expanding() {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "expander",
        header: ({ table }) => {
          return (
            <button
              className="text-xl"
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <HiOutlineMinusCircle />
              ) : (
                <HiOutlinePlusCircle />
              )}
            </button>
          );
        },
        cell: ({ row, getValue }) => {
          return (
            <>
              {row.getCanExpand() ? (
                <button
                  className="text-xl"
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                  }}
                >
                  {row.getIsExpanded() ? (
                    <HiOutlineMinusCircle />
                  ) : (
                    <HiOutlinePlusCircle />
                  )}
                </button>
              ) : null}
              {getValue()}
            </>
          );
        },
      }),
      columnHelper.accessor("firstName", {
        header: "First Name",
      }),
      columnHelper.accessor("lastName", {
        header: "Last Name",
      }),
      columnHelper.accessor("age", {
        header: "Age",
      }),
      columnHelper.accessor("visits", {
        header: "Visits",
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
      columnHelper.accessor("progress", {
        header: "Profile Progress",
      }),
    ],
    []
  );

  const [data] = useState(() => dataWithSubRows);
  const [expanded, setExpanded] = useState({});

  const table = useReactTable<SubRow>({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
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
    </>
  );
}

export default Expanding;
