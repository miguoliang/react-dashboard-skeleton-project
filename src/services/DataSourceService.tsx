import ApiService from "./ApiService";
import { DataSource } from "../models/data-source";

export async function apiGetDataSources() {
  return ApiService.fetchData<DataSource>({
    url: "/data-sources",
    method: "get",
  });
}
