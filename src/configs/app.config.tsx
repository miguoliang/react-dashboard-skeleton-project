import { API_URL } from "../constants/api.constant";

const appConfig = {
  apiPrefix: API_URL,
  authenticatedEntryPath: "/account/kyc-form",
  unAuthenticatedEntryPath: "/",
  tourPath: "/",
  locale: "en",
  enableMock: false,
};

export default appConfig;
