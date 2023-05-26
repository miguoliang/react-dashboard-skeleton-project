import ApiService from "./ApiService";
import { DataSource } from "../models/data-source";
import { PaginationRequest, PaginationResponse } from "../models/pagination";

export async function apiGetDataSources(pageable?: PaginationRequest) {
  return ApiService.fetchData<PaginationResponse<DataSource>>({
    url: "/data-sources",
    method: "get",
    params: pageable,
  });
}
