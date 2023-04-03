import React, { ReactNode } from "react";

const InfoItem = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span>{label}</span>
      <span className="font-semibold heading-text">{value}</span>
    </div>
  );
};

export default InfoItem;
