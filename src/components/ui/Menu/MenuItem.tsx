import React from "react";
import { MenuContextConsumer } from "./context/menuContext";
import { GroupContextConsumer } from "./context/groupContext";
import { CollapseContextConsumer } from "./context/collapseContext";
import Item from "../MenuItem";

const MenuItem = (props: React.ComponentProps<typeof Item>) => {
  const { eventKey, ...rest } = props;

  return (
    <MenuContextConsumer>
      {(context) => (
        <GroupContextConsumer>
          {() => (
            <CollapseContextConsumer>
              {() => (
                <Item
                  onSelect={context.onSelect}
                  menuItemHeight={context.menuItemHeight}
                  variant={context.variant}
                  isActive={
                    eventKey
                      ? context.defaultActiveKeys?.includes(eventKey)
                      : false
                  }
                  eventKey={eventKey}
                  {...rest}
                />
              )}
            </CollapseContextConsumer>
          )}
        </GroupContextConsumer>
      )}
    </MenuContextConsumer>
  );
};

export default MenuItem;
