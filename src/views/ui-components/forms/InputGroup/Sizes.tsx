import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "components/ui";

const Sizes = () => {
  return (
    <div>
      <InputGroup size="sm" className="mb-4">
        <InputGroupAddon>@</InputGroupAddon>
        <Input placeholder="Small Input" />
        <Button variant="solid">Submit</Button>
      </InputGroup>
      <InputGroup size="lg" className="mb-4">
        <InputGroupAddon>@</InputGroupAddon>
        <Input placeholder="Small Input" />
        <Button variant="solid">Submit</Button>
      </InputGroup>
    </div>
  );
};

export default Sizes;
