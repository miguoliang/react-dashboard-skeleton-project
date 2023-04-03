import { Order, OrderDetails, Product } from "mock/data/salesData";
import ApiService from "./ApiService";

export async function apiGetSalesDashboardData(data: any) {
  return ApiService.fetchData<any>({
    url: "/sales/dashboard",
    method: "post",
    data,
  });
}

export async function apiGetSalesProducts(data: any) {
  return ApiService.fetchData<{
    total: number;
    data: Product[];
  }>({
    url: "/sales/products",
    method: "post",
    data,
  });
}

export async function apiDeleteSalesProducts(data: any) {
  return ApiService.fetchData<Product[]>({
    url: "/sales/products/delete",
    method: "delete",
    data,
  });
}

export async function apiGetSalesProduct(params: any) {
  return ApiService.fetchData<Product>({
    url: "/sales/product",
    method: "get",
    params,
  });
}

export async function apiPutSalesProduct(data: any) {
  return ApiService.fetchData({
    url: "/sales/products/update",
    method: "put",
    data,
  });
}

export async function apiCreateSalesProduct(data: any) {
  return ApiService.fetchData({
    url: "/sales/products/create",
    method: "post",
    data,
  });
}

export async function apiGetSalesOrders(params: any) {
  return ApiService.fetchData<{
    total: number;
    data: Order[];
  }>({
    url: "/sales/orders",
    method: "get",
    params,
  });
}

export async function apiDeleteSalesOrders(data: any) {
  return ApiService.fetchData({
    url: "/sales/orders/delete",
    method: "delete",
    data,
  });
}

export async function apiGetSalesOrderDetails(params: any) {
  return ApiService.fetchData<OrderDetails>({
    url: "/sales/orders-details",
    method: "get",
    params,
  });
}
