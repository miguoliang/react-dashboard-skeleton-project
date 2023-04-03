import { createServer } from "miragejs";
import appConfig from "configs/app.config";
import { notificationListData, searchQueryPoolData } from "./data/commonData";
import {
  issueData,
  projectDashboardData,
  projectList,
  scrumBoardData,
} from "./data/projectData";
import { userDetailData, usersData } from "./data/usersData";
import { crmDashboardData, eventsData, mailData } from "./data/crmData";
import {
  orderDetailsData,
  ordersData,
  productsData,
  salesDashboardData,
} from "./data/salesData";
import {
  cryptoDashboardData,
  marketData,
  portfolioData,
  transactionHistoryData,
  walletsData,
} from "./data/cryptoData";
import {
  accountFormData,
  invoiceData,
  logData,
  settingBillingData,
  settingData,
  settingIntegrationData,
} from "./data/accountData";
import {
  helpCenterArticleListData,
  helpCenterCategoriesData,
} from "./data/knowledgeBaseData";
import { signInUserData } from "./data/authData";

import {
  accountFakeApi,
  authFakeApi,
  commonFakeApi,
  crmFakeApi,
  cryptoFakeApi,
  knowledgeBaseFakeApi,
  projectFakeApi,
  salesFakeApi,
} from "./fakeApi";

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

      commonFakeApi(this, apiPrefix);
      projectFakeApi(this, apiPrefix);
      crmFakeApi(this, apiPrefix);
      salesFakeApi(this, apiPrefix);
      accountFakeApi(this, apiPrefix);
      authFakeApi(this, apiPrefix);
      cryptoFakeApi(this, apiPrefix);
      knowledgeBaseFakeApi(this, apiPrefix);
    },
  });
  server.db.loadData({
    notificationListData,
    searchQueryPoolData,
    projectList,
    scrumBoardData,
    issueData,
    usersData,
    userDetailData,
    eventsData,
    mailData,
    productsData,
    ordersData,
    orderDetailsData,
    settingData,
    settingIntegrationData,
    settingBillingData,
    invoiceData,
    logData,
    accountFormData,
    portfolioData,
    walletsData,
    marketData,
    transactionHistoryData,
    helpCenterCategoriesData,
    helpCenterArticleListData,
    signInUserData,
    salesDashboardData,
    crmDashboardData,
    projectDashboardData,
    cryptoDashboardData,
  });
  return server;
}
