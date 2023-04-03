import ApiService from "./ApiService";
import { notificationListData, SearchQuery } from "../mock/data/commonData";

export async function apiGetNotificationCount() {
  return ApiService.fetchData<{ count: number }>({
    url: "/notification/count",
    method: "get",
  });
}

export async function apiGetNotificationList() {
  return ApiService.fetchData<typeof notificationListData>({
    url: "/notification/list",
    method: "get",
  });
}

export async function apiGetSearchResult(data: { query: string }) {
  return ApiService.fetchData<{ title: string; data: SearchQuery[] }[]>({
    url: "/search/query",
    method: "post",
    data,
  });
}
