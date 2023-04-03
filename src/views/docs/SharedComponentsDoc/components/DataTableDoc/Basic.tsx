import React, { useEffect, useMemo, useState } from "react";
import { Button } from "components/ui";
import { DataTable } from "components/shared";
import axios from "axios";
import { PaginationChangeHandler } from "../../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../../components/ui/Select/Select";
import { PageSizeOption } from "../../../../ui-components/navigation/Pagination/PageSize";
import {
  CellContext,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { noop } from "lodash";

type DataType = { name: string; email: string };

const Basic = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
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

  const columnHelper = createColumnHelper<DataType>();

  const columns = useMemo(() => {
    return [
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
    ];
  }, []);

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
    fetchData().then(noop);
  }, [tableData.pageIndex, tableData.sort, tableData.pageSize]);

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagingData={tableData}
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
      onSort={handleSort}
    />
  );
};

export default Basic;
