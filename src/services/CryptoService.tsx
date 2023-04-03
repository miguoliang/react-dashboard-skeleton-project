import ApiService from "./ApiService";
import {
  CryptoDashboard,
  Market,
  Portfolio,
  Trade,
  Wallet,
} from "../mock/data/cryptoData";

export async function apiGetCryptoDashboardData() {
  return ApiService.fetchData<CryptoDashboard>({
    url: "/crypto/dashboard",
    method: "get",
  });
}

export async function apiGetPortfolioData() {
  return ApiService.fetchData<Portfolio>({
    url: "/crypto/portfolio",
    method: "get",
  });
}

export async function apiGetWalletData() {
  return ApiService.fetchData<Wallet[]>({
    url: "/crypto/wallets",
    method: "get",
  });
}

export async function apiGetTransactionHistoryData(data: any) {
  return ApiService.fetchData<{
    total: number;
    data: Trade[];
  }>({
    url: "/crypto/wallets/history",
    method: "post",
    data,
  });
}

export async function apiGetMarketData(data: any) {
  return ApiService.fetchData<{
    total: number;
    data: Market[];
  }>({
    url: "/crypto/market",
    method: "post",
    data,
  });
}
