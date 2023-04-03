import React, { useEffect, useMemo, useState } from "react";
import { Button } from "components/ui";
import { DataTable } from "components/shared";
import axios from "axios";
import { noop } from "lodash";
import {
  CellContext,
  createColumnHelper,
  Row,
  SortingState,
} from "@tanstack/react-table";
import { DataTableCheckBoxChangeHandler } from "../../../../../components/shared/DataTable";
import { SelectChangeHandler } from "../../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../../ui-components/navigation/Pagination/PageSize";
import { PaginationChangeHandler } from "../../../../../components/ui/Pagination/Pagers";

type DataType = { name: string; email: string };

const Checkable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: "",
    sort: [] as SortingState,
  });

  const handleAction = (cellProps: CellContext<DataType, any>) => {
    console.log("Action clicked", cellProps);
  };

  const handleBatchAction = () => {
    console.log("selectedRows", selectedRows);
  };

  const columnHelper = createColumnHelper<DataType>();

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      columnHelper.display({
        header: "",
        id: "action",
        cell: (props) => (
          <Button size="xs" onClick={() => handleAction(props)}>
            Action
          </Button>
        ),
      }),
    ],
    []
  );

  const handlePaginationChange: PaginationChangeHandler = (page) => {
    setTableData((prevData) => ({ ...prevData, ...page }));
  };

  const handleSelectChange: SelectChangeHandler<PageSizeOption> = (
    pageSize
  ) => {
    setTableData((prevData) => ({ ...prevData, ...pageSize }));
  };

  const handleSort = (sort: SortingState) => {
    setTableData((prevData) => ({
      ...prevData,
      ...{ sort },
    }));
  };

  const handleRowSelect: DataTableCheckBoxChangeHandler<DataType> = (
    checked,
    row
  ) => {
    const singleRow = row as Row<DataType>;
    if (checked) {
      setSelectedRows((prevData) => {
        if (!prevData.includes(singleRow.original.name)) {
          return [...prevData, ...[singleRow.original.name]];
        }
        return prevData;
      });
    } else {
      setSelectedRows((prevData) => {
        if (prevData.includes(singleRow.original.name)) {
          return prevData.filter((id) => id !== singleRow.original.name);
        }
        return prevData;
      });
    }
  };

  const handleAllRowSelect: DataTableCheckBoxChangeHandler = (
    checked,
    rows
  ) => {
    const multipleRows = rows as Row<DataType>[];
    if (checked) {
      const originalRows = multipleRows.map((row) => row.original);
      const selectedIds: string[] = [];
      originalRows.forEach((row) => {
        selectedIds.push(row.name);
      });
      setSelectedRows(selectedIds);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.post("/api/crm/customers", tableData);
      if (response.data) {
        setData(response.data.data);
        setLoading(false);
        setTableData((prevData) => ({
          ...prevData,
          ...{ total: response.data.total },
        }));
      }
    };
    fetchData().then(noop);
  }, [tableData.pageIndex, tableData.sort, tableData.pageSize]);

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="flex justify-end mb-4">
          <Button size="sm" variant="solid" onClick={handleBatchAction}>
            Batch Action
          </Button>
        </div>
      )}
      <DataTable
        selectable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handleSelectChange}
        onSort={handleSort}
        onCheckBoxChange={handleRowSelect}
        onIndeterminateCheckBoxChange={handleAllRowSelect}
      />
    </>
  );
};

export default Checkable;
