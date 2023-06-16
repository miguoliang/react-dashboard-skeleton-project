import { useEffect, useState } from "react";
import { apiGetDataSources } from "services/DataSourceService";
import { DataSource } from "models/data-source";
import { Pagination } from "components/ui";
import { PaginationResponse } from "models/pagination";
import dayjs from "dayjs";
import { ActionLink, Loading } from "components/shared";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { Table, Tbody, Td, Th, Thead, Tr, useBoolean } from "@chakra-ui/react";
import DatePicker from "react-date-picker";
import { HiOutlineCalendar } from "react-icons/hi";

const DataSourceList = () => {
  const [loading, setLoading] = useBoolean();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dataSourceList, setDataSourceList] =
    useState<PaginationResponse<DataSource> | null>(null);

  useEffect(() => {
    setLoading.on();
    apiGetDataSources(selectedDate, { page: currentPage - 1 })
      .then((res) => {
        setDataSourceList(res.data);
      })
      .finally(() => {
        setLoading.off();
      });
  }, [currentPage, selectedDate]);

  return (
    <Loading loading={loading} type="cover" className="h-full">
      <div className="h-full flex flex-col">
        <div className="flex items-center mb-4 flex-shrink-0">
          <span className="flex-shrink-0 mr-4">日期：</span>
          <DatePicker
            className={"w-[180px]"}
            value={selectedDate}
            locale={"en-US"}
            dayPlaceholder={""}
            monthPlaceholder={""}
            yearPlaceholder={""}
            maxDetail={"month"}
            minDetail={"year"}
            calendarIcon={
              <HiOutlineCalendar size={18} className={"text-gray-400"} />
            }
            clearIcon={null}
            format={"y-M-d"}
            prev2Label={null}
            next2Label={null}
            onChange={(date) => {
              setSelectedDate(date as Date);
              setCurrentPage(1);
            }}
          />
        </div>
        <Table className="flex-grow">
          <Thead className="leading-10">
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Created at</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSourceList?.content.map((dataSource, index) => (
              <Tr key={dataSource.id}>
                <Td>
                  {dataSourceList.number * dataSourceList.size + index + 1}
                </Td>
                <Td>{dataSource.title}</Td>
                <Td className="w-1/6">
                  {dayjs(dataSource.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </Td>
                <Td className="w-1/6">
                  <ActionLink
                    to={`${APP_PREFIX_PATH}/data-source/${dataSource.id}/knowledge-graph`}
                  >
                    Knowledge Graph
                  </ActionLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          className="mt-4 flex justify-center flex-shrink-0"
          total={dataSourceList?.totalElements}
          pageSize={dataSourceList?.size}
          currentPage={+(dataSourceList?.number ?? 0) + 1}
          onChange={(val) => {
            setCurrentPage(val.pageIndex);
          }}
        />
      </div>
    </Loading>
  );
};

export default DataSourceList;
