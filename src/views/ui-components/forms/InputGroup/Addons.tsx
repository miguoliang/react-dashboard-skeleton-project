import React from "react";
import { Input, InputGroup, InputGroupAddon as Addon } from "components/ui";

const Addons = () => {
  return (
    <div>
      <InputGroup className="mb-4">
        <Addon>@</Addon>
        <Input />
      </InputGroup>
      <InputGroup className="mb-4">
        <Input />
        <Addon>.exmaple.com</Addon>
      </InputGroup>
      <InputGroup className="mb-4">
        <Addon>http://</Addon>
        <Input />
        <Addon>.com</Addon>
      </InputGroup>
      <InputGroup className="mb-4">
        <Input />
        <Addon>to</Addon>
        <Input />
      </InputGroup>
    </div>
  );
};

export default Addons;
