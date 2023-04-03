import React, { useRef } from "react";
import { Button, Dialog } from "components/ui";
import { HiOutlinePencilAlt } from "react-icons/hi";
import MailEditor from "./MailEditor";
import { toggleNewMessageDialog } from "../store/stateSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FormikProps } from "formik";

const MainCompose = () => {
  const dispatch = useAppDispatch();

  const mailEditorRef = {
    formikRef: useRef<FormikProps<any>>(null),
  };

  const isOpen = useAppSelector(
    (state) => state.crmMail.state.newMessageDialog
  );

  const onDialogOpen = () => {
    dispatch(toggleNewMessageDialog(true));
  };

  const onDialogClose = () => {
    dispatch(toggleNewMessageDialog(false));
  };

  const onSend = () => {
    mailEditorRef.formikRef.current?.submitForm();
  };

  return (
    <>
      <Button
        variant="solid"
        block
        icon={<HiOutlinePencilAlt />}
        onClick={onDialogOpen}
      >
        New Message
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">New Message</h5>
        <div className="max-h-[400px] overflow-y-auto px-1">
          <MailEditor ref={mailEditorRef} mode="new" />
        </div>
        <div className="text-right mt-4">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Discard
          </Button>
          <Button variant="solid" onClick={onSend}>
            Send
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default MainCompose;
