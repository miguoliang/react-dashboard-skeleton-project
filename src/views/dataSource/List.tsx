import { useEffect, useState } from "react";
import { apiGetDataSources } from "../../services/DataSourceService";
import { DataSource } from "../../models/data-source";
import { Pagination, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import { PaginationResponse } from "../../models/pagination";
import dayjs from "dayjs";
import { ActionLink, Loading } from "../../components/shared";
import { APP_PREFIX_PATH } from "../../constants/route.constant";

const DataSourceList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataSourceList, setDataSourceList] =
    useState<PaginationResponse<DataSource> | null>(null);
  useEffect(() => {
    setLoading(true);
    apiGetDataSources({ page: currentPage - 1 })
      .then((res) => {
        setDataSourceList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <Loading loading={loading} type="cover" className="h-full">
      <div className="h-full flex flex-col">
        <Table className="flex-grow">
          <THead className="leading-10">
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Source</Th>
              <Th>Created at</Th>
              <Th>Operations</Th>
            </Tr>
          </THead>
          <TBody>
            {dataSourceList?.content.map((dataSource, index) => (
              <Tr key={dataSource.id}>
                <Td>
                  {dataSourceList.number * dataSourceList.size + index + 1}
                </Td>
                <Td>{dataSource.title}</Td>
                <Td className="w-1/6">{dataSource.source}</Td>
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
          </TBody>
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
