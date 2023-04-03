import React, { useEffect, useMemo, useRef } from "react";
import { Avatar, Badge } from "components/ui";
import { DataTable } from "components/shared";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import { getProducts, setTableData } from "../store/dataSlice";
import {
  setSelectedProduct,
  toggleDeleteConfirmation,
} from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import ProductDeleteConfirmation from "./ProductDeleteConfirmation";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ResetMethods } from "components/shared/DataTable";
import { Product } from "../../../../mock/data/salesData";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { SelectChangeHandler } from "components/ui/Select/Select";
import { PageSizeOption } from "views/ui-components/navigation/Pagination/PageSize";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";

const inventoryStatusColor: {
  [key: number]: { label: string; dotClass: string; textClass: string };
} = {
  0: {
    label: "In Stock",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  1: {
    label: "Limited",
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  2: {
    label: "Out of Stock",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const ActionColumn = ({ row }: { row: Product }) => {
  const dispatch = useAppDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/app/sales/product-edit/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedProduct(row.id));
  };

  return (
    <div className="flex justify-end text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const ProductColumn = ({ row }: { row: Product }) => {
  const avatar = row.img ? (
    <Avatar src={row.img} />
  ) : (
    <Avatar icon={<FiPackage />} />
  );

  return (
    <div className="flex items-center">
      {avatar}
      <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
    </div>
  );
};

const ProductTable = () => {
  const tableRef = useRef<ResetMethods>(null);

  const dispatch = useAppDispatch();

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.salesProductList.data.tableData
  );

  const filterData = useAppSelector(
    (state) => state.salesProductList.data.filterData
  );

  const loading = useAppSelector(
    (state) => state.salesProductList.data.loading
  );

  const data = useAppSelector(
    (state) => state.salesProductList.data.productList
  );

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sort]);

  useEffect(() => {
    tableRef.current?.resetSorting();
  }, [filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const fetchData = () => {
    dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }));
  };

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (props) => {
          const row = props.row.original;
          return <ProductColumn row={row} />;
        },
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (props) => {
          const row = props.row.original;
          return <span className="capitalize">{row.category}</span>;
        },
      }),
      {
        header: "Quantity",
        accessorKey: "stock",
      },
      columnHelper.accessor("status", {
        header: "Status",
        cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center gap-2">
              <Badge className={inventoryStatusColor[status].dotClass} />
              <span
                className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
              >
                {inventoryStatusColor[status].label}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (props) => {
          const { price } = props.row.original;
          return <span>${price}</span>;
        },
      }),
      columnHelper.display({
        header: "",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
      }),
    ],
    []
  );

  const onPaginationChange: PaginationChangeHandler = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page.pageIndex;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange: SelectChangeHandler<PageSizeOption, false> = (
    value
  ) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort: SortingState) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
  };

  return (
    <>
      <DataTable
        ref={tableRef}
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
      <ProductDeleteConfirmation />
    </>
  );
};

export default ProductTable;
