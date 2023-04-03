import React, { MouseEventHandler, RefObject } from "react";
import classNames from "classnames";
import { Segment, SegmentItem } from "components/ui";
import { HiCheckCircle } from "react-icons/hi";

type SegmentSelectionType = {
  value: string;
  desc: string;
  disabled: boolean;
};

const segmentSelections: SegmentSelectionType[] = [
  { value: "Personal", desc: "The plan for personal.", disabled: false },
  { value: "Team", desc: "The plan for team", disabled: false },
  {
    value: "Business",
    desc: "Talk to us for business plan.",
    disabled: true,
  },
];

type CustomContentProps = Partial<{
  ref: RefObject<any>;
  active: boolean;
  value: string;
  onSegmentItemClick: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
  item: SegmentSelectionType;
}>;

const CustomContent = ({
  ref,
  active,
  value,
  onSegmentItemClick,
  disabled,
  item,
}: CustomContentProps) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "flex",
        "ring-1",
        "justify-between",
        "border",
        "rounded-md ",
        "border-gray-300",
        "py-5 px-4",
        "cursor-pointer",
        "select-none",
        "w-100",
        "md:w-[260px]",
        active ? "ring-cyan-500 border-cyan-500" : "ring-transparent",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:ring-cyan-500 hover:border-cyan-500"
      )}
      onClick={onSegmentItemClick}
    >
      <div>
        <h6>{value}</h6>
        <p>{item?.desc}</p>
      </div>
      {active && <HiCheckCircle className="text-cyan-500 text-xl" />}
    </div>
  );
};

const Custom = () => {
  return (
    <Segment defaultValue={["Team"]} className="gap-2 md:flex-row flex-col">
      {segmentSelections.map((item) => (
        <SegmentItem
          value={item.value}
          key={item.value}
          disabled={item.disabled}
        >
          <CustomContent />
        </SegmentItem>
      ))}
    </Segment>
  );
};

export default Custom;
