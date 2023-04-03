import React, { useCallback, useEffect, useMemo } from "react";
import { Avatar, Badge } from "components/ui";
import { DataTable } from "components/shared";
import { getCustomers, setTableData } from "../store/dataSlice";
import { setDrawerOpen, setSelectedCustomer } from "../store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import CustomerEditDialog from "./CustomerEditDialog";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { UserDetail } from "../../../../mock/data/usersData";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PageSizeOption } from "../../../ui-components/navigation/Pagination/PageSize";
import { PaginationChangeHandler } from "../../../../components/ui/Pagination/Pagers";
import { SelectChangeHandler } from "../../../../components/ui/Select/Select";

const statusColor: {
  [key: string]: string;
} = {
  active: "bg-emerald-500",
  blocked: "bg-red-500",
};

const ActionColumn = ({ row }: { row: UserDetail }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setDrawerOpen());
    dispatch(setSelectedCustomer(row));
  };

  return (
    <div
      className={`${textTheme} cursor-pointer select-none font-semibold`}
      onClick={onEdit}
    >
      Edit
    </div>
  );
};

const NameColumn = ({ row }: { row: UserDetail }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      <Avatar size={28} shape="circle" src={row.img} />
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/crm/customer-details?id=${row.id}`}
      >
        {row.name}
      </Link>
    </div>
  );
};

const columnHelper = createColumnHelper<UserDetail>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (props) => {
      const row = props.row.original;
      return <NameColumn row={row} />;
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status]} />
          <span className="ml-2 rtl:mr-2 capitalize">{row.status}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("lastOnline", {
    header: "Last online",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          {dayjs.unix(row.lastOnline).format("MM/DD/YYYY")}
        </div>
      );
    },
  }),
  columnHelper.display({
    header: "",
    id: "action",
    cell: (props) => <ActionColumn row={props.row.original} />,
  }),
];

const Customers = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.crmCustomers.data.customerList);
  const loading = useAppSelector((state) => state.crmCustomers.data.loading);
  const filterData = useAppSelector(
    (state) => state.crmCustomers.data.filterData
  );

  const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    (state) => state.crmCustomers.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }));
  }, [pageIndex, pageSize, sort, query, filterData, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, filterData]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const onPaginationChange: PaginationChangeHandler = ({ pageIndex }) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = pageIndex;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange: SelectChangeHandler<PageSizeOption> = (value) => {
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
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ width: 28, height: 28 }}
        loading={loading}
        pagingData={{ pageIndex, pageSize, sort, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
      <CustomerEditDialog />
    </>
  );
};

export default Customers;
