import React from "react";
import { Button, InputGroup } from "components/ui";
import useDirection from "utils/hooks/useDirection";
import { TextDirection } from "../../ui/utils/constant";

const dirList: { label: string; value: TextDirection }[] = [
  { value: "ltr", label: "LTR" },
  { value: "rtl", label: "RTL" },
];

const DirectionSwitcher = ({
  callBackClose,
}: {
  callBackClose: () => void;
}) => {
  const [direction, updateDirection] = useDirection();

  const onDirChange = (val: TextDirection) => {
    updateDirection(val);
    callBackClose();
  };

  return (
    <InputGroup size="sm">
      {dirList.map((dir) => (
        <Button
          key={dir.value}
          active={direction === dir.value}
          onClick={() => onDirChange(dir.value)}
        >
          {dir.label}
        </Button>
      ))}
    </InputGroup>
  );
};

export default DirectionSwitcher;
