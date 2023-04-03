import React from "react";
import classNames from "classnames";
import { Segment, SegmentItem } from "components/ui";
import { DoubleSidedImage, SegmentItemOption } from "components/shared";
import { HiCheckCircle } from "react-icons/hi";
import useThemeClass from "utils/hooks/useThemeClass";
import { setLayout } from "store/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const layouts: {
  value: string;
  label: string;
  src: string;
  srcDark: string;
}[] = [
  {
    value: "classic",
    label: "Classic",
    src: "/img/thumbs/layouts/classic.jpg",
    srcDark: "/img/thumbs/layouts/classic-dark.jpg",
  },
  {
    value: "modern",
    label: "Mordern",
    src: "/img/thumbs/layouts/modern.jpg",
    srcDark: "/img/thumbs/layouts/modern-dark.jpg",
  },
  {
    value: "stackedSide",
    label: "Stacked Side",
    src: "/img/thumbs/layouts/stackedSide.jpg",
    srcDark: "/img/thumbs/layouts/stackedSide-dark.jpg",
  },
  {
    value: "simple",
    label: "Simple",
    src: "/img/thumbs/layouts/simple.jpg",
    srcDark: "/img/thumbs/layouts/simple-dark.jpg",
  },
  {
    value: "decked",
    label: "Decked",
    src: "/img/thumbs/layouts/decked.jpg",
    srcDark: "/img/thumbs/layouts/decked-dark.jpg",
  },
  {
    value: "blank",
    label: "Blank",
    src: "/img/thumbs/layouts/blank.jpg",
    srcDark: "/img/thumbs/layouts/blank-dark.jpg",
  },
];

const LayoutSwitcher = () => {
  const type = useAppSelector((state) => state.theme.layout.type);
  const dispatch = useAppDispatch();

  const onLayoutSelect = (val: any) => {
    dispatch(setLayout(val));
  };

  const { textTheme } = useThemeClass();

  return (
    <div>
      <Segment
        className="w-full"
        value={[type]}
        onChange={(val: string[]) => onLayoutSelect(val[0])}
      >
        <div className="grid grid-cols-3 gap-4 w-full">
          {layouts.map((layout) => (
            <SegmentItem value={layout.value} key={layout.value}>
              {({ ref, active, onSegmentItemClick, disabled }) => {
                return (
                  <div className="text-center">
                    <SegmentItemOption
                      hoverable
                      ref={ref}
                      active={active}
                      disabled={disabled}
                      defaultGutter={false}
                      onSegmentItemClick={onSegmentItemClick}
                      className="relative min-h-[80px] w-full"
                      customCheck={
                        <HiCheckCircle
                          className={classNames(
                            textTheme,
                            "absolute top-2 right-2 text-lg",
                          )}
                        />
                      }
                    >
                      <DoubleSidedImage
                        className="rounded-md"
                        src={layout.src}
                        darkModeSrc={layout.srcDark}
                        alt=""
                      />
                    </SegmentItemOption>
                    <div
                      className={classNames(
                        active && textTheme,
                        "mt-2 font-semibold",
                      )}
                    >
                      {layout.label}
                    </div>
                  </div>
                );
              }}
            </SegmentItem>
          ))}
        </div>
      </Segment>
    </div>
  );
};

export default LayoutSwitcher;
