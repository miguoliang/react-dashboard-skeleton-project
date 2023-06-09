import React from "react";
import { Button, InputGroup } from "components/ui";
import { Direction } from "../../../constants/theme.constant";
import { useThemeStore } from "../../../store";

const dirList: { label: string; value: Direction }[] = [
  { value: "ltr", label: "LTR" },
  { value: "rtl", label: "RTL" },
];

const DirectionSwitcher = ({
  callBackClose,
}: {
  callBackClose: () => void;
}) => {
  const themeStore = useThemeStore();
  const onDirChange = (val: Direction) => {
    themeStore.setDirection(val);
    callBackClose();
  };

  return (
    <InputGroup size="sm">
      {dirList.map((dir) => (
        <Button
          key={dir.value}
          active={themeStore.direction === dir.value}
          onClick={() => onDirChange(dir.value)}
        >
          {dir.label}
        </Button>
      ))}
    </InputGroup>
  );
};

export default DirectionSwitcher;
