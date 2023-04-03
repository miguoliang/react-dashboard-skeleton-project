import React, { useState } from "react";
import { Segment, SegmentItem } from "components/ui";
import { Size as SizeType } from "components/ui/utils/constant";

const Size = () => {
  const [size, setSize] = useState<SizeType[]>(["md"]);

  const onSizeChange = (val: SizeType[]) => {
    setSize(val);
  };

  return (
    <Segment onChange={onSizeChange} size={size[0]} value={size}>
      <SegmentItem value="xs">Extra Small</SegmentItem>
      <SegmentItem value="sm">Small</SegmentItem>
      <SegmentItem value="md">Medium</SegmentItem>
      <SegmentItem value="lg">Large</SegmentItem>
    </Segment>
  );
};

export default Size;
