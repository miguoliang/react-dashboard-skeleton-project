import axios from "axios";
import appConfig from "configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "constants/api.constant";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
});

BaseService.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();

    const accessToken = auth.accessToken;

    if (!accessToken) {
      const url = `${
        appConfig.unAuthenticatedEntryPath
      }&${REDIRECT_URL_KEY}=${encodeURIComponent(location.origin)}`;
      window.location.replace(url);
      return Promise.reject("Unauthorized!");
    }

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
      store.dispatch(onSignOutSuccess());
    }

    return Promise.reject(error);
  },
);

export default BaseService;
