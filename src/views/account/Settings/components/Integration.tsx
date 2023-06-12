import React, { useEffect, useState } from "react";
import { Avatar, Button, Switch, useToast } from "@chakra-ui/react";
import { Card, Dialog } from "components/ui";
import isEmpty from "lodash/isEmpty";
import { apiGetAccountSettingIntegrationData } from "services/AccountServices";
import cloneDeep from "lodash/cloneDeep";
import { noop } from "lodash";
import {
  Integration as IntegrationData,
  settingIntegrationData,
} from "../../../../mock/data/accountData";

const Integration = () => {
  const [data, setData] = useState<typeof settingIntegrationData>({});
  const [viewIntegration, setViewIntegration] = useState(false);
  const [integrationDetails, setIntegrationDetails] =
    useState<IntegrationData | null>(null);
  const [installing, setInstalling] = useState(false);

  const fetchData = async () => {
    const response = await apiGetAccountSettingIntegrationData();
    setData(response.data);
  };

  useEffect(() => {
    if (isEmpty(data)) {
      fetchData().then(noop);
    }
  }, []);

  const handleToggle = (
    bool: boolean,
    name: string,
    category: "installed" | "available",
  ) => {
    setData((prevState) => {
      const nextState = cloneDeep(prevState);
      const nextCategoryValue = prevState[category]?.map(
        (app: IntegrationData) => {
          if (app.name === name) {
            app.active = !bool;
          }
          return app;
        },
      );
      nextState[category] = nextCategoryValue;
      return nextState;
    });
  };

  const onViewIntegrationOpen = (
    details: IntegrationData,
    installed: boolean,
  ) => {
    setViewIntegration(true);
    setIntegrationDetails({ ...details, installed });
  };

  const onViewIntegrationClose = () => {
    setViewIntegration(false);
  };

  const toast = useToast();

  const handleInstall = (details?: IntegrationData | null) => {
    setInstalling(true);
    setTimeout(() => {
      setData((prevState: typeof settingIntegrationData) => {
        const nextState = cloneDeep(prevState);
        const nextAvailableApp = prevState.available?.filter(
          (app) => app.name !== details?.name,
        );
        nextState.available = nextAvailableApp;
        details && nextState.installed?.push(details);
        return nextState;
      });
      setInstalling(false);
      onViewIntegrationClose();
      toast({
        title: "App installed",
        status: "success",
        position: "top",
      });
    }, 1000);
  };

  return (
    <>
      <h5>Installed</h5>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
        {data.installed?.map((app) => (
          <Card
            bodyClass="p-0"
            key={app.name}
            footerClass="flex justify-end p-2"
            footer={
              <Button
                variant="plain"
                size="sm"
                onClick={() => onViewIntegrationOpen(app, true)}
              >
                View Intergration
              </Button>
            }
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar
                    className="bg-transparent dark:bg-transparent"
                    src={app.img}
                  />
                  <div className="ltr:ml-2 rtl:mr-2">
                    <h6>{app.name}</h6>
                  </div>
                </div>
                <Switch
                  onChange={(e) =>
                    handleToggle(e.target.checked, app.name, "installed")
                  }
                  checked={app.active}
                />
              </div>
              <p className="mt-6">{app.desc}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <h5>Available</h5>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
          {data.available?.map((app) => (
            <Card
              bodyClass="p-0"
              key={app.name}
              footerClass="flex justify-end p-2"
              footer={
                <Button
                  variant="plain"
                  size="sm"
                  onClick={() => onViewIntegrationOpen(app, false)}
                >
                  View Intergration
                </Button>
              }
            >
              <div className="p-6">
                <div className="flex items-center">
                  <Avatar
                    className="bg-transparent dark:bg-transparent"
                    src={app.img}
                  />
                  <div className="ltr:ml-2 rtl:mr-2">
                    <h6>{app.name}</h6>
                  </div>
                </div>
                <p className="mt-6">{app.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Dialog
        width={650}
        isOpen={viewIntegration}
        onClose={onViewIntegrationClose}
        onRequestClose={onViewIntegrationClose}
      >
        <div className="flex items-center">
          <Avatar
            className="bg-transparent dark:bg-transparent"
            src={integrationDetails?.img}
          />
          <div className="ltr:ml-3 rtl:mr-3">
            <h6>{integrationDetails?.name}</h6>
            <span>{integrationDetails?.type}</span>
          </div>
        </div>
        <div className="mt-6">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            About {integrationDetails?.name}
          </span>
          <p className="mt-2 mb-4">
            Wings medium plunger pot, redeye doppio siphon froth iced. Latte,
            and, barista cultivar fair trade grinder caramelization spoon.
            Whipped, grinder to go brewed est single shot half and half. Plunger
            pot blue mountain et blue mountain grinder carajillo, saucer half
            and half milk instant strong.
          </p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Key Features
          </span>
          <ul className="list-disc mt-2 ltr:ml-4 rtl:mr-4">
            <li className="mb-1">
              Fair trade, cortado con panna, crema foam cinnamon aged.{" "}
            </li>
            <li className="mb-1">
              Mug saucer acerbic, caffeine organic kopi-luwak galão siphon.{" "}
            </li>
            <li className="mb-1">
              To go half and half cultivar single origin ut, french press.{" "}
            </li>
            <li className="mb-1">
              Mocha latte flavour cortado cup kopi-luwak.{" "}
            </li>
          </ul>
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onViewIntegrationClose}
          >
            Cancel
          </Button>
          {integrationDetails?.installed ? (
            <Button disabled variant="solid">
              Installed
            </Button>
          ) : (
            <Button
              variant="solid"
              onClick={() => handleInstall(integrationDetails)}
              isLoading={installing}
            >
              Install
            </Button>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Integration;
