import React, { useRef } from "react";
import { Button } from "components/ui";
import { getCustomers, setFilterData, setTableData } from "../store/dataSlice";
import CustomerTableSearch from "./CustomerTableSearch";
import CustomerTableFilter from "./CustomerTableFilter";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "store/hooks";

const CustomersTableTools = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const tableData = useAppSelector(
    (state) => state.crmCustomers.data.tableData
  );

  const handleInputChange = (val: string) => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  };

  const fetchData = (data: any) => {
    dispatch(setTableData(data));
    dispatch(getCustomers(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current!.value = "";
    dispatch(setFilterData({ status: "" }));
    fetchData(newTableData);
  };

  return (
    <div className="md:flex items-center justify-between">
      <div className="md:flex items-center gap-4">
        <CustomerTableSearch ref={inputRef} onInputChange={handleInputChange} />
        <CustomerTableFilter />
      </div>
      <div className="mb-4">
        <Button size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default CustomersTableTools;
