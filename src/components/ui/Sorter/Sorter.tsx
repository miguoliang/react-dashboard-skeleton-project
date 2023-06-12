import React from "react";
import { useConfig } from "../ConfigProvider";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const Sorter = ({ sort = false }: { sort: boolean | "asc" | "desc" }) => {
  const { themeColor, primaryColorLevel } = useConfig();

  const color = `text-${themeColor}-${primaryColorLevel}`;

  const renderSort = () => {
    if (typeof sort === "boolean" && !sort) {
      return <FaSort />;
    }

    if (typeof sort === "string" && sort === "asc") {
      return <FaSortDown className={color} />;
    } else if (typeof sort === "string") {
      return <FaSortUp className={color} />;
    }
  };

  return <div className="inline-flex">{renderSort()}</div>;
};

export default Sorter;
