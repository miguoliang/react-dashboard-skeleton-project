import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { CustomRefElementProps } from "../ui/utils/constant";

type StickyFooterProps = CustomRefElementProps<
  {
    stickyClass: string;
  },
  "div"
>;

const StickyFooter = (props: StickyFooterProps) => {
  const { children, className, stickyClass, ...rest } = props;

  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {
        threshold: [1],
      },
    );

    if (cachedRef) {
      observer.observe(cachedRef);
      return function () {
        observer.unobserve(cachedRef);
      };
    }
  }, []);

  return (
    <div
      className={classNames(
        "sticky -bottom-1",
        className,
        isSticky && stickyClass,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
};

export default StickyFooter;
