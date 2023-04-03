import ApiService from "./ApiService";

export async function apiSignIn(data: any) {
  return ApiService.fetchData({
    url: "/sign-in",
    method: "post",
    data,
  });
}

export async function apiSignUp(data: any) {
  return ApiService.fetchData({
    url: "/sign-up",
    method: "post",
    data,
  });
}

export async function apiSignOut(data: any) {
  return ApiService.fetchData({
    url: "/sign-out",
    method: "post",
    data,
  });
}

export async function apiForgotPassword(data: any) {
  return ApiService.fetchData({
    url: "/forgot-password",
    method: "post",
    data,
  });
}

export async function apiResetPassword(data: any) {
  return ApiService.fetchData({
    url: "/reset-password",
    method: "post",
    data,
  });
}
