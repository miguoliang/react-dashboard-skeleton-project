import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { DoubleSidedImage, Loading } from "components/shared";
import { Card } from "components/ui";
import useQuery from "utils/hooks/useQuery";
import { getMail, updateMail, updateMailId } from "../store/dataSlice";
import MailDetailActionBar from "./MailDetailActionBar";
import MailDetailContent from "./MailDetailContent";
import MailEditor from "./MailEditor";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FormikProps } from "formik";
import ReactQuill from "react-quill";

const MailDetail = () => {
  const query = useQuery();

  const dispatch = useAppDispatch();

  const id = query.get("mail");

  const mailEditorRef = {
    formikRef: useRef<FormikProps<any>>(null),
    editorRef: useRef<ReactQuill>(null),
    scrollRef: useRef(null),
  };

  const mail = useAppSelector((state) => state.crmMail.data.mail);
  const mailLoading = useAppSelector((state) => state.crmMail.data.mailLoading);
  const mailId = useAppSelector((state) => state.crmMail.data.selectedMailId);
  const isReply = useAppSelector((state) => state.crmMail.state.reply);

  const fetchData = () => {
    if (id) {
      dispatch(getMail({ id }));
    }
  };

  const onStarToggle = () => {
    const newMailData = cloneDeep(mail);
    newMailData.starred = !newMailData.starred;
    dispatch(updateMail(newMailData));
  };

  const onFlagToggle = () => {
    const newMailData = cloneDeep(mail);
    newMailData.flagged = !newMailData.flagged;
    dispatch(updateMail(newMailData));
  };

  const formSubmit = () => {
    mailEditorRef.formikRef.current?.submitForm();
  };

  const onMailReply = () => {
    const timeout = setTimeout(
      () => mailEditorRef.editorRef.current?.focus(),
      100
    );
    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    if (mailId) {
      fetchData();
    }
  }, [mailId]);

  useEffect(() => {
    if (!mailId && id) {
      dispatch(updateMailId(id));
    }
  }, []);

  return (
    <div
      className={classNames(
        id && !isEmpty(mail) && !mailLoading
          ? "block xl:flex"
          : "hidden xl:flex",
        "flex-col w-full bg-gray-100 dark:bg-gray-900"
      )}
    >
      {id && !isEmpty(mail) ? (
        mailLoading ? (
          <Loading loading={true} />
        ) : (
          <>
            <MailDetailActionBar
              isReply={isReply}
              starred={mail.starred}
              flagged={mail.flagged}
              mailId={mail.id}
              onStarToggle={onStarToggle}
              onFlagToggle={onFlagToggle}
              onMailSend={formSubmit}
              onMailReply={onMailReply}
            />
            <MailDetailContent ref={mailEditorRef} mail={mail}>
              {isReply && (
                <div className="pb-6">
                  <Card>
                    <MailEditor ref={mailEditorRef} mode="reply" mail={mail} />
                  </Card>
                </div>
              )}
            </MailDetailContent>
          </>
        )
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <DoubleSidedImage
            className="max-w-[200px]"
            src="/img/others/no-mail-selected.png"
            darkModeSrc="/img/others/no-mail-selected-dark.png"
          />
          <div className="mt-4 text-2xl font-semibold">
            Select a mail to read
          </div>
        </div>
      )}
    </div>
  );
};

export default MailDetail;
