import { createServer } from "miragejs";
import appConfig from "configs/app.config";
import { notificationListData, searchQueryPoolData } from "./data/commonData";
import {
  accountFormData,
  invoiceData,
  logData,
  settingBillingData,
  settingData,
  settingIntegrationData,
} from "./data/accountData";
import { signInUserData } from "./data/authData";

import { accountFakeApi } from "./fakeApi";

const { apiPrefix } = appConfig;

export default function mockServer({ environment = "test" }) {
  const server = createServer({
    environment,
    routes() {
      this.urlPrefix = "";
      this.namespace = "";
      this.passthrough((request) => {
        const isExternal = request.url.startsWith("http");
        return isExternal;
      });
      this.passthrough();
      accountFakeApi(this, apiPrefix);
    },
  });
  server.db.loadData({
    notificationListData,
    searchQueryPoolData,
    settingData,
    settingIntegrationData,
    settingBillingData,
    invoiceData,
    logData,
    accountFormData,
    signInUserData,
  });
  return server;
}
