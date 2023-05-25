import ApiService from "./ApiService";
import { DataSource } from "../models/data-source";
import { PaginationResponse } from "../models/common";

export async function apiGetDataSources() {
  return ApiService.fetchData<PaginationResponse<DataSource>>({
    url: "/data-sources",
    method: "get",
  });
}
