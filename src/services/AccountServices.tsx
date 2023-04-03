import ApiService from "./ApiService";
import {
  accountFormData,
  Invoice,
  Log,
  settingBillingData,
  settingData,
  settingIntegrationData,
} from "../mock/data/accountData";

export async function apiGetAccountSettingData() {
  return ApiService.fetchData<typeof settingData>({
    url: "/account/setting",
    method: "get",
  });
}

export async function apiGetAccountSettingIntegrationData() {
  return ApiService.fetchData<typeof settingIntegrationData>({
    url: "/account/setting/integration",
    method: "get",
  });
}

export async function apiGetAccountSettingBillingData() {
  return ApiService.fetchData<typeof settingBillingData>({
    url: "/account/setting/billing",
    method: "get",
  });
}

export async function apiGetAccountInvoiceData(
  params: Record<string, string | number>,
) {
  return ApiService.fetchData<Invoice>({
    url: "/account/invoice",
    method: "get",
    params,
  });
}

export async function apiGetAccountLogData(data: any) {
  return ApiService.fetchData<Log[]>({
    url: "/account/log",
    method: "post",
    data,
  });
}

export async function apiGetAccountFormData() {
  return ApiService.fetchData<typeof accountFormData>({
    url: "/account/form",
    method: "get",
  });
}
