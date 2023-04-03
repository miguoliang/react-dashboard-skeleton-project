import React from "react";
import { Button } from "components/ui";
import { toggleAddCategoryDialog } from "../store/stateSlice";
import { useAppDispatch } from "store/hooks";

const PanelHeader = () => {
  const dispatch = useAppDispatch();

  const onAddCategory = () => {
    dispatch(toggleAddCategoryDialog(true));
  };

  return (
    <div className="flex items-center">
      <Button onClick={onAddCategory} size="sm" variant="solid">
        Add category
      </Button>
    </div>
  );
};

export default PanelHeader;
