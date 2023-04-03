import React, { ChangeEventHandler, useRef } from "react";
import { Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { getOrders, setTableData } from "../store/dataSlice";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "store/hooks";

const OrderTableSearch = () => {
  const dispatch = useAppDispatch();

  const searchInput = useRef<HTMLInputElement>(null);

  const tableData = useAppSelector(
    (state) => state.salesOrderList.data.tableData
  );

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val: string) {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data: any) => {
    dispatch(setTableData(data));
    dispatch(getOrders(data));
  };

  const onEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <Input
      ref={searchInput}
      className="lg:w-52"
      size="sm"
      placeholder="Search"
      prefix={<HiOutlineSearch className="text-lg" />}
      onChange={onEdit}
    />
  );
};

export default OrderTableSearch;
