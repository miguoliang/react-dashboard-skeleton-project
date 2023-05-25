import axios from "axios";
import appConfig from "configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "constants/api.constant";
import {
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_REDIRECT_URI,
} from "../constants/oidc.constant";
import { User, UserManager } from "oidc-client-ts";

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
});

const userManager = new UserManager({
  authority: OIDC_AUTHORITY,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: OIDC_REDIRECT_URI,
  revokeTokenTypes: ["refresh_token"],
  automaticSilentRenew: false,
});

BaseService.interceptors.request.use(
  (config) => {
    const user = getUser();
    const accessToken = user?.access_token;
    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && unauthorizedCode.includes(response.status)) {
      userManager.signoutRedirect();
    }
    return Promise.reject(error);
  },
);

function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${OIDC_AUTHORITY}:${OIDC_CLIENT_ID}`,
  );
  return oidcStorage ? User.fromStorageString(oidcStorage) : null;
}

export default BaseService;
