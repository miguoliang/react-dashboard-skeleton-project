import React, { useMemo, useState } from "react";
import { Table, TBody, Td, Th, THead, Tr } from "components/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";
import { data10 } from "./data";

type DataType = {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  gender: string;
  dragHandleProps?: DraggableProvidedDragHandleProps;
};

const DragAndDrop = () => {
  const [data, setData] = useState<DataType[]>(data10);

  const reorderData = (startIndex: number, endIndex: number) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setData(newData);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    reorderData(source.index, destination.index);
  };

  const columnHelper = createColumnHelper<DataType>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "dragger",
        header: "",
        cell: (props) => (
          <span {...props.row.original.dragHandleProps}>
            <MdDragIndicator />
          </span>
        ),
      }),
      columnHelper.accessor("firstName", { header: "First Name" }),
      columnHelper.accessor("lastName", { header: "Last Name" }),
      columnHelper.accessor("email", { header: "Email" }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Note: Drag & drop will not work in React.StrictMode(Development)
  return (
    <Table className="w-full">
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="table-body">
          {(provided) => (
            <TBody ref={provided.innerRef} {...provided.droppableProps}>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Draggable
                    draggableId={row.id}
                    key={row.id}
                    index={row.index}
                  >
                    {(provided, snapshot) => {
                      const { style } = provided.draggableProps;
                      return (
                        <Tr
                          ref={provided.innerRef}
                          className={snapshot.isDragging ? "table" : ""}
                          style={style}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </TBody>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  );
};

export default DragAndDrop;
