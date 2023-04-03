import React from "react";
import { Dropdown, DropdownItem } from "components/ui";
import { Link } from "react-router-dom";

const WithRouterLink = () => {
  return (
    <div>
      <Dropdown title="Click Me!">
        <DropdownItem>
          <Link className="menu-item-link" to="/ui-components/checkbox">
            Checkbox
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link className="menu-item-link" to="/ui-components/button">
            Button
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link className="menu-item-link" to="/ui-components/alert">
            Alert
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link className="menu-item-link" to="/ui-components/dialog">
            Dialog
          </Link>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default WithRouterLink;
