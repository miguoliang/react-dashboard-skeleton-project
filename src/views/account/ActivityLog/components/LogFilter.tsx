import React, { useCallback } from "react";
import classNames from "classnames";
import { Checkbox, CheckboxGroup } from "components/ui";
import Affix from "components/shared/Affix";
import { setSelected } from "../store/stateSlice";
import { filterLogs, setActivityIndex } from "../store/dataSlice";
import {
  ADD_FILES_TO_TICKET,
  ADD_TAGS_TO_TICKET,
  ASSIGN_TICKET,
  COMMENT,
  COMMENT_MENTION,
  CREATE_TICKET,
  UPDATE_TICKET,
} from "../constants";
import { useAppDispatch, useAppSelector } from "store/hooks";
import isEmpty from "lodash/isEmpty";

const commentCheckboxes = [
  { label: "Comment on post", value: COMMENT },
  { label: "Mentioned you", value: COMMENT_MENTION },
];

const ticketCheckboxes = [
  { label: "Ticket status", value: UPDATE_TICKET },
  { label: "Assign ticket", value: ASSIGN_TICKET },
  { label: "New ticket", value: CREATE_TICKET },
  { label: "Add tags", value: ADD_TAGS_TO_TICKET },
  { label: "Add files", value: ADD_FILES_TO_TICKET },
];

const CategoryTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={classNames(
        "text-gray-900 uppercase tracking-wide font-semibold text-sm lg:text-xs",
        className
      )}
    >
      {children}
    </h6>
  );
};

const LogFilter = () => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(
    (state) => state.accountActivityLog.state.selectedType
  );
  const activityIndex = useAppSelector(
    (state) => state.accountActivityLog.data.activityIndex
  );

  const onFilterChange = useCallback(
    (selected: boolean) => {
      dispatch(filterLogs({ filter: selected, activityIndex: 1 }));
      if (activityIndex !== 1) {
        dispatch(setActivityIndex(1));
      }
      dispatch(setSelected(selected));
    },
    [dispatch, activityIndex]
  );

  return (
    <div>
      <Affix className="hidden lg:block" offset={80}>
        <h5 className="mb-4">Filter Activity</h5>
        <CheckboxGroup
          onChange={(itemValues) => onFilterChange(isEmpty(itemValues))}
          vertical
          value={selectedType}
        >
          <CategoryTitle className="mb-3">Ticket</CategoryTitle>
          {ticketCheckboxes.map((checkbox) => (
            <Checkbox
              className="mb-4"
              key={checkbox.value}
              value={checkbox.value}
            >
              {checkbox.label}
            </Checkbox>
          ))}
          <CategoryTitle className="mt-4 mb-3">Comment</CategoryTitle>
          {commentCheckboxes.map((checkbox) => (
            <Checkbox
              className="mb-4"
              key={checkbox.value}
              value={checkbox.value}
            >
              {checkbox.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Affix>
    </div>
  );
};

export default LogFilter;
