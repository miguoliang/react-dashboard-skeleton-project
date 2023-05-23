import { COGNITO_CLIENT_ID, COGNITO_DOMAIN } from "../constants/app.constant";

const appConfig = {
  apiPrefix: "/api",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: `https://${COGNITO_DOMAIN}/login?client_id=${COGNITO_CLIENT_ID}&response_type=token&scope=email+openid`,
  tourPath: "/app/account/kyc-form",
  locale: "en",
  enableMock: false,
};

export default appConfig;
