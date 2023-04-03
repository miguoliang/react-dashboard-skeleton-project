import React from "react";
import { TabList, TabNav, Tabs } from "components/ui";

const Disabled = () => {
  return (
    <div>
      <Tabs defaultValue="tab1" className="mb-4">
        <TabList>
          <TabNav value="tab1">Home</TabNav>
          <TabNav value="tab2" disabled>
            Profile
          </TabNav>
          <TabNav value="tab3">Contact</TabNav>
        </TabList>
      </Tabs>
      <Tabs defaultValue="tab1" variant="pill">
        <TabList>
          <TabNav value="tab1">Home</TabNav>
          <TabNav value="tab2" disabled>
            Profile
          </TabNav>
          <TabNav value="tab3">Contact</TabNav>
        </TabList>
      </Tabs>
    </div>
  );
};

export default Disabled;
