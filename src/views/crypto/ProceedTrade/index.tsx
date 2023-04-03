import React from "react";
import ProceedBuy, { ProceedProps } from "./ProceedBuy";
import ProceedSell from "./ProceedSell";

const ProceedTrade = (props: { type?: string } & ProceedProps) => {
  const { type } = props;

  return (
    <>
      {type === "BUY" && <ProceedBuy {...props} />}
      {type === "SELL" && <ProceedSell {...props} />}
    </>
  );
};

export default ProceedTrade;
