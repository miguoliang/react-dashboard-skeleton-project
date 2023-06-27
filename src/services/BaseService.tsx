import axios from "axios";
import appConfig from "configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "constants/api.constant";
import {
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_REDIRECT_URI,
} from "constants/oidc.constant";
import { UserManager } from "oidc-client-ts";
import { useAuth } from "../hooks/useAuth";
import { toast } from "../hooks/useToast";

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
  async (config) => {
    const { userManager } = useAuth.getState();
    const user = await userManager.getUser();
    if (!user || user.expired) {
      toastAndRedirectToLogin();
      return Promise.reject();
    }
    config.headers[
      REQUEST_HEADER_AUTH_KEY
    ] = `${TOKEN_TYPE}${user.access_token}`;
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
      toastAndRedirectToLogin();
    } else {
      toast({
        status: "error",
        title: error.message,
      });
    }
    return Promise.reject(error);
  },
);

const toastAndRedirectToLogin = () => {
  toast({
    status: "error",
    title: "Please login to continue",
    onCloseComplete: () => {
      userManager.signinRedirect();
    },
  });
};

export default BaseService;
