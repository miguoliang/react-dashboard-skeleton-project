import ApiService from "./ApiService";
import { PaginationResponse } from "../models/pagination";
import { Person } from "models/person";

export async function apiGetPersonList() {
  return ApiService.fetchData<PaginationResponse<Person>>({
    url: "/persons",
    method: "get",
  });
}
