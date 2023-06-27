import ApiService from "./ApiService";

export async function apiPostChangePassword(
  previousPassword: string,
  proposedPassword: string,
) {
  return ApiService.fetchData({
    url: "/account/change-password",
    method: "post",
    data: {
      previousPassword,
      proposedPassword,
    },
  });
}
