import ApiService from "./ApiService";
import { crmDashboardData, Event, Mail, Statistic } from "../mock/data/crmData";
import { UserDetail } from "mock/data/usersData";

export async function apiGetCrmDashboardData(data?: any) {
  return ApiService.fetchData<typeof crmDashboardData>({
    url: "/crm/dashboard",
    method: "get",
    data,
  });
}

export async function apiGetCrmCalendar() {
  return ApiService.fetchData<Event[]>({
    url: "/crm/calendar",
    method: "get",
  });
}

export async function apiGetCrmCustomers(data: any) {
  return ApiService.fetchData<{
    total: number;
    data: UserDetail[];
  }>({
    url: "/crm/customers",
    method: "post",
    data,
  });
}

export async function apiGetCrmCustomersStatistic(params: any) {
  return ApiService.fetchData<Statistic>({
    url: "/crm/customers-statistic",
    method: "get",
    params,
  });
}

export async function apPutCrmCustomer(data: any) {
  return ApiService.fetchData({
    url: "/crm/customers",
    method: "put",
    data,
  });
}

export async function apiGetCrmCustomerDetails(params: any) {
  return ApiService.fetchData<UserDetail>({
    url: "/crm/customer-details",
    method: "get",
    params,
  });
}

export async function apiDeleteCrmCustomer(data: any) {
  return ApiService.fetchData({
    url: "/crm/customer/delete",
    method: "delete",
    data,
  });
}

export async function apiGetCrmMails(params: any) {
  return ApiService.fetchData<Mail[]>({
    url: "/crm/mails",
    method: "get",
    params,
  });
}

export async function apiGetCrmMail(params: any) {
  return ApiService.fetchData<Mail>({
    url: "/crm/mail",
    method: "get",
    params,
  });
}
