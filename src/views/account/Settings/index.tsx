import React, { lazy, Suspense, useEffect, useState } from "react";
import { TabList, TabNav, Tabs } from "components/ui";
import { AdaptableCard, Container } from "components/shared";
import { useLocation, useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { apiGetAccountSettingData } from "services/AccountServices";
import { noop } from "lodash";
import { settingData } from "../../../mock/data/accountData";

const Profile = lazy(() => import("./components/Profile"));
const Password = lazy(() => import("./components/Password"));
const NotificationSetting = lazy(
  () => import("./components/NotificationSetting")
);
const Integration = lazy(() => import("./components/Integration"));
const Billing = lazy(() => import("./components/Billing"));

const settingsMenu: {
  [key: string]: { label: string; path: string };
} = {
  profile: { label: "Profile", path: "profile" },
  password: { label: "Password", path: "password" },
  notification: { label: "Notification", path: "notification" },
  integration: { label: "Integration", path: "integration" },
  billing: { label: "Billing", path: "billing" },
};

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("profile");
  const [data, setData] = useState(settingData);

  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const onTabChange = (val: string) => {
    setCurrentTab(val);
    navigate(`/app/account/settings/${val}`);
  };

  const fetchData = async () => {
    const response = await apiGetAccountSettingData();
    setData(response.data);
  };

  useEffect(() => {
    setCurrentTab(path);
    if (isEmpty(data)) {
      fetchData().then(noop);
    }
  }, []);

  return (
    <Container>
      <AdaptableCard>
        <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
          <TabList>
            {Object.keys(settingsMenu).map((key) => (
              <TabNav key={key} value={key}>
                {settingsMenu[key].label}
              </TabNav>
            ))}
          </TabList>
        </Tabs>
        <div className="px-4 py-6">
          <Suspense fallback={<></>}>
            {currentTab === "profile" && <Profile data={data.profile} />}
            {currentTab === "password" && <Password data={data.loginHistory} />}
            {currentTab === "notification" && (
              <NotificationSetting data={data.notification} />
            )}
            {currentTab === "integration" && <Integration />}
            {currentTab === "billing" && <Billing />}
          </Suspense>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default Settings;
