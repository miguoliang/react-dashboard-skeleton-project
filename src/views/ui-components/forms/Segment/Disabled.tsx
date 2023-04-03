import React from "react";
import { Segment, SegmentItem } from "components/ui";

const Disabled = () => {
  return (
    <Segment>
      <SegmentItem value="left">Left</SegmentItem>
      <SegmentItem disabled value="center">
        Center
      </SegmentItem>
      <SegmentItem value="right">Right</SegmentItem>
    </Segment>
  );
};

export default Disabled;
