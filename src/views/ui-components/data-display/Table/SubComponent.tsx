import React, { Fragment, useMemo } from "react";
import { Table, TBody, Td, Th, THead, Tr } from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { dataWithSubRows, SubRow } from "./data";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

function ReactTable({
  renderRowSubComponent,
  getRowCanExpand,
}: {
  renderRowSubComponent: ({ row }: { row: Row<SubRow> }) => JSX.Element;
  getRowCanExpand: (row: Row<any>) => boolean;
}) {
  const columnHelper = createColumnHelper<SubRow>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        // Make an expander cell
        header: () => null, // No header
        id: "expander", // It needs an ID
        cell: ({ row }) => (
          <>
            {row.getCanExpand() ? (
              <button
                className="text-lg"
                {...{ onClick: row.getToggleExpandedHandler() }}
              >
                {row.getIsExpanded() ? (
                  <HiOutlineChevronDown />
                ) : (
                  <HiOutlineChevronRight />
                )}
              </button>
            ) : null}
          </>
        ),
      }),
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
      {
        header: "Visits",
        accessorKey: "visits",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Profile Progress",
        accessorKey: "progress",
      },
    ],
    []
  );

  const table = useReactTable({
    data: dataWithSubRows,
    columns,
    getRowCanExpand,
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
              <Fragment key={row.id}>
                <Tr>
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </Tr>
                {row.getIsExpanded() && (
                  <Tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <Td colSpan={row.getVisibleCells().length}>
                      {renderRowSubComponent({ row })}
                    </Td>
                  </Tr>
                )}
              </Fragment>
            );
          })}
        </TBody>
      </Table>
    </>
  );
}

const renderSubComponent = ({ row }: { row: Row<any> }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};

const SubComponent = () => {
  return (
    <ReactTable
      renderRowSubComponent={renderSubComponent}
      getRowCanExpand={() => true}
    />
  );
};

export default SubComponent;
