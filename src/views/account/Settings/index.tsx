import React, { lazy, Suspense, useEffect, useState } from "react";
import { Container } from "components/shared";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { apiGetAccountSettingData } from "services/AccountServices";
import { noop } from "lodash";
import { settingData } from "../../../mock/data/accountData";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const Profile = lazy(() => import("./components/Profile"));
const Password = lazy(() => import("./components/Password"));
const NotificationSetting = lazy(
  () => import("./components/NotificationSetting"),
);
const Integration = lazy(() => import("./components/Integration"));
const Billing = lazy(() => import("./components/Billing"));

const settingsMenu = [
  { label: "Profile", path: "profile" },
  { label: "Password", path: "password" },
  { label: "Notification", path: "notification" },
  { label: "Integration", path: "integration" },
  { label: "Billing", path: "billing" },
];

const Settings = () => {
  const [data, setData] = useState(settingData);

  const navigate = useNavigate();
  const onTabChange = (val: number) => {
    navigate(`/app/account/settings/${settingsMenu[val].path}`);
  };

  const fetchData = async () => {
    const response = await apiGetAccountSettingData();
    setData(response.data);
  };

  useEffect(() => {
    if (isEmpty(data)) {
      fetchData().then(noop);
    }
  }, []);

  return (
    <Container>
      <Box>
        <Tabs onChange={onTabChange}>
          <TabList>
            {settingsMenu.map((it) => (
              <Tab key={it.path}>{it.label}</Tab>
            ))}
          </TabList>
          <TabPanels className="px-4 py-6">
            <TabPanel>
              <Suspense fallback={<></>}>
                <Profile data={data.profile} />
              </Suspense>
            </TabPanel>
            <TabPanel>
              <Suspense fallback={<></>}>
                <Password data={data.loginHistory} />
              </Suspense>
            </TabPanel>
            <TabPanel>
              <Suspense fallback={<></>}>
                <NotificationSetting data={data.notification} />
              </Suspense>
            </TabPanel>
            <TabPanel>
              <Suspense fallback={<></>}>
                <Integration />
              </Suspense>
            </TabPanel>
            <TabPanel>
              <Suspense fallback={<></>}>
                <Billing />
              </Suspense>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Settings;
