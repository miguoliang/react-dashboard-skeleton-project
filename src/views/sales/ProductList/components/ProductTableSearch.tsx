import React, { ChangeEventHandler, useRef } from "react";
import { Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { getProducts, setTableData } from "../store/dataSlice";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Product } from "mock/data/salesData";

const ProductTableSearch = () => {
  const dispatch = useAppDispatch();

  const searchInput = useRef<HTMLInputElement>(null);

  const tableData = useAppSelector(
    (state) => state.salesProductList.data.tableData
  );

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val: string) {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data: Product[]) => {
    dispatch(setTableData(data));
    dispatch(getProducts(data));
  };

  const onEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <Input
      ref={searchInput}
      className="max-w-md md:w-52 md:mb-0 mb-4"
      size="sm"
      placeholder="Search product"
      prefix={<HiOutlineSearch className="text-lg" />}
      onChange={onEdit}
    />
  );
};

export default ProductTableSearch;
