import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Button, Input } from "components/ui";
import { DataTable } from "components/shared";
import debounce from "lodash/debounce";
import axios from "axios";
import {
  CellContext,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { SelectChangeHandler } from "../../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../../ui-components/navigation/Pagination/PageSize";
import { PaginationChangeHandler } from "../../../../../components/ui/Pagination/Pagers";

const Query = () => {
  const [data, setData] = useState<{ name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: "",
    sort: [] as SortingState,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val?: string) {
    if (typeof val === "string" && (val.length > 1 || val.length === 0)) {
      setTableData((prevData) => ({
        ...prevData,
        ...{ query: val, pageIndex: 1 },
      }));
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    debounceFn(e.target.value);
  };

  const handleAction = (
    cellProps: CellContext<{ name: string; email: string }, any>
  ) => {
    console.log("Action clicked", cellProps);
  };

  const columnHelper = createColumnHelper<{ name: string; email: string }>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
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
  ];

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
    fetchData();
  }, [
    tableData.pageIndex,
    tableData.sort,
    tableData.pageSize,
    tableData.query,
  ]);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Input
          ref={inputRef}
          placeholder="Search..."
          size="sm"
          className="lg:w-52"
          onChange={handleChange}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={handlePaginationChange}
        onSelectChange={handleSelectChange}
        onSort={handleSort}
      />
    </>
  );
};

export default Query;
