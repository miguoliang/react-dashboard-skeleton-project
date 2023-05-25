import { useEffect, useState } from "react";
import { apiGetDataSources } from "../../services/DataSourceService";
import { DataSource } from "../../models/data-source";

const DataSourceList = () => {
  const [dataSourceList, setDataSourceList] = useState<DataSource[]>([]);
  useEffect(() => {
    apiGetDataSources().then((res) => {
      setDataSourceList(res.data.content);
    });
  });
  return <div>{dataSourceList.map((it) => it.title)}</div>;
};

export default DataSourceList;
