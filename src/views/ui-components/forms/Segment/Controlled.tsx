import React, { useCallback, useState } from "react";
import { Segment, SegmentItem } from "components/ui";

const Controlled = () => {
  const [singleSegmentValue, setSingleSegmentValue] = useState(["left"]);
  const [multipleSegmentValue, setMultipleSegmentValue] = useState(["center"]);

  const onSingleSelectionSegmentChange = useCallback(
    (val: string[]) => {
      setSingleSegmentValue(val);
    },
    [setSingleSegmentValue]
  );

  const onMultipleSegmentValueChange = useCallback(
    (val: string[]) => {
      setMultipleSegmentValue(val);
    },
    [setMultipleSegmentValue]
  );

  return (
    <>
      <div className="mb-6">
        <h6 className="mb-3">Single Selection</h6>
        <Segment
          value={singleSegmentValue}
          onChange={(val: string[]) => onSingleSelectionSegmentChange(val)}
        >
          <SegmentItem value="left">Left</SegmentItem>
          <SegmentItem value="center">Center</SegmentItem>
          <SegmentItem value="right">Right</SegmentItem>
        </Segment>
      </div>
      <div>
        <h6 className="mb-3">Multiple Selection</h6>
        <Segment
          selectionType="multiple"
          value={multipleSegmentValue}
          onChange={(val: string[]) => onMultipleSegmentValueChange(val)}
        >
          <SegmentItem value="left">Left</SegmentItem>
          <SegmentItem value="center">Center</SegmentItem>
          <SegmentItem value="right">Right</SegmentItem>
        </Segment>
      </div>
    </>
  );
};

export default Controlled;
