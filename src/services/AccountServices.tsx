import ApiService from "./ApiService";

export async function apiPostChangePassword(
  previousPassword: string,
  proposedPassword: string,
) {
  return ApiService.fetchData({
    url: "/account/setting",
    method: "post",
    data: {
      previousPassword,
      proposedPassword,
    },
  });
}
