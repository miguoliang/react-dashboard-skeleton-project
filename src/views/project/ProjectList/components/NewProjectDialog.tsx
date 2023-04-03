import React from "react";
import { Dialog } from "components/ui";
import NewProjectForm from "./NewProjectForm";
import { toggleNewProjectDialog } from "../store/stateSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const NewProjectDialog = () => {
  const dispatch = useAppDispatch();

  const newProjectDialog = useAppSelector(
    (state) => state.projectList.state.newProjectDialog
  );

  const onDialogClose = () => {
    dispatch(toggleNewProjectDialog(false));
  };

  return (
    <Dialog
      isOpen={newProjectDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4>Add new project</h4>
      <div className="mt-4">
        <NewProjectForm />
      </div>
    </Dialog>
  );
};

export default NewProjectDialog;
