import React from "react";
import { Segment, SegmentItem } from "components/ui";

const MultipleSelection = () => {
  return (
    <Segment selectionType="multiple">
      <SegmentItem value="left">Left</SegmentItem>
      <SegmentItem value="center">Center</SegmentItem>
      <SegmentItem value="right">Right</SegmentItem>
    </Segment>
  );
};

export default MultipleSelection;
